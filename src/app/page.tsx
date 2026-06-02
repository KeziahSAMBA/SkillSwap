import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: "👤",
    number: "01",
    title: "Créez votre profil",
    text: "Renseignez vos compétences, votre niveau et ce que vous souhaitez apprendre.",
  },
  {
    icon: "👥",
    number: "02",
    title: "Trouvez un match",
    text: "Découvrez les étudiants compatibles avec vos objectifs d’apprentissage.",
  },
  {
    icon: "📅",
    number: "03",
    title: "Planifiez une session",
    text: "Organisez une session en visio ou en présentiel selon vos disponibilités.",
  },
  {
    icon: "📈",
    number: "04",
    title: "Progressez",
    text: "Échangez, gagnez des badges et valorisez vos contributions.",
  },
];

const advantages = [
  {
    icon: "💲",
    title: "100% Gratuit",
    text: "Un apprentissage collaboratif accessible à tous les étudiants.",
  },
  {
    icon: "🛡️",
    title: "Communauté fiable",
    text: "Profils, avis et badges pour favoriser des échanges de qualité.",
  },
  {
    icon: "🕒",
    title: "Flexible",
    text: "Des sessions adaptées à vos disponibilités et à votre rythme.",
  },
  {
    icon: "✨",
    title: "Progression",
    text: "XP, badges et niveaux pour suivre votre évolution.",
  },
];

const skills = [
  { icon: "⚛️", name: "React.js", tag: "Dev" },
  { icon: "🎨", name: "Figma", tag: "Design" },
  { icon: "🌍", name: "Anglais", tag: "Langues" },
  { icon: "📈", name: "SEO", tag: "Marketing" },
  { icon: "🐍", name: "Python", tag: "Dev" },
  { icon: "🖼️", name: "Photoshop", tag: "Design" },
  { icon: "📊", name: "Excel", tag: "Business" },
  { icon: "ES", name: "Espagnol", tag: "Langues" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <Header />

      {/* HERO */}
      <section className="min-h-[78vh] flex items-center">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div className="mt-10">
            <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] font-bold px-4 py-2 text-sm rounded-full mb-6">
              Plateforme étudiante collaborative
            </span>

            <h1 className="text-4xl md:text-5xl font-black leading-tight text-[#1800AD]">
              Apprendre.
              <br />
              <span className="text-[#4D3AFF]">Partager.</span>
              <br />
              Évoluer.
            </h1>

            <p className="mt-6 text-lg leading-relaxed max-w-xl">
              SkillSwap connecte les étudiants grâce à leurs compétences.
              Apprenez, partagez et progressez ensemble dans une communauté de
              confiance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/"
                className="bg-[#1800AD] text-white font-bold px-6 py-3 rounded-xl text-center shadow-md hover:bg-[#4D3AFF] transition"
              >
                Commencer 
              </Link>

            </div>

            <div className="flex items-center mt-8">
              <div className="flex -space-x-3">
                {["TC", "SA", "ES", "KM"].map((avatar) => (
                  <div
                    key={avatar}
                    className="w-10 h-10 rounded-full bg-[#4D3AFF] text-white border-4 border-white flex items-center justify-center text-sm font-bold"
                  >
                    {avatar}
                  </div>
                ))}
              </div>

              <p className="ml-5 text-base">
                <span className="text-[#1800AD] font-bold">+2500</span>{" "}
                étudiants actifs
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-3 -top-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
              </span>
              <p className="font-bold">Match trouvé !</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1800AD] text-white flex items-center justify-center text-2xl">
                  👥
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#1800AD]">
                    Collaboration
                  </h2>
                  <p className="text-base">Échange de compétences</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["12K+", "Matchs réalisés"],
                  ["3.5K", "Sessions/mois"],
                  ["150+", "Compétences"],
                  ["98%", "Satisfaction"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="bg-[#F6F7FB] rounded-2xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-[#1800AD]">
                      {value}
                    </p>
                    <p className="text-sm mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -left-3 bottom-[-22px] bg-white shadow-lg rounded-2xl px-5 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#4D3AFF] text-white flex items-center justify-center">
                🎓
              </span>
              <p className="font-bold">+50 XP gagnés</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] font-bold px-4 py-2 text-sm rounded-full">
              Simple et efficace
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-[#1800AD] mt-5">
              Comment ça marche ?
            </h2>

            <p className="text-base mt-4 max-w-2xl mx-auto">
              En quelques étapes simples, commencez à échanger vos compétences
              avec d’autres étudiants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-[#F6F7FB] rounded-3xl p-6 min-h-[260px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1800AD] text-white flex items-center justify-center text-xl mb-5">
                  {step.icon}
                </div>

                <p className="text-4xl font-black text-[#4D3AFF]/25">
                  {step.number}
                </p>

                <h3 className="text-xl font-bold text-[#1800AD] mt-4">
                  {step.title}
                </h3>

                <p className="text-base mt-3 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] font-bold px-4 py-2 text-sm rounded-full">
              Pourquoi nous choisir
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-[#1800AD] mt-5">
              Les avantages SkillSwap
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F6F7FB] text-[#1800AD] flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-[#1800AD]">
                  {item.title}
                </h3>

                <p className="text-base mt-4 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1800AD] text-white py-16 text-center">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-black">
            Prêt à rejoindre la communauté ?
          </h2>

          <p className="text-lg mt-5 text-white/80">
            Inscrivez-vous gratuitement et commencez à échanger vos compétences
            dès aujourd’hui.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/"
              className="bg-white text-[#1800AD] font-bold px-7 py-3 rounded-xl"
            >
              Créer un compte gratuit
            </Link>

            <Link
              href="/"
              className="border-2 border-white text-white font-bold px-7 py-3 rounded-xl"
            >
              J’ai déjà un compte
            </Link>
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] font-bold px-4 py-2 text-sm rounded-full">
            Découvrez
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-[#1800AD] mt-5">
            Exemples de compétences
          </h2>

          <p className="text-base mt-4">
            Dev, Design, Langues, Marketing... Trouvez ou partagez toutes les
            compétences imaginables.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {skills.map((skill) => (
              <Link
                href="/matchs"
                key={skill.name}
                className="bg-white border border-gray-200 rounded-full px-5 py-3 flex items-center justify-between hover:border-[#1800AD] transition"
              >
                <span className="flex items-center gap-3 text-base font-semibold">
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>

                <span className="bg-[#F6F7FB] px-3 py-1 rounded-full text-sm">
                  {skill.tag}
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-block text-[#1800AD] font-bold text-lg mt-10"
          >
            Voir toutes les compétences →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}