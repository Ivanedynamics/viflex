import { kv } from "@vercel/kv";
import { connectDatabase } from "./connectDB";
import { presentationSchema } from "./models";

export default defineEventHandler(async (event) => {
  // const presentacion = await kv.get("presentacion.json");
  await connectDatabase();
  const presentacion = await presentationSchema.find({}).lean();
  return { presentacion };
});
