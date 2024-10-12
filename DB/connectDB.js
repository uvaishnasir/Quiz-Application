import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB Failed: ${error}`);
    process.exit(1);
  }
};
export { connectDB };
