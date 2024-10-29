import { kv } from "@vercel/kv";
import { IColor } from "~/types/back";
import { connectDatabase } from "./connectDB";
import { colorSchema } from "./models";

export default defineEventHandler(async (event) => {
  // const colors = (await kv.get("colors.json")) as Array<IColor>;
  await connectDatabase();
  const colors = await colorSchema.find({}).lean();
  return { colors };
});
