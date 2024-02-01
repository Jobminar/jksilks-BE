import express from "express";
import { connect } from "mongoose";
import routes from "./routes/index.js";
import { config } from "dotenv";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import compression from "compression";

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 2000;

// CORS middleware with logging
app.use(
  cors({
    origin: "*", // Adjust as needed in production
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow sending cookies
    onError: (err) => {
      console.error("CORS error:", err);
    },
  })
);

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/", routes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});

// Listen for connections
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
