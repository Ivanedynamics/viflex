import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  productsSchema,
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
  const categories = await categoriesSchema.find({}).lean();
  const colors = await colorSchema.find({}).lean();
  const images = await imagesSchema.find({}).lean();
  // Map and filter products based on query parameters
  const filteredProducts = products
    .map((product) => ({
      ...product,
      color: colors.filter((color) => product.color?.includes(color.id)),
      category: categories.filter(
        (category) => product.category?.includes(category.id)
      ),
      images: images.filter((image) => product.id === image.product_id),
    }))
    .filter(
      (product) =>
        !searchQuery ||
        normalizeString(product.name).includes(normalizeString(searchQuery))
    )
    .filter((product) => {
      if (searchByCategory) {
        const categoryIds = normalizeSplit(searchByCategory);
        return product.category.some((category) =>
          categoryIds.includes(category.id)
        );
      }
      return true;
    })
    .filter((product) => {
      if (searchByColor) {
        const colorIds = normalizeSplit(searchByColor);
        return product.color.some((color) => colorIds.includes(color.id));
      }
      return true;
    });

  return { products: filteredProducts };
});
