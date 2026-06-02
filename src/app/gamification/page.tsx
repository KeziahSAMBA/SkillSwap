import Header from "@/components/Header";
import Footer from "@/components/Footer";

const badges = ["🏆 Mentor", "🔥 Série 7 jours", "⭐ Expert React", "🎯 50 sessions"];
const challenges = ["Aider 3 étudiants cette semaine", "Créer un atelier", "Recevoir 5 feedbacks"];

export default function GamificationPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-12">
        <p className="text-[#DFB626] font-bold">Gamification</p>
        <h1 className="text-5xl font-serif font-bold mt-2">Progresse et sois valorisé</h1>
        <p className="text-gray-600 mt-3">
          Points, badges, défis et niveau de progression.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {["680 XP", "8 badges", "Niveau 4", "12 défis"].map((item) => (
            <div key={item} className="border border-gray-200 rounded-3xl p-6 text-center">
              <p className="text-3xl font-bold">{item.split(" ")[0]}</p>
              <p className="text-gray-600">{item.replace(item.split(" ")[0], "")}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="border border-gray-200 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Badges débloqués</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge} className="bg-[#F5F5F5] rounded-2xl p-5 font-bold">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Défis actifs</h2>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge} className="flex justify-between border-b pb-4">
                  <span>{challenge}</span>
                  <button className="bg-black text-white px-4 py-2 rounded-xl">Relever</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border border-gray-200 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">Progression</h2>
          <div className="bg-[#F5F5F5] rounded-full h-5">
            <div className="bg-[#DFB626] h-5 rounded-full w-[70%]" />
          </div>
          <p className="text-gray-600 mt-3">70% vers le niveau suivant</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}