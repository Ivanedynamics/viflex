import { kv } from "@vercel/kv";
import { measuresSchema } from "./models";
import { connectDatabase } from "./connectDB";

export default defineEventHandler(async (event) => {
  // const measures = await kv.get("measures.json");
  await connectDatabase();
  const measures = await measuresSchema.find({}).lean();
  return { measures };
});
