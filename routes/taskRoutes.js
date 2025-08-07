import express from "express";
import Task from "../models/Task.js";
import jwt from "jsonwebtoken";

const router = express.Router();
// Middleware to check authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Unauthorized" });
  jwt.verify(token, "abc123", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
// Create Task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, priority } = req.body;
  const newTask = new Task({ title, description, priority, userId: req.user.userId });
  await newTask.save();
  res.status(201).json(newTask);
});
// Get Tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});
// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});
// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
});
export default router;
