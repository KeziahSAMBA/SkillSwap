import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <img src="/logo-6you.jpeg" className="h-12 mb-8" alt="SkillSwap" />

        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="text-gray-600 mt-2">Accède à ton espace étudiant.</p>

        <form className="space-y-4 mt-8">
          <input className="w-full border rounded-xl px-4 py-3" placeholder="Email étudiant" />
          <input className="w-full border rounded-xl px-4 py-3" placeholder="Mot de passe" type="password" />

          <Link href="/profil" className="block bg-black text-white text-center py-3 rounded-xl">
            Se connecter
          </Link>
        </form>

        <p className="text-sm mt-6">
          Pas encore inscrit ? <Link href="/register" className="text-[#DFB626] font-bold">Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}