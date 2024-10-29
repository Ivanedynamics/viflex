import { categoriesSchema } from "./models";
import { connectDatabase } from "./connectDB";

export default defineEventHandler(async (event) => {
  // const assets = useStorage("assets:server");
  // const categories = (await kv.get("categories.json")) as Array<ICategory>;
  // const response
  await connectDatabase();
  const categories = await categoriesSchema.find({}).lean();

  return { categories };
});
