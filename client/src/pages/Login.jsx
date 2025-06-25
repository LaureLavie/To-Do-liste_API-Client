import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const [isRegister, setIsRegister] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.role === "user") navigate("/tasks");
      if (data.role === "admin") navigate("/admin");
      navigate("/tasks");
      localStorage.setItem("email", decode.email);
      localStorage.setItem("role", decode.role);
      localStorage.setItem("username", decode.username);
      // localStorage.setItem("token", data.token);
    } else {
      toast.error(data.message);
    }
  };
}

if (localStorage.getItem("token")) {
  return <Navigate to={"/tasks"} />;
}
return (
  <div className="h-screen flex justify-center items-center">
    {/* <form
        onSubmit={handleSubmit}
        className="w-[460px] flex flex-col gap-3 p-5 rounded shadow-2xl"
      >
        <h1 className="text-center text-3xl font-bold">Connexion</h1>
        <input
          placeholder="Email..."
          className="input input-primary w-full p-5"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          placeholder="Password..."
          className="input input-primary w-full p-5"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button className="btn btn-primary">Se Connecter</button>
        <Link to={"/register"}>Créer un Compte</Link>
        </form> */}
    <AuthForm
      isRegister={false}
      title="Connexion"
      handleSubmit={handleSubmit}
      onChangeEmail={(e) => setEmail(e.target.value)}
      onChangePassword={(e) => setPassword(e.target.value)}
    />
  </div>
);
