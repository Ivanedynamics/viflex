import { connectDatabase } from "../connectDB";
import { SeoPagesSchema, type ISeoPage } from "../models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const query = getQuery(event);
  const slug = query?.slug;
  const page = await SeoPagesSchema.findOne({
    slug,
  }).lean<ISeoPage>();

  return {
    seo: {
      page,
    },
  };
});
