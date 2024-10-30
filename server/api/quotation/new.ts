import { CONFIG_EMAIL } from "~/config/email";
import { connectDatabase } from "../connectDB";
import { QuotationSchema } from "../models";
import { v4 as uuidv4 } from "uuid";
import sgMail from "@sendgrid/mail";
import type { IProductCart } from "~/store/cart";

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

const SendBusinessEmail = async (body: BodyValues) => {
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
          createdAt: body?.createdAt,
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
    return "EL CORREO SE HA ENVIADO";
  } catch (error) {
    return "OCURRIO UN ERROR AL ENVIAR EL CORREO";
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
    const body = await readBody(event);

    if (!body) {
      return {
        status: "error",
        data: {
          message: "Proporciona un body",
        },
      };
    }

    const payload: BodyValues = {
      ...body,
      quoteNumber: uuidv4().slice(0, 4) as string,
      createdAt: new Date().toISOString(),
    };
    const quotation = new QuotationSchema(payload);
    await quotation.save();
    // await SendBusinessEmail(payload);

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
    return {
      status: "error",
      data: {
        message: "Ocurrio un error inesperado, contacta con soporte.",
      },
    };
  }
});
