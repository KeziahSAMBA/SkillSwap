import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: "👤",
    title: "Profil étudiant",
    text: "Déclare tes compétences, ton niveau et tes disponibilités pour te rendre visible auprès des autres étudiants.",
  },
  {
    icon: "🔍",
    title: "Système de matching",
    text: "Trouve un pair pour apprendre ou enseigner une compétence grâce à un algorithme de mise en relation.",
  },
  {
    icon: "📅",
    title: "Gestion des sessions",
    text: "Planifie des ateliers, cours collectifs ou clubs thématiques directement sur la plateforme.",
  },
  {
    icon: "🏆",
    title: "Gamification",
    text: "Gagne des XP, débloque des badges et relève des défis pour valoriser tes contributions.",
  },
  {
    icon: "📰",
    title: "Feed social",
    text: "Partage tes réalisations, laisse des recommandations et donne des feedbacks à tes pairs.",
  },
  {
    icon: "💬",
    title: "Messagerie interne",
    text: "Échange directement avec tes matchs, partage des ressources et coordonne-toi facilement.",
  },
];

const team = [
  { initials: "SM", role: "Scrum Master / Lead technique", color: "bg-[#1800AD]" },
  { initials: "FE", role: "Développeur front-end", color: "bg-[#4D3AFF]" },
  { initials: "BE", role: "Développeur back-end", color: "bg-violet-600" },
  { initials: "PO", role: "Product Owner / MOA", color: "bg-indigo-600" },
  { initials: "UX", role: "UX / Communication", color: "bg-purple-500" },
];

const stack = [
  ["Next.js 16", "Framework front & API"],
  ["TypeScript", "Typage fort"],
  ["Tailwind CSS", "Styling utilitaire"],
  ["Prisma + PostgreSQL", "ORM & base de données"],
  ["JWT", "Authentification stateless"],
  ["API REST /api/v1/", "Architecture découplée"],
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students_long.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-40 pb-16">
          {/* Hero */}
          <div className="mb-14">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              À propos
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              La plateforme qui connecte<br />les étudiants par leurs compétences
            </h1>
            <p className="text-white/70 mt-4 max-w-2xl text-lg">
              SkillSwap permet aux étudiants d&apos;un même établissement de s&apos;échanger
              des compétences, de s&apos;organiser en sessions d&apos;apprentissage entre pairs
              et de valoriser leurs expertises au sein d&apos;un réseau de confiance.
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/register"
                className="backdrop-blur-xs bg-white/25 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/35 transition"
              >
                Rejoindre SkillSwap
              </Link>
              
            </div>
          </div>

          {/* Chiffres clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {[
              ["5", "Fonctionnalités principales"],
              ["12K+", "Matchs réalisés"],
              ["3.5K", "Sessions / mois"],
              ["+2500", "Étudiants actifs"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 text-center"
              >
                <p className="text-3xl font-black text-[#a594ff]">{value}</p>
                <p className="mt-2 text-white/60 text-sm">{label}</p>
              </div>
            ))}
          </div>

          {/* Fonctionnalités */}
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-black text-[#a594ff] mb-8">
              Ce que propose SkillSwap
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition"
                >
                  <div className="w-12 h-12 backdrop-blur-xs bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-2xl mb-4">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack technique */}
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
              <h2 className="text-2xl font-black text-[#a594ff] mb-6">Stack technique</h2>
              <div className="space-y-3">
                {stack.map(([tech, desc]) => (
                  <div
                    key={tech}
                    className="flex items-center justify-between backdrop-blur-xs bg-white/10 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <span className="font-semibold text-white">{tech}</span>
                    <span className="text-white/50 text-sm">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
              <h2 className="text-2xl font-black text-[#a594ff] mb-6">Équipe projet</h2>
              <div className="space-y-4">
                {team.map((member) => (
                  <div key={member.role} className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-full ${member.color} border border-white/20 text-white flex items-center justify-center font-bold text-sm shrink-0`}
                    >
                      {member.initials}
                    </div>
                    <p className="text-white/80 text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-white/40 text-xs">
                Projet réalisé dans le cadre du Workshop Agile/Scrum — Institut F2i / École DSP
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-black text-[#a594ff] mb-3">Architecture découplée</h2>
            <p className="text-white/70 mb-6 max-w-2xl">
              SkillSwap est conçu avec une architecture découplée dès l&apos;origine pour permettre
              une évolution future vers une application mobile. Le front web et la future app
              mobile consomment la même API REST.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ["🌐", "Front-end web", "Next.js responsive"],
                ["⚡", "API REST /api/v1/", "Stateless · JWT · JSON"],
                ["🗄️", "Base de données", "PostgreSQL · Prisma"],
              ].map(([icon, title, sub]) => (
                <div
                  key={title}
                  className="backdrop-blur-xs bg-white/10 border border-white/10 rounded-2xl p-4 text-center"
                >
                  <p className="text-2xl mb-2">{icon}</p>
                  <p className="font-bold text-white text-sm">{title}</p>
                  <p className="text-white/50 text-xs mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
