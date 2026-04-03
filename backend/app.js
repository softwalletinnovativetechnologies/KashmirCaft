import express from "express";
import cors from "cors";

const app = express();

// 🔹 Middleware
app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON data

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 Example Route (future use)
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend working successfully 🚀",
  });
});

export default app;
