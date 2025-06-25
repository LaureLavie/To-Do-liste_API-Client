export default function AuthForm({
  isRegister,
  handleSubmit,
  onChangeEmail,
  onChangePassword,
  onChangeUsername,
}) {
  return (
    <div>
      <form
        className="w-[460px] p-5 flex flex-col gap-2 shadow-xl"
        onSubmit={handleSubmit}
      >
        {isRegister && (
          <>
            <h1 className="text-center font-bold text-3xl">
              {isRegister ? "Inscription" : "Connexion"}
            </h1>
            <input
              onChange={onChangeUsername}
              required
              type="text"
              placeholder="Entrez votre nom..."
              className="input input-primary w-full"
            />
            <input
              onChange={onChangeEmail}
              required
              type="email"
              placeholder="Entrez votre mail..."
              className="input input-primary w-full"
            />
            <input
              onChange={onChangePassword}
              required
              type="password"
              placeholder="Entrez votre Mot de Passe..."
              className="input input-primary w-full"
            />
            <button className="btn btn-primary text-bold text-2xl">
              {isRegister ? "S'inscrire" : "Se connecter"}
            </button>
            <a href="/">Se Connecter</a>
          </>
        )}
      </form>
    </div>
  );
}
