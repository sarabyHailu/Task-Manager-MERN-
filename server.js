// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import taskRoutes from "./routes/taskRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();
// mongoose.connect(process.env.MONGO_URI)

// dotenv.config();
// const app = express();
// // Middleware
// app.use(express.json());
// app.use(cors());
// // Routes
// app.use("/api/tasks", taskRoutes);
// app.use("/api/auth", authRoutes);
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
//   .catch((err) => console.log(err));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB successfully");
  app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
})
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err.message);
});
