import Header from "@/components/Header";
import Footer from "@/components/Footer";

const posts = [
  {
    icon: "🖼️",
    title: "Tom a partagé son portfolio",
    meta: "Il y a 2h · 24 likes",
    type: "Réalisation",
  },
  {
    icon: "🏆",
    title: "Kim a obtenu le badge Top Formateur",
    meta: "Il y a 5h · Badge débloqué",
    type: "Badge",
  },
  {
    icon: "💬",
    title: "Sarah a recommandé Estelle pour la gestion de projet",
    meta: "Il y a 1 jour · Recommandation",
    type: "Recommandation",
  },
  {
    icon: "⭐",
    title: "Lucas a laissé un feedback après une session d'anglais",
    meta: "Il y a 2 jours · Feedback",
    type: "Feedback",
  },
];

export default function FeedPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-5xl mx-auto px-5 pt-32 md:pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Feed social
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Valorise tes réalisations
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Publications, recommandations et feedbacks entre étudiants.
            </p>
          </div>

          {/* Formulaire publication */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 mb-8">
            <textarea
              placeholder="Partage une réalisation, une recommandation ou un feedback..."
              className="w-full min-h-28 outline-none resize-none bg-transparent text-white placeholder-white/40"
            />
            <div className="flex justify-end mt-4">
              <button className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4D3AFF]/70 transition">
                Publier
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-5">
            {posts.map((post) => (
              <article
                key={post.title}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition"
              >
                <div className="flex gap-5">
                  <div className="w-14 h-14 backdrop-blur-xs bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    {post.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">
                        {post.title}
                      </h3>
                      <span className="backdrop-blur-xs bg-[#4D3AFF]/30 border border-[#a594ff]/40 text-[#a594ff] px-3 py-1 rounded-full text-sm font-medium shrink-0">
                        {post.type}
                      </span>
                    </div>

                    <p className="text-sm text-white/40 mt-1">{post.meta}</p>

                    <div className="flex flex-wrap gap-5 mt-5 text-sm font-medium text-white/60">
                      <button className="hover:text-white transition">
                        👍 Like
                      </button>
                      <button className="hover:text-white transition">
                        💬 Commenter
                      </button>
                      <button className="hover:text-white transition">
                        ↗ Partager
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
