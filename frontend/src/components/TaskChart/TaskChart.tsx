import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./TaskChart.module.css";
import { Task } from "../../api/tasksApi";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskChartProps {
  tasks: Task[];
}

const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const openCount = tasks.filter((t) => t.status === "open").length;
  const inProgressCount = tasks.filter((t) => t.status === "in progress").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  const data = {
    labels: ["Open", "In Progress", "Completed"],
    datasets: [
      {
        data: [openCount, inProgressCount, completedCount],
        backgroundColor: ["#ff6384", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chartContainer}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TaskChart;
