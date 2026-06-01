import { Link } from "react-router-dom";
import AuthLayout from "../../components/public/AuthLayout";

export default function Register() {
  return (
    <AuthLayout
      title="Inscription"
      subtitle="Créez votre profil étudiant et partagez vos compétences"
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom complet</label>
          <input
            type="text"
            placeholder="Votre nom"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Adresse email étudiante</label>
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
            placeholder="Créer un mot de passe"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
          <input
            type="password"
            placeholder="Confirmer votre mot de passe"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Créer mon compte
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        Déjà inscrit ?{" "}
        <Link to="/connexion" className="text-blue-600 font-medium">
          Se connecter
        </Link>
      </p>
    </AuthLayout>
  );
}