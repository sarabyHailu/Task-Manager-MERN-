import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  export default mongoose.model("Task", TaskSchema);