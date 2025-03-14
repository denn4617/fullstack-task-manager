import React, { useState } from "react";
import styles from "./TaskList.module.css";
import { Task, addTask, updateTask } from "../../api/tasksApi";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("open");

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return;
    try {
      const created = await addTask(newTaskTitle, newTaskStatus);
      setTasks((prev) => [...prev, created]);
      setNewTaskTitle("");
      setNewTaskStatus("open");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleUpdateStatus = async (taskId: number, status: Task["status"]) => {
    try {
      const updated = await updateTask(taskId, { status });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div>
      {/* Add Task */}
      <div className={styles.addTaskContainer}>
        <input
          type="text"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value as Task["status"])}
        >
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span className={styles.taskTitle}>{task.title}</span>
            <select
              value={task.status}
              onChange={(e) => handleUpdateStatus(task.id, e.target.value as Task["status"])}
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
