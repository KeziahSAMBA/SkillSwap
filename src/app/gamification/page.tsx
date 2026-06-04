import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const badges = [
  "🏆 Mentor",
  "🔥 Série 7 jours",
  "⭐ Expert React",
  "🎯 50 sessions",
];

const challenges = [
  { label: "Aider 3 étudiants cette semaine", href: "/matchs" },
  { label: "Créer un atelier", href: "/sessions" },
  { label: "Recevoir 5 feedbacks", href: "/feed" },
];

export default function GamificationPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Gamification
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Progresse et sois valorisé
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Gagne des points, débloque des badges et relève des défis pour
              développer ton profil.
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {[
              ["680", "XP"],
              ["8", "Badges"],
              ["4", "Niveau"],
              ["12", "Défis"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 text-center"
              >
                <p className="text-3xl font-bold text-[#a594ff]">{value}</p>
                <p className="mt-2 text-white/70">{label}</p>
              </div>
            ))}
          </div>

          {/* BADGES + DEFIS */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
              <h2 className="text-2xl font-black mb-5 text-[#a594ff]">
                Badges débloqués
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge}
                    className="backdrop-blur-xs bg-white/10 border border-white/20 rounded-2xl p-5 font-bold hover:bg-white/15 hover:border-[#a594ff]/50 transition"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
              <h2 className="text-2xl font-black mb-5 text-[#a594ff]">
                Défis actifs
              </h2>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4"
                  >
                    <span className="text-white/80">{challenge.label}</span>
                    <Link
                      href={challenge.href}
                      className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/40 text-white font-semibold px-5 py-2 rounded-xl hover:bg-[#4D3AFF]/70 transition text-center shrink-0"
                    >
                      Relever
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROGRESSION */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-black mb-4 text-[#a594ff]">
              Progression
            </h2>
            <div className="bg-white/15 rounded-full h-3 overflow-hidden">
              <div className="bg-[#a594ff] h-3 rounded-full w-[70%] transition-all" />
            </div>
            <p className="mt-3 text-white/60 text-sm">70% vers le niveau suivant</p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
