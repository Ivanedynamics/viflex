import mongoose from "mongoose";

export const connectDatabase = async () => {
  const URL = process.env.MONGO_DB_URL as string;

  try {
    await mongoose.connect(URL, {});
    console.log("MONGO DB CONNECTED");
  } catch (error) {
    console.log("ERROR MONGO DB");
  }
};

export async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(
      (collection) => collection.deleteMany({}) // an empty mongodb selector object ({}) must be passed as the filter argument
    )
  );
  console.log("ALL COLLECTIONS DELETED");
}
