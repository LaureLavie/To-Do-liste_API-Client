import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthForm from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to={"/tasks"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // Si tu reçois un token, décommente la ligne suivante :
      // localStorage.setItem("token", data.token);
      if (data.role === "user") navigate("/tasks");
      else if (data.role === "admin") navigate("/admin");
      else navigate("/tasks");
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <AuthForm
        isRegister={false}
        title="Connexion"
        handleSubmit={handleSubmit}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
