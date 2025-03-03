import React, { useEffect, useState } from "react";
import { fetchTasks, addTask, updateTask, Task } from "../api";
import "./TaskManager.css";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Fetch tasks from the API when the component mounts.
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return;
    try {
      const task = await addTask(newTaskTitle);
      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task.id, !task.completed);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-container">
      <h1 className="header">Task Manager</h1>
      {/* Add Task Elements */}
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="add-task-input"
        />
        <button onClick={handleAddTask} className="add-task-button">
          Add Task
        </button>
      </div>
      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task)}
                className="checkbox"
              />
              <span>{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
