import { connectDatabase } from "../connectDB";
import { categoriesSchema, type ICategory } from "../models";

export const newArrayWithSubCategories = (categories: ICategory[]) => {
  const withSubCategories = categories?.reduce(
    (acc, curr) => {
      const item = acc[curr?.parentCategory ?? ""];

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
    },
    {} as Record<string, ICategory>
  );
  return Object.values(withSubCategories);
};

export default defineEventHandler(async () => {
  await connectDatabase();
  const categories = await categoriesSchema
    .find({ featured: "TRUE" })
    .lean<ICategory[]>();

  return { data: newArrayWithSubCategories(categories) };
});
