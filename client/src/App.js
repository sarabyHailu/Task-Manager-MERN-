// import React from 'react';
// import TaskList from './components/TaskList';

// function App() {
//   return (
//     <div className="App">
//       <h1>Task Manager</h1>
//       <TaskList />
//     </div>
//   );
// }

// export default App;



// import React, { useState, useEffect } from "react";
// import AddTask from "./components/AddTask";
// import TaskList from "./components/TaskList";
// import Login from "./components/Login";
// import "./App.css";

// import axios from "axios";


// function App() {
  
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.get("/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Failed to load tasks:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="app">
//       <h1>📝 Task Manager</h1>
//       <AddTask onTaskAdded={fetchTasks} />
//       <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";
// import AddTask from "./components/AddTask";
// import TaskList from "./components/TaskList";
// import Login from "./components/Login";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

//   const fetchTasks = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const res = await axios.get("/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Failed to load tasks:", err.message);
//       if (err.response && err.response.status === 403) {
//         setLoggedIn(false); // Token might be invalid or expired
//       }
//     }
//   };

//   useEffect(() => {
//     if (loggedIn) {
//       fetchTasks();
//     }
//   }, [loggedIn]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     setTasks([]);
//   };

//   return (
//     <div className="app">
//       <h1>📝 Task Manager</h1>
//       {!loggedIn ? (
//         <Login onLogin={() => setLoggedIn(true)} />
//       ) : (
//         <>
//           <button onClick={handleLogout} className="logout-btn">Logout</button>
//           <AddTask onTaskAdded={fetchTasks} />
//           <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err.message);
      if (err.response?.status === 403) {
        setLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    if (loggedIn) fetchTasks();
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setTasks([]);
  };

  return (
    <div className="app">
      <h1>📝 Task Manager</h1>

      {!loggedIn ? (
        <>
          {showRegister ? (
            <>
              <Register onRegistered={() => setShowRegister(false)} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowRegister(false)}>Login</button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={() => setLoggedIn(true)} />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setShowRegister(true)}>Register</button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
          <AddTask onTaskAdded={fetchTasks} />
          <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </>
      )}
    </div>
  );
}

export default App;

