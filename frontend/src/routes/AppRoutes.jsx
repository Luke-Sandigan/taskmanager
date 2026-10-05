
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Task from "../pages/Task";


function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/tasks" element={<Task />} />
    </Routes>
    
  )
}

export default AppRoutes