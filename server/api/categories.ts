import { categoriesSchema } from "./models";
import { connectDatabase } from "./connectDB";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const categories = await categoriesSchema.find({}).lean();

  return { categories };
});
