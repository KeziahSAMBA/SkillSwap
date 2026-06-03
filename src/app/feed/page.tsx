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
    title: "Lucas a laissé un feedback après une session d’anglais",
    meta: "Il y a 2 jours · Feedback",
    type: "Feedback",
  },
];

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <Header />

      <section className="max-w-5xl mx-auto px-5 py-12">
        <p className="text-[#1800AD] font-bold">Feed social</p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#1800AD]">
          Valorise tes réalisations
        </h1>

        <p className="mt-3">
          Publications, recommandations et feedbacks entre étudiants.
        </p>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 mt-10 shadow-sm">
          <textarea
            placeholder="Partage une réalisation, une recommandation ou un feedback..."
            className="w-full min-h-28 outline-none resize-none text-[#4A4A4A] placeholder:text-gray-400"
          />

          <div className="flex justify-end mt-4">
            <button className="bg-[#1800AD] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition">
              Publier
            </button>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          {posts.map((post) => (
            <article
              key={post.title}
              className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition"
            >
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-[#1800AD]/10 text-[#1800AD] rounded-2xl flex items-center justify-center text-2xl">
                  {post.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-xl font-bold text-[#1800AD]">
                      {post.title}
                    </h3>

                    <span className="bg-[#F6F7FB] text-[#1800AD] px-3 py-1 rounded-full text-sm font-medium">
                      {post.type}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{post.meta}</p>

                  <div className="flex flex-wrap gap-5 mt-5 text-sm font-medium text-[#4A4A4A]">
                    <button className="hover:text-[#1800AD] transition">
                      👍 Like
                    </button>

                    <button className="hover:text-[#1800AD] transition">
                      💬 Commenter
                    </button>

                    <button className="hover:text-[#1800AD] transition">
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
    </main>
  );
}