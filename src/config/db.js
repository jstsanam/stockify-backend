import mongoose from "mongoose";
import { ENV } from "./environment.js";

export const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://jstsanam:" +
        ENV.MONGOPASS +
        "@cluster0.uynmuf0.mongodb.net/stockifyDB",
      { connectTimeoutMS: 30000 }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
