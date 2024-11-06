import { connectDatabase } from "../connectDB";
import { categoriesSchema } from "../models";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const display = query?.display;
  if (display) {
    await connectDatabase();
    const categories = await categoriesSchema
      .find({ featured: "TRUE", display })
      .lean();

    return { categories };
  }

  await connectDatabase();
  const categories = await categoriesSchema.find({ featured: "TRUE" }).lean();

  return { categories };
});
