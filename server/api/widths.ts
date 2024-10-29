import { kv } from "@vercel/kv";
import { connectDatabase } from "./connectDB";
import { widthsSchema } from "./models";

export default defineEventHandler(async (event) => {
  // const widths = await kv.get("widths.json");
  await connectDatabase();
  const widths = await widthsSchema.find({}).lean();
  return {
    widths,
  };
});
