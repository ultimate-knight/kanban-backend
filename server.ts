import dotenv from "dotenv";
import app from "./app";
import dbConnect from "./Config/db";

dotenv.config();

const PORT = Number(process.env.PORT || 4589);

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
