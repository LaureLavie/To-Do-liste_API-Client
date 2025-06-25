import { Link } from "react-router-dom";

export default function ActivatedAccount() {
  return (
    <div>
      <p>Vous avez activez votre compte</p>
      <Link className="link link-primary" to={"/login"}>
        Connectez-vous maintenant
      </Link>
    </div>
  );
}
