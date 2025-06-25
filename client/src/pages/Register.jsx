import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Add this line

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("J'ai empêché le rafraichissement de la page");
    fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsRegister(true); // Set isRegister to true after successful registration
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* <form
        className="w-[460px] p-5 flex flex-col gap-2 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-3xl">Inscription</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          placeholder="Entrez votre nom..."
          className="input input-primary w-full"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Entrez votre mail..."
          className="input input-primary w-full"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Entrez votre Mot de Passe..."
          className="input input-primary w-full"
        />
        </form> */}
      <AuthForm
        title={"Inscription"}
        handleSubmit={handleSubmit}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary text-bold text-2xl">S'inscrire</button>
      {isRegister ? (
        <Link to={"/"}>Se Connecter</Link>
      ) : (
        <Link to={"/register"}>S'inscrire</Link>
      )}
    </div>
  );
}
