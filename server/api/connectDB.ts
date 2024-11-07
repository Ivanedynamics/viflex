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
