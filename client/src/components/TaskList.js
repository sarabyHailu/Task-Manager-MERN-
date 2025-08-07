// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const TaskList = () => {
// //     const [tasks, setTasks] = useState([]);
    
// //     useEffect(() => {
// //       const fetchTasks = async () => {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get("http://localhost:5000/api/tasks", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setTasks(res.data);
// //       };
// //       fetchTasks();
// //     }, []);
// //     return (
// //       <div>
// //         <h2>My Tasks</h2>
// //         {tasks.map((task) => (
// //           <div key={task._id}>
// //             <h3>{task.title} ({task.status})</h3>
// //             <p>{task.description}</p>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };
// //   export default TaskList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get("/api/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(res.data);
//       } catch (err) {
//         console.error("Failed to fetch tasks:", err);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h2>My Tasks</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks available.</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task._id}>
//             <h3>{task.title} ({task.status})</h3>
//             <p>{task.description}</p>
//             <p>Priority: {task.priority}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TaskList;
import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onTaskUpdated }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} onTaskUpdated={onTaskUpdated} />
        ))
      )}
    </div>
  );
};

export default TaskList;
