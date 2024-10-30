import { connectDatabase } from "./connectDB";
import { widthsSchema } from "./models";

export default defineEventHandler(async (event) => {
  await connectDatabase();
  const widths = await widthsSchema.find({}).lean();
  return {
    widths,
  };
});
