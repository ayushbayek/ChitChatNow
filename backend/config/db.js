// This File is for database connection. In this file I have conncted the our backend with mongoDB
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error message: ${error.message}`.red.underline);
    process.exit();
  }
};

export default connectDB;
