import React from "react";
import { Task } from "../api";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onToggle }) => {
  return (
    <li className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        {task.title}
      </label>
    </li>
  );
});

export default TaskItem;
