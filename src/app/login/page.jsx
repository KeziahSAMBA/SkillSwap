import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-5 py-10">
      <div className="bg-white border border-[#E8E9F5] rounded-3xl p-8 w-full max-w-md shadow-sm">
        <img src="/logo-6you.jpeg" className="h-12 mb-8" alt="SkillSwap" />

        <p className="text-[#1800AD] font-bold mb-2">Bienvenue sur SkillSwap</p>

        <h1 className="text-3xl font-bold text-[#1800AD]">Connexion</h1>

        <p className="text-[#4A4A4A] mt-2">
          Accède à ton espace étudiant.
        </p>

        <form className="space-y-4 mt-8">
          <input
            className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Email étudiant"
          />

          <input
            className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Mot de passe"
            type="password"
          />

          <Link
            href="/"
            className="block bg-[#1800AD] text-white font-semibold text-center py-3 rounded-xl hover:bg-[#4D3AFF] transition"
          >
            Se connecter
          </Link>
        </form>

        <p className="text-sm text-[#4A4A4A] mt-6">
          Pas encore inscrit ?{" "}
          <Link href="/" className="text-[#1800AD] font-bold">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}