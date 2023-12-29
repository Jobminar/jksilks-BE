import express from "express";
import { json } from "express";
import connectToMongoDB from "./conn.js";
import router from "./Routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(json());
app.use("/", router);

let server;

const startServer = async () => {
  try {
    await connectToMongoDB();

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`MongoDB connected at ${process.env.MONGODB_URI}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  if (server) {
    await server.close(async () => {
      console.log("Server closed");
      await connectToMongoDB();
    });
  }
};

process.on("SIGINT", async () => {
  console.log("Received SIGINT signal");
  await shutdownServer();
  process.exit(0);
});

process.on("uncaughtException", async (error) => {
  console.error(error);
  await shutdownServer();
  process.exit(1);
});

startServer();
