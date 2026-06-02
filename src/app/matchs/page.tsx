import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const users = [
  {
    initials: "TC",
    name: "Tom Couture",
    role: "Dev Web",
    score: "96%",
    tags: ["React.js", "Node", "Next.js"],
    sessions: "23 sessions",
    color: "bg-green-500",
  },
  {
    initials: "SA",
    name: "Sarah Benali",
    role: "E-business",
    score: "89%",
    tags: ["SEO", "Canva", "Marketing"],
    sessions: "11 sessions",
    color: "bg-[#DFB626]",
  },
  {
    initials: "ES",
    name: "Estelle Morel",
    role: "Chef de projet",
    score: "83%",
    tags: ["Agile", "Scrum", "Sprint"],
    sessions: "8 sessions",
    color: "bg-blue-600 text-white",
  },
  {
    initials: "KM",
    name: "Kim Martin",
    role: "Design UX/UI",
    score: "91%",
    tags: ["Figma", "Prototype", "UX"],
    sessions: "17 sessions",
    color: "bg-purple-500 text-white",
  },
];

export default function MatchsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Trouve ton meilleur match
            </h1>
            <p className="text-gray-600 mt-3">
              Recherche un étudiant selon une compétence, un niveau ou une disponibilité.
            </p>
          </div>

          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-xl text-center"
          >
            Mon profil
          </Link>
        </div>

        <div className="bg-[#F5F5F5] rounded-3xl p-5 mb-8">
          <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3">
            <span>🔍</span>
            <input
              placeholder="Rechercher une compétence..."
              className="flex-1 outline-none bg-transparent"
            />
            <button className="bg-black text-white px-5 py-2 rounded-xl">
              Rechercher
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {["Tous", "Dev", "Design", "Langues", "Business", "Marketing"].map(
              (item) => (
                <button
                  key={item}
                  className="bg-white border border-gray-200 px-5 py-2 rounded-full hover:bg-[#DFB626] transition"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="border border-gray-200 rounded-3xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Filtres</h2>

            <p className="font-bold mb-3">Niveau</p>
            {["Expert", "Intermédiaire", "Débutant"].map((item) => (
              <label key={item} className="block mb-3">
                <input type="checkbox" className="mr-2" defaultChecked />
                {item}
              </label>
            ))}

            <p className="font-bold mt-7 mb-3">Disponibilité</p>
            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((item) => (
              <label key={item} className="block mb-3">
                <input type="checkbox" className="mr-2" />
                {item}
              </label>
            ))}

            <button className="w-full mt-6 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition">
              Réinitialiser
            </button>
          </aside>

          <section className="grid md:grid-cols-2 gap-6">
            {users.map((user) => (
              <article
                key={user.name}
                className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div
                      className={`w-16 h-16 rounded-full ${user.color} flex items-center justify-center text-xl font-bold`}
                    >
                      {user.initials}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-gray-600">{user.role}</p>
                    </div>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {user.score}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#F5F5F5] px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p>★★★★★</p>
                    <p className="text-sm text-gray-600">{user.sessions}</p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href="/"
                      className="bg-black text-white px-5 py-2 rounded-xl"
                    >
                      Profil
                    </Link>

                    <button className="border border-black px-5 py-2 rounded-xl">
                      Matcher
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}