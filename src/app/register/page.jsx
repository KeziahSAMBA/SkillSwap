import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-xl">
        <img src="/logo-6you.png" className="h-12 mb-8" alt="SkillSwap" />

        <h1 className="text-3xl font-bold">Inscription</h1>
        <p className="text-gray-600 mt-2">Crée ton profil étudiant initial.</p>

        <form className="grid md:grid-cols-2 gap-4 mt-8">
          <input className="border rounded-xl px-4 py-3" placeholder="Nom complet" />
          <input className="border rounded-xl px-4 py-3" placeholder="Email étudiant" />
          <input className="border rounded-xl px-4 py-3" placeholder="Compétence à enseigner" />
          <input className="border rounded-xl px-4 py-3" placeholder="Compétence à apprendre" />
          <input className="border rounded-xl px-4 py-3" placeholder="Niveau" />
          <input className="border rounded-xl px-4 py-3" placeholder="Disponibilités" />

          <Link href="/profil" className="md:col-span-2 bg-black text-white text-center py-3 rounded-xl">
            Créer mon profil
          </Link>
        </form>

        <p className="text-sm mt-6">
          Déjà inscrit ? <Link href="/login" className="text-[#DFB626] font-bold">Connexion</Link>
        </p>
      </div>
    </main>
  );
}