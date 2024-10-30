import { kv } from "@vercel/kv";
import { measuresSchema } from "./models";
import { connectDatabase } from "./connectDB";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const measures = await measuresSchema.find({}).lean();
  return { measures };
});
