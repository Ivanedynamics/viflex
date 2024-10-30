import { CONFIG_EMAIL } from "~/config/email";
import { connectDatabase } from "../connectDB";
import { QuotationSchema } from "../models";

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
};

const SendBusinessEmail = async (body: BodyValues) => {
  sgMail.setApiKey(CONFIG_EMAIL.SENDGRID_API_KEY);

  const payload: sgMail.MailDataRequired = {
    from: {
      email: CONFIG_EMAIL.BUSINESS.email,
    },
    // subject: CONFIG_EMAIL.BUSINESS.SENDER.subject,
    personalizations: [
      {
        // subject: CONFIG_EMAIL.BUSINESS.SENDER.subject,
        to: CONFIG_EMAIL?.BUSINESS?.SENDERS?.map((e) => {
          return {
            email: e?.email,
            name: e?.name,
          };
        }),
        dynamicTemplateData: {
          fullName: body?.fullName,
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
    return "OCURRIO UN ERROR AL ENVIAR EL CORREO AL NEGOCIO";
  }
};

const SendClientEmail = async (body: BodyValues) => {
  const payload: sgMail.MailDataRequired = {
    from: {
      email: CONFIG_EMAIL.BUSINESS.email,
    },
    personalizations: [
      {
        to: [
          {
            email: body?.email,
            name: body?.fullName,
          },
        ],
        dynamicTemplateData: {
          fullName: body?.fullName,
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
    templateId: CONFIG_EMAIL.CLIENT.template_id,
  };
  try {
    await sgMail.send(payload);
    return "EL CORREO AL CLIENTE SE HA ENVIADO";
  } catch (error) {
    return "OCURRIO UN ERROR AL ENVIAR EL CORREO AL CLIENTE";
  }
};
export default defineEventHandler(async (event) => {
  if (event?.method !== "POST")
    return {
      message: `El metodo ${event?.method} no esta permitido`,
    };
  // const presentacion = await kv.get("presentacion.json");
  await connectDatabase();
  const body = await readBody(event);

  if (!body) {
    return {
      message: "El body esta vacio",
    };
  }
  const quotation = new QuotationSchema(body);
  await quotation.save();
  const response = await SendBusinessEmail(body);
  const responseClient = await SendClientEmail(body);

  return {
    message: "Cotizacion creada exitosamente",
    email: {
      business: response,
      client: responseClient,
    },
  };
});
