import Header from "@/components/Header";
import Footer from "@/components/Footer";

const posts = [
  { icon: "🖼️", title: "Tom a partagé son portfolio", meta: "Il y a 2h · 24 likes" },
  { icon: "🏆", title: "Kim a obtenu le badge Top Formateur", meta: "Il y a 5h · Badge débloqué" },
  { icon: "💬", title: "Sarah a recommandé Estelle pour la gestion de projet", meta: "Il y a 1 jour · Recommandation" },
  { icon: "⭐", title: "Lucas a laissé un feedback après une session d’anglais", meta: "Il y a 2 jours · Feedback" },
];

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-5xl mx-auto px-5 py-12">
        <p className="text-[#DFB626] font-bold">Feed social</p>
        <h1 className="text-5xl font-serif font-bold mt-2">Valorise tes réalisations</h1>
        <p className="text-gray-600 mt-3">
          Publications, recommandations et feedbacks entre étudiants.
        </p>

        <div className="border border-gray-200 rounded-3xl p-6 mt-10">
          <textarea
            placeholder="Partage une réalisation, une recommandation ou un feedback..."
            className="w-full min-h-28 outline-none resize-none"
          />
          <div className="flex justify-end mt-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl">
              Publier
            </button>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          {posts.map((post) => (
            <article key={post.title} className="border border-gray-200 rounded-3xl p-6 hover:shadow-md transition">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-[#DFB626] rounded-2xl flex items-center justify-center text-2xl">
                  {post.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600">{post.meta}</p>

                  <div className="flex gap-5 mt-4 text-sm">
                    <button>👍 Like</button>
                    <button>💬 Commenter</button>
                    <button>↗ Partager</button>
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