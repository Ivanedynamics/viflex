import { connectDatabase } from "../connectDB";
import { QuotationSchema } from "../models";

export default defineEventHandler(async (event) => {
  // const presentacion = await kv.get("presentacion.json");
  await connectDatabase();
  const body = await readBody(event);
  console.log(body, "body");

  if (!body) {
    return "none";
  }
  const quotation = new QuotationSchema(body);
  await quotation.save();
  return { message: "Cotizacion creada exitosamente" };
});
