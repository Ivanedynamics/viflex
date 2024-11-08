import { connectDatabase } from "../connectDB";
import { imagesSchema } from "../models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const query = getQuery(event);
  const display = query?.display;
  const image = await imagesSchema
    .findOne({
      display,
    })
    .lean();
  return { image };
});
