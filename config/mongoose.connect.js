// Import mongoose for MongoDB connection
import mongoose from "mongoose";
import dotenv from "dotenv";
import debug from "debug";
const dbgr = debug("development:db");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/scatchdb")
  .then(() => {
    dbgr("MongoDB connected successfully");
  })
  .catch((error) => {
    dbgr("MongoDB connection error:", error);
  });

// Export the dbConnect function for use in other parts of the application
export default mongoose.connection;
// This code connects to a MongoDB database using Mongoose.
// It uses an environment variable for the connection string, defaulting to a local MongoDB instance if not set.
// The connection is logged to the console upon success or failure.
// The connection is exported for use in other parts of the application.
// This allows other modules to use the established connection without needing to reconnect.
// This is useful for maintaining a single connection throughout the application lifecycle.
