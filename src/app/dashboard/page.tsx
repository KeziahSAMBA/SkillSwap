import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Crée ton profil",
    text: "Présente tes compétences, ton niveau et tes disponibilités.",
  },
  {
    number: "02",
    title: "Trouve les bons profils",
    text: "Recherche des étudiants qui peuvent t’aider ou apprendre avec toi.",
  },
  {
    number: "03",
    title: "Échange et progresse",
    text: "Planifie une session, donne ton retour et gagne en expérience.",
  },
];

const advantages = [
  "Apprendre avec des étudiants proches de ton niveau",
  "Valoriser tes compétences auprès de ta communauté",
  "Trouver rapidement de l’aide sur un sujet précis",
  "Progresser dans un cadre simple, humain et collaboratif",
];

const skills = [
  "Développement web",
  "Design UX/UI",
  "Marketing digital",
  "Anglais",
  "Gestion de projet",
  "Canva",
  "SEO",
  "React.js",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DFB626]/30 blur-3xl" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-[#DFB626]/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="inline-flex bg-[#DFB626]/20 px-5 py-2 rounded-full font-bold mb-6">
              Plateforme d’entraide entre étudiants
            </p>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Apprends plus vite. Partage ce que tu sais.
            </h1>

            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl">
              SkillSwap connecte les étudiants autour de leurs compétences pour
              apprendre, enseigner et progresser ensemble dans un cadre simple,
              fiable et collaboratif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/"
                className="bg-[#DFB626] text-black font-bold px-8 py-4 rounded-xl text-center hover:bg-black hover:text-white transition"
              >
                Commencer maintenant
              </Link>

              <Link
                href="/"
                className="border-2 border-black px-8 py-4 rounded-xl text-center font-bold hover:bg-black hover:text-white transition"
              >
                Se connecter
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Pourquoi SkillSwap ?</h2>

            <div className="space-y-5">
              <div className="border-l-4 border-[#DFB626] pl-4">
                <h3 className="font-bold">Trouver de l’aide rapidement</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Un étudiant peut chercher une compétence précise et identifier
                  les profils les plus pertinents.
                </p>
              </div>

              <div className="border-l-4 border-black pl-4">
                <h3 className="font-bold">Apprendre autrement</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Les échanges se font entre pairs, avec un langage simple et
                  une approche plus proche du quotidien étudiant.
                </p>
              </div>

              <div className="border-l-4 border-[#DFB626] pl-4">
                <h3 className="font-bold">Valoriser ses savoir-faire</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Chaque contribution permet de gagner en visibilité, en
                  confiance et en expérience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#DFB626] font-bold mb-3">À propos</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Une plateforme pensée pour l’entraide étudiante.
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg">
            SkillSwap part d’un constat simple : chaque étudiant possède des
            compétences utiles à d’autres. La plateforme permet de rendre ces
            compétences visibles, de faciliter la mise en relation et de créer
            une dynamique d’apprentissage collaborative au sein d’un
            établissement.
          </p>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-[#F7F7F7] py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-[#DFB626] font-bold">Fonctionnement</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
              >
                <p className="text-[#DFB626] text-4xl font-bold">
                  {step.number}
                </p>
                <h3 className="text-xl font-bold mt-5">{step.title}</h3>
                <p className="text-gray-600 mt-3">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12">
          <p className="text-[#DFB626] font-bold">Avantages</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2">
            Ce que SkillSwap apporte aux étudiants
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {advantages.map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-2xl p-6 hover:border-[#DFB626] transition"
            >
              <span className="text-[#DFB626] text-2xl">●</span>
              <p className="font-bold mt-3">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="bg-black text-white rounded-3xl p-10 text-center">
          <p className="text-[#DFB626] font-bold">Compétences</p>
          <h2 className="text-4xl font-serif font-bold mt-3">
            Quelques compétences à partager
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-white text-black px-5 py-3 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-block bg-[#DFB626] text-black font-bold px-8 py-4 rounded-xl"
            >
              Rejoindre SkillSwap
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}