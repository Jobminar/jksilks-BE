import express from "express";
import { connect } from "mongoose";
import routes from "./routes/index.js";
import { config } from "dotenv";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
config();

// Connect to MongoDB (remove deprecated options)
connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(json()); // Correct usage of bodyParser.json()
app.use(cors());

// Routes
app.use("/", routes);

// Error handler middleware (you'll need to implement this)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
