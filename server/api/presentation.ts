import { connectDatabase } from "./connectDB";
import { presentationSchema } from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const presentation = await presentationSchema.find({}).lean();
  return { presentation };
});
