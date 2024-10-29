// import { kv } from "@vercel/kv";
// import { ICategory, IColor, IImage, IProduct } from "~/types/back";
import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  productsSchema,
} from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const query = getQuery(event);
  const searchQuery = query?.searchByName as string;
  const searchByCategory = query?.searchByCategory as string;
  const searchByColor = query?.searchByColor as string;

  const products = await productsSchema.find({}).lean();
  const getCategories = await categoriesSchema.find({}).lean();
  const getColors = await colorSchema.find({}).lean();
  const getImages = await imagesSchema.find({}).lean();
  // const products = (await kv.get("products.json")) as Array<IProduct>;
  // const getCategories = (await kv.get("categories.json")) as Array<ICategory>;
  // const getColors = (await kv.get("colors.json")) as Array<IColor>;
  // const getImages = (await kv.get("images.json")) as Array<IImage>;
  const newProducts = products
    ?.map((e) => {
      return {
        ...e,
        color: getColors?.filter((i) => e?.color?.includes(i.id)),
        category: getCategories?.filter((g) => e?.category?.includes(g?.id)),
        images: getImages?.filter((b) => e?.id === b?.product_id),
      };
    })
    ?.filter((p) => {
      if (searchQuery) {
        return p?.name
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase()?.trim());
      }
      return p;
    })
    ?.filter((p) => {
      if (searchByCategory) {
        const arrayCategories = searchByCategory
          ?.split(",")
          ?.filter((u) => u !== "" || u !== undefined);
        return p?.category?.some((e) => arrayCategories?.includes(e?.id));
      }
      return p;
    })
    ?.filter((p) => {
      if (searchByColor) {
        const arrayColors = searchByColor
          ?.split(",")
          ?.filter((u) => u !== "" || u !== undefined);
        return p?.color?.some((e) => arrayColors?.includes(e?.id));
      }
      return p;
    });

  return {
    products: newProducts,
  };
});
