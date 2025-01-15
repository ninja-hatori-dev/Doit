import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

// Define prop types
interface TodayTasksProps {
  totalTasks: number;
  completedTasks: number;
}

const TodayTasks: React.FC<TodayTasksProps> = ({ totalTasks, completedTasks }) => {
  const pendingTasks = totalTasks - completedTasks;

  // Data for the doughnut chart
  const data = {
    
    datasets: [
      {
        data: [pendingTasks, completedTasks],
        backgroundColor: ["#3CB043", "#555555"], // Green for Pending, Gray for Done
        borderWidth: 0, // No border between sections
        cutout: "70%", // Makes it a concentric circle
      },
    ],
  };

  return (
    <div className=" p-6 bg-white dark:bg-customDark rounded-lg shadow-md text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Today Tasks</h2>
        <i
          className="text-gray-500 dark:text-gray-100 cursor-pointer"
          title={`This shows the ratio of completed vs. total tasks: ${completedTasks / totalTasks}`}

        >
          i
        </i>
      </div>

      {/* Task Count */}
      <div className="text-left mb-6">
        
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{totalTasks}</div>
      </div>

      {/* Doughnut Chart */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <Doughnut data={data} />
             
      </div>


      <div className="flex justify-center space-x-4">
        <span className="flex items-center text-sm text-gray-700 dark:text-gray-200">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Pending
        </span>
        <span className="flex items-center text-sm text-gray-700 dark:text-gray-200">
          <span className="w-3 h-3 dark:bg-gray-600 rounded-full mr-2"></span>
          Done
        </span>
      </div>


    </div>
  );
};

export default TodayTasks;
