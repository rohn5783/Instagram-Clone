import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Registration from "./features/auth/pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hare Krishna everyone </h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
}

export default AppRoutes;