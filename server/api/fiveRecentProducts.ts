import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  productsSchema,
} from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const products = await productsSchema.find({}).lean();
  const getCategories = await categoriesSchema.find({}).lean();
  // const getPresentacion = await presentationSchema.find({});
  const getColors = await colorSchema.find({}).lean();
  // const getMedidas = await measuresSchema.find({});
  const getImages = await imagesSchema.find({}).lean();
  // const products = (await kv.get("products.json")) as Array<IProduct>;
  // const getCategories = (await kv.get("categories.json")) as Array<ICategory>;
  // const getColors = (await kv.get("colors.json")) as Array<IColor>;
  // const getImages = (await kv.get("images.json")) as Array<IImage>;
  const newProducts = products?.map((e) => {
    return {
      ...e,
      color: getColors?.filter((i) => e?.color?.includes(i.id)),
      category: getCategories?.filter((g) => e?.category?.includes(g?.id)),
      images: getImages?.filter((b) => e?.id === b?.product_id),
    };
  });

  return {
    products: newProducts.slice(-10),
  };
});
