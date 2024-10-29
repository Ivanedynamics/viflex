import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  measuresSchema,
  presentationSchema,
  productsSchema,
} from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const query = getQuery(event);
  const productById = query?.productById;
  if (!productById) {
    return { product: null };
  }

  const getProducts = await productsSchema.find({}).lean();
  const getCategories = await categoriesSchema.find({}).lean();
  const getPresentacion = await presentationSchema.find({}).lean();
  const getColors = await colorSchema.find({}).lean();
  const getMedidas = await measuresSchema.find({}).lean();
  const getImages = await imagesSchema.find({}).lean();
  // const getProducts = (await kv.get("products.json")) as Array<IProduct>;

  const findProduct = getProducts?.find((e) => e?.id === productById);

  // const getCategories = (await kv.get("categories.json")) as Array<ICategory>;

  const findCategoriesByProduct = getCategories?.filter(
    (e) => findProduct?.category?.includes(e?.id)
  );
  // const getPresentacion = (await kv.get(
  //   "presentacion.json"
  // )) as Array<IPresentacion>;
  const findPresentacionByProduct = getPresentacion?.filter(
    (e) => findProduct?.presentacion?.includes(e?.id)
  );
  // const getColors = (await kv.get("colors.json")) as Array<IColor>;

  const findColors = getColors?.filter(
    (e) => findProduct?.color?.includes(e?.id)
  );

  // const getMedidas = (await kv.get("measures.json")) as Array<IMeasures>;
  const findMedidasByProduct = getMedidas?.filter(
    (e) => findProduct?.medida?.includes(e?.id)
  );

  // const getImages = (await kv.get("images.json")) as Array<IImage>;

  const findImagesProduct = getImages?.filter(
    (e) => findProduct?.id === e?.product_id
  );

  return {
    product: {
      ...findProduct,
      category: findCategoriesByProduct,
      presentacion: findPresentacionByProduct,
      color: findColors,
      medida: findMedidasByProduct,
      images: findImagesProduct,
    },
  };
});
