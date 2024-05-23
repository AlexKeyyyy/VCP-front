import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.scss";
import Home from "./pages/User/Home";
import Account from "./pages/User/Account";
import Result from "./pages/User/Result";
import ResultBase from "./pages/User/ResultBase";
import Tasks from "./pages/User/Tasks";
import Task from "./pages/User/Task";
import AdminHome from "./pages/Admin/Home";
import AdminResultsBase from "./pages/Admin/ResultsBase";
import AdminResult from "./pages/Admin/Results";
import AdminCandidates from "./pages/Admin/Candidates";
import AdminTasks from "./pages/Admin/Tasks";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/results/:taskNumber" element={<Result />} />
        <Route path="/results" element={<ResultBase />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:taskNumber" element={<Task />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/results" element={<AdminResultsBase />} />
        <Route path="/admin/results/:userId/:taskNumber" element={<AdminResult />} />
        <Route path="/admin/candidates" element={<AdminCandidates />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
      </Routes>
    </div>
  );
}

export default App;
