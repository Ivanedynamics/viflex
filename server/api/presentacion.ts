import { kv } from "@vercel/kv";
import { connectDatabase } from "./connectDB";
import { presentationSchema } from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const presentacion = await presentationSchema.find({}).lean();
  return { presentacion };
});
