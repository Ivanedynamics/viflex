import { connectDatabase } from "./connectDB";
import { colorSchema } from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const colors = await colorSchema.find({}).lean();
  return { colors };
});
