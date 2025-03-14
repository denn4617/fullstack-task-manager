import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TaskManager.module.css";
import NavBar from "../../components/NavBar/NavBar";
import TaskList from "../../components/TaskList/TaskList";
import TaskChart from "../../components/TaskChart/TaskChart";
import { fetchTasks, Task } from "../../api/tasksApi";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Load user info from localStorage
    setUserName(localStorage.getItem("userName") || "Anonymous");
    setUserPic(localStorage.getItem("userPic") || "https://via.placeholder.com/40.png?text=?");

    // Fetch tasks from backend
    fetchTasks()
      .then(setTasks)
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [navigate]);

  return (
    <div className={styles.taskManagerContainer}>
      {/* NavBar with user info in top-right */}
      <NavBar userName={userName} userPic={userPic} />

      <div className={styles.mainContent}>
        {/* Left side: Task List */}
        <div className={styles.taskListPanel}>
          <h2>My Tasks</h2>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>

        {/* Right side: Task Chart */}
        <div className={styles.statsPanel}>
          <h2>Task Statistics</h2>
          <TaskChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
