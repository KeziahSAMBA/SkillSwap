import Header from "@/components/Header";
import Footer from "@/components/Footer";

const badges = [
  "🏆 Mentor",
  "🔥 Série 7 jours",
  "⭐ Expert React",
  "🎯 50 sessions",
];

const challenges = [
  "Aider 3 étudiants cette semaine",
  "Créer un atelier",
  "Recevoir 5 feedbacks",
];

export default function GamificationPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A] pt-30">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-12">
        <p className="text-[#1800AD] font-bold">Gamification</p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#1800AD]">
          Progresse et sois valorisé
        </h1>

        <p className="mt-3">
          Points, badges, défis et niveau de progression.
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#1800AD]">
          Progresse et sois valorisé
        </h1>

        <p className="mt-3">
          Gagne des points, débloque des badges et relève des défis pour
          développer ton profil.
        </p>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {[
            ["680", "XP"],
            ["8", "Badges"],
            ["4", "Niveau"],
            ["12", "Défis"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-[#1800AD]">{value}</p>
              <p className="mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* BADGES + DEFIS */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-[#1800AD]">
              Badges débloqués
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="bg-[#F6F7FB] border border-[#E8E9F5] rounded-2xl p-5 font-bold hover:border-[#1800AD] transition"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-[#1800AD]">
              Défis actifs
            </h2>

            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4"
                >
                  <span>{challenge}</span>

                  <button className="bg-[#1800AD] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#4D3AFF] transition">
                    Relever
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-[#1800AD]">
            Progression
          </h2>

          <div className="bg-[#E8E9F5] rounded-full h-5 overflow-hidden">
            <div className="bg-[#1800AD] h-5 rounded-full w-[70%]" />
          </div>

          <p className="mt-3">70% vers le niveau suivant</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}