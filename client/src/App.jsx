import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import ActivatedAccount from "./pages/ActivatedAccount";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activatedAccount" element={<ActivatedAccount />} />{" "}
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
