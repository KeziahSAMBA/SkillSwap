import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <header className="w-full bg-white pt-8">
        <div className="w-[90%] max-w-6xl mx-auto">
          <nav className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold text-black">SkillSwap</h1>

            <ul className="flex gap-8 text-gray-800 font-medium">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/competences">Compétences</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/rapport">Rapport</Link></li>
            </ul>

            <div className="flex gap-4">
              <Link href="/connexion" className="px-4 py-2 rounded-lg border border-gray-400">
                Connexion
              </Link>

              <Link href="/inscription" className="px-4 py-2 rounded-lg bg-black text-white">
                Inscription
              </Link>
            </div>
          </nav>

          <div className="mt-4 bg-[#D9D4D4] rounded-xl px-5 py-4 flex items-center">
            <span className="mr-3 text-xl">🔍</span>

            <input
              type="text"
              placeholder="Rechercher une compétence..."
              className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-600"
            />
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center text-center mt-28 px-4">
        <h1 className="text-6xl font-serif font-semibold text-black">
          Échange tes compétences
        </h1>

        <h2 className="text-5xl font-serif mt-4 text-black">
          Apprends. Enseigne. Évolue.
        </h2>

        <p className="max-w-2xl mt-8 text-gray-600 text-lg">
          Une plateforme collaborative permettant aux étudiants d apprendre les
          uns des autres, de partager leurs connaissances et de développer leurs
          compétences dans un environnement de confiance.
        </p>

        <div className="flex gap-6 mt-10">
          <Link href="/inscription" className="bg-black text-white px-8 py-4 rounded-xl">
            Commencer maintenant
          </Link>

          <Link href="/competences" className="border border-black px-8 py-4 rounded-xl">
            Découvrir les compétences
          </Link>
        </div>
      </section>
    </main>
  );
}