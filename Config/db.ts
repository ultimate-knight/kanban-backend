import mongoose from "mongoose";


const dbConnect = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

export default dbConnect;
