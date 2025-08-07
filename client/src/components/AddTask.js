import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/tasks", { title, description, priority }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle("");
      setDescription("");
      setPriority("Medium");
      onTaskAdded();
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
