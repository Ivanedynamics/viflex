import { newArrayWithSubCategories } from "./categories/withSubCategories";
import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  productsSchema,
  type ICategory,
  type IColor,
  type IImage,
  type IProduct,
} from "./models";

// Utility functions to normalize strings and split comma-separated values
const normalizeString = (value: string) => value?.toLowerCase().trim();
const normalizeSplit = (value: string) => value?.split(",").filter(Boolean);

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const query = getQuery(event);
  const querySearch = query?.searchByName as string;
  const queryCategories = query?.searchByCategory as string;
  const queryColors = query?.searchByColor as string;

  // Fetch all required data
  const products = await productsSchema
    .find({
      featured: "TRUE",
    })
    .lean<IProduct[]>();
  const categories = await categoriesSchema
    .find({
      featured: "TRUE",
    })
    .lean<ICategory[]>();

  const colors = await colorSchema.find({}).lean<IColor[]>();
  const images = await imagesSchema.find({}).lean<IImage[]>();

  const categoriesParams = normalizeSplit(queryCategories);

  const productsWithDetails = products.map((product) => ({
    ...product,
    color: colors.filter((color) => product.color?.includes(color.id)),
    category: categories.filter(
      (category) => product.category?.includes(category.id)
    ),
    images: images.filter((image) => product.id === image.product_id),
  }));

  if (categoriesParams?.length === 0) {
    const response = productsWithDetails
      .filter(
        (product) =>
          !querySearch ||
          normalizeString(product.name).includes(normalizeString(querySearch))
      )
      .filter((product) => {
        if (queryColors) {
          const colorIds = normalizeSplit(queryColors);
          return product.color.some((color) => colorIds.includes(color.id));
        }
        return true;
      });
    return { products: response };
  }

  const category_id = categoriesParams[0] ?? "";
  const ArrayWithSubCategories = newArrayWithSubCategories(categories);
  const FindCategory = ArrayWithSubCategories?.find(
    (e) => e?.id === category_id
  );
  const sub_categories_ids =
    FindCategory?.subCategories?.map((e) => e?.id) ?? [];

  const ids =
    categoriesParams?.length === 1
      ? sub_categories_ids
      : categoriesParams?.slice(1);

  const response = productsWithDetails
    .filter(
      (product) =>
        !querySearch ||
        normalizeString(product.name).includes(normalizeString(querySearch))
    )
    .filter((product) => {
      return product.category.some((category) => ids.includes(category.id));
    })

    .filter((product) => {
      if (queryColors) {
        const colorIds = normalizeSplit(queryColors);
        return product.color.some((color) => colorIds.includes(color.id));
      }
      return true;
    });

  return { products: response };
});
