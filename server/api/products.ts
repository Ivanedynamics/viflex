import { newArrayWithSubCategories } from "./categories/withSubCategories";
import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  productsSchema,
  type ICategory,
  type IProduct,
} from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const query = getQuery(event);
  const searchQuery = query?.searchByName as string;
  const searchByCategory = query?.searchByCategory as string;
  const searchByColor = query?.searchByColor as string;

  // Utility functions to normalize strings and split comma-separated values
  const normalizeString = (value: string) => value?.toLowerCase().trim();
  const normalizeSplit = (value: string) => value?.split(",").filter(Boolean);

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
  const colors = await colorSchema.find({}).lean();
  const images = await imagesSchema.find({}).lean();
  const categoryIds = normalizeSplit(searchByCategory);

  const filteredProducts = products.map((product) => ({
    ...product,
    color: colors.filter((color) => product.color?.includes(color.id)),
    category: categories.filter(
      (category) => product.category?.includes(category.id)
    ),
    images: images.filter((image) => product.id === image.product_id),
  }));

  if (categoryIds?.length === 0) {
    const response = filteredProducts
      .filter(
        (product) =>
          !searchQuery ||
          normalizeString(product.name).includes(normalizeString(searchQuery))
      )
      .filter((product) => {
        if (searchByColor) {
          const colorIds = normalizeSplit(searchByColor);
          return product.color.some((color) => colorIds.includes(color.id));
        }
        return true;
      });
    return { products: response };
  }

  const category_id = categoryIds[0] ?? "";
  const ArrayWithSubCategories = newArrayWithSubCategories(categories);
  const FindCategory = ArrayWithSubCategories?.find(
    (e) => e?.id === category_id
  );
  const sub_categories_ids =
    FindCategory?.subCategories?.map((e) => e?.id) ?? [];

  const ids =
    categoryIds?.length === 1 ? sub_categories_ids : categoryIds?.slice(1);

  const response = filteredProducts
    .filter(
      (product) =>
        !searchQuery ||
        normalizeString(product.name).includes(normalizeString(searchQuery))
    )
    .filter((product) => {
      return product.category.some((category) => ids.includes(category.id));
    })

    .filter((product) => {
      if (searchByColor) {
        const colorIds = normalizeSplit(searchByColor);
        return product.color.some((color) => colorIds.includes(color.id));
      }
      return true;
    });

  return { products: response };
});
