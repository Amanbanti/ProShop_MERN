import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
      socketTimeoutMS: 60000, // 60 seconds timeout for socket connection
    });
    console.log("MongoDB Connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1); // Exit the process with failure
  }
};


