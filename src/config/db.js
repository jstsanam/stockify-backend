import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://jstsanam:" +
        process.env.MONGOPASS +
        "@cluster0.uynmuf0.mongodb.net/realTimeStockMarketDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      { connectTimeoutMS: 30000 }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
