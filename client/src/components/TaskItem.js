import React, { useState } from "react";
import axios from "axios";

const TaskItem = ({ task, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updated, setUpdated] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });

  const token = localStorage.getItem("token");

  const updateTask = async () => {
    try {
      await axios.put(`/api/tasks/${task._id}`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskUpdated();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  return (
    <div className={`task-item ${task.status.toLowerCase()}`}>
      {isEditing ? (
        <>
          <input value={updated.title} onChange={(e) => setUpdated({ ...updated, title: e.target.value })} />
          <textarea value={updated.description} onChange={(e) => setUpdated({ ...updated, description: e.target.value })} />
          <select value={updated.priority} onChange={(e) => setUpdated({ ...updated, priority: e.target.value })}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select value={updated.status} onChange={(e) => setUpdated({ ...updated, status: e.target.value })}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button onClick={updateTask}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteTask}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
