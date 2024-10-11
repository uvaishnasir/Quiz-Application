import connectDB from "./DB/connectDB.js";
import { app } from "./app.js";
import dotenv from "dotenv";

// Load environment variables from.env file
dotenv.config();

// Connect to MongoDB database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
