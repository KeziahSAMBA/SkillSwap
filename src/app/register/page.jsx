import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-5 py-10">
      <div className="bg-white border border-[#E8E9F5] rounded-3xl p-8 w-full max-w-xl shadow-sm">
        <img
          src="/logo-6you.jpeg"
          className="h-12 mb-8"
          alt="SkillSwap"
        />

        <p className="text-[#1800AD] font-bold mb-2">
          Rejoins la communauté SkillSwap
        </p>

        <h1 className="text-3xl font-bold text-[#1800AD]">
          Inscription
        </h1>

        <p className="text-[#4A4A4A] mt-2">
          Crée ton profil étudiant et commence à partager tes compétences.
        </p>

        <form className="grid md:grid-cols-2 gap-4 mt-8">
          <input
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Nom complet"
          />

          <input
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Email étudiant"
          />

          <input
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Compétence à enseigner"
          />

          <input
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Compétence à apprendre"
          />

          <input
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Niveau"
          />

          <input
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
            placeholder="Disponibilités"
          />

          <Link
            href="/"
            className="md:col-span-2 bg-[#1800AD] text-white font-semibold text-center py-3 rounded-xl hover:bg-[#4D3AFF] transition"
          >
            Créer mon profil
          </Link>
        </form>

        <p className="text-sm text-[#4A4A4A] mt-6">
          Déjà inscrit ?{" "}
          <Link
            href="/"
            className="text-[#1800AD] font-bold hover:text-[#4D3AFF] transition"
          >
            Connexion
          </Link>
        </p>
      </div>
    </main>
  );
}