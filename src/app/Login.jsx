import { Link } from "react-router-dom";
import AuthLayout from "../components/public/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accédez à votre espace étudiant SkillSwap"
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Adresse email</label>
          <input
            type="email"
            placeholder="exemple@ecole.fr"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        Pas encore de compte ?{" "}
        <Link to="/inscription" className="text-blue-600 font-medium">
          Créer un compte
        </Link>
      </p>
    </AuthLayout>
  );
}