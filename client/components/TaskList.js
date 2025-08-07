import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
      const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      };
      fetchTasks();
    }, []);
    return (
      <div>
        <h2>My Tasks</h2>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.title} ({task.status})</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    );
  };
  export default TaskList;