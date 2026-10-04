
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";


function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
     
    </Routes>
    
  )
}

export default AppRoutes