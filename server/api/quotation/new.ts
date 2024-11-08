import { CONFIG_EMAIL } from "~/config/email";
import { connectDatabase } from "../connectDB";
import {
  categoriesSchema,
  colorSchema,
  measuresSchema,
  presentationSchema,
  productsSchema,
  QuotationSchema,
  type ICategory,
  type IColor,
  type IMeasure,
  type IPresentation,
  type IProduct,
} from "../models";
import sgMail from "@sendgrid/mail";
import type { IProductCart } from "~/store/cart";
import { v4 as uuidv4 } from "uuid";

type BodyValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  entity: string;
  comment: string;
  products: IProductCart[];
  quoteNumber: string;
  createdAt: string;
};

export type IProductFormated = {
  quantity: number;
  product: IProduct & {
    category: ICategory[];
    presentacion: IPresentation[];
    color: IColor[];
    medida: IMeasure[];
  };
  id?: string;
  selection: {
    presentacion: IPresentation;
    medida: IMeasure;
    color: IColor;
  };
};

const SendBusinessEmail = async (
  body: Omit<BodyValues, "products"> & {
    products: IProductFormated[];
  }
) => {
  sgMail.setApiKey(CONFIG_EMAIL.SENDGRID_API_KEY);

  const payload: sgMail.MailDataRequired = {
    from: {
      email: CONFIG_EMAIL.BUSINESS.email,
    },
    personalizations: [
      {
        to: [
          ...CONFIG_EMAIL?.BUSINESS?.SENDERS?.map((e) => {
            return {
              email: e?.email,
              name: e?.name,
            };
          }),
          {
            email: body?.email,
            name: body?.fullName,
          },
        ],
        dynamicTemplateData: {
          fullName: body?.fullName,
          quoteNumber: body?.quoteNumber,
          createdAt: new Date(body?.createdAt)?.toLocaleDateString(),
          email: body?.email,
          phone: body?.phone,
          address: body?.address,
          state: body?.state,
          entity: body?.entity,
          comment: body?.comment,
          items: body?.products?.map((e) => {
            return {
              id: e?.product?.id,
              name: e?.product?.name,
              quantity: e?.quantity,
              presentation: e?.selection?.presentacion?.value,
              measure: e?.selection?.medida?.name,
              color: e?.selection?.color?.nombre,
            };
          }),
        },
      },
    ],
    templateId: CONFIG_EMAIL.BUSINESS.template_id,
  };

  try {
    await sgMail.send(payload);

    return {
      status: "success",
      data: {
        message: "El Correo se ha enviado.",
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Something bad happened on the server",
      data: {
        message: "Ha ocurrido un error inesperado al enviar el correo.",
      },
    });
  }
};

export default defineEventHandler(async (event) => {
  if (event?.method !== "POST") {
    return {
      message: `El metodo ${event?.method} no esta permitido`,
    };
  }

  try {
    await connectDatabase();
    const body = await readBody<BodyValues>(event);

    if (!body) {
      return {
        status: "error",
        data: {
          message: "Proporciona un body",
        },
      };
    }

    const products = (await Promise.all(
      body?.products?.map(async (e) => {
        // Buscar el producto principal por su ID
        const product = await productsSchema
          ?.findOne({
            id: e?.product?.id, // Cambiado para usar `id` directamente
          })
          .lean<IProduct>();

        if (!product) {
          return null; // Maneja el caso donde el producto no se encuentra
        }

        // Buscar categorías, presentaciones, colores y medidas en paralelo
        const [category, presentacion, color, medida] = await Promise.all([
          categoriesSchema
            .find({
              id: { $in: product?.category || [] }, // Maneja arrays vacíos o nulos
            })
            .lean<ICategory[]>(),
          presentationSchema
            .find({
              id: { $in: product?.presentacion || [] },
            })
            .lean<IPresentation[]>(),
          colorSchema
            .find({
              id: { $in: product?.color || [] },
            })
            .lean<IColor[]>(),
          measuresSchema
            ?.find({
              id: { $in: product?.medida || [] },
            })
            .lean<IMeasure[]>(),
        ]);

        // Retornar el producto con toda la información agregada
        return {
          ...e,
          product: {
            ...product,
            category,
            presentacion,
            color,
            medida,
          },
          selection: {
            color: await colorSchema
              .findOne({
                id: e?.selection?.color?.id,
              })
              ?.lean<IColor>(),
            medida: await measuresSchema
              ?.findOne({
                id: e?.selection?.medida?.id,
              })
              ?.lean<IMeasure>(),
            presentacion: await presentationSchema
              ?.findOne({
                id: e?.selection?.presentacion?.id,
              })
              ?.lean<IPresentation>(),
          },
        };
      })
    )) as IProductFormated[];

    const payload = {
      ...body,
      products,
      quoteNumber: uuidv4()?.replace(/-/g, "").substring(0, 8),
      createdAt: new Date().toISOString(),
    };

    const quotation = new QuotationSchema(payload);
    await quotation.save();
    await SendBusinessEmail(payload);

    return {
      status: "success",
      data: {
        quoteNumber: payload?.quoteNumber,
        fullName: payload?.fullName,
        email: payload?.email,
        createdAt: payload?.createdAt,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Something bad happened on the server",
      data: {
        message:
          "Ha ocurrido un error inesperado al intentar procesar tu solicitud. Te recomendamos intentar nuevamente más tarde. Si el problema persiste, por favor contacta a nuestro soporte para recibir asistencia. Agradecemos tu comprensión.",
      },
    });
  }
});
