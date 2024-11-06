import { connectDatabase } from "../connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  productsSchema,
} from "../models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const products = await productsSchema
    .find({
      featured: "TRUE",
      type: "PRODUCTO_NUEVO",
    })
    .lean();

  const getCategories = await categoriesSchema.find({}).lean();
  const getColors = await colorSchema.find({}).lean();
  const getImages = await imagesSchema.find({}).lean();

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
