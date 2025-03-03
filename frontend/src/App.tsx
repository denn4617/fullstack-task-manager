import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./components/TaskManager";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </Router>
  );
};

export default App;
