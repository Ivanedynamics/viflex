import { connectDatabase } from "../connectDB";
import { categoriesSchema, type ICategory } from "../models";

export default defineEventHandler(async () => {
  await connectDatabase();
  const categories = await categoriesSchema.find({ featured: "TRUE" }).lean();

  const withSubCategories = categories?.reduce((acc, curr) => {
    const item = acc[curr.parentCategory];
    if (item && curr?.type === "SUB_CATEGORIA") {
      return {
        ...acc,
        [item?.id]: {
          ...item,
          subCategories: [...(item?.subCategories ?? []), curr],
        },
      };
    }

    if (curr?.type === "CATEGORIA") {
      return {
        ...acc,
        [curr?.id]: {
          ...curr,
          subCategories: [],
        },
      };
    }
    return acc;
  }, {} as ICategory);

  return { data: Object.values(withSubCategories) };
});
