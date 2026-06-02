"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const matches = [
  {
    initials: "TC",
    name: "Tom",
    role: "Dev Web",
    score: 96,
    rating: 5,
    tags: ["React.js", "Node"],
    sessions: "23 sessions",
    category: "Développement",
    best: true,
  },
  {
    initials: "SA",
    name: "Sarah",
    role: "E-biz",
    score: 89,
    rating: 4,
    tags: ["SEO", "Canva"],
    sessions: "11 sessions",
    category: "Marketing",
    best: false,
  },
  {
    initials: "ES",
    name: "Estelle",
    role: "Chef de projet",
    score: 83,
    rating: 4,
    tags: ["Agile", "Sprints"],
    sessions: "8 sessions",
    category: "Business",
    best: false,
  },
];

const sessions = [
  {
    day: "LUN",
    hour: "14h",
    title: "Intro React avec Tom",
    place: "Salle B203 · 1h",
    type: "📍",
    status: "Confirmé",
  },
  {
    day: "JEU",
    hour: "12h",
    title: "Canva avec Sarah",
    place: "Visio · 45min",
    type: "▶",
    status: "Attente",
  },
  {
    day: "VEN",
    hour: "10h",
    title: "Sprints avec Estelle",
    place: "Visio · 30min",
    type: "▶",
    status: "Ouvert",
  },
];

const news = [
  {
    icon: "🖼️",
    title: "Tom a partagé son portfolio",
    meta: "Il y a 2h · 24 likes",
  },
  {
    icon: "🏆",
    title: "Kim a obtenu un badge",
    meta: "Il y a 5h · Top Formateur",
  },
];

const categories = [
  "Tous",
  "Développement",
  "Design",
  "Langues",
  "Marketing",
  "Business",
];

function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function getStatusClass(status: string) {
  if (status === "Confirmé") {
    return "bg-green-100 text-green-700 border border-green-300";
  }

  if (status === "Attente") {
    return "bg-[#DFB626] text-black border border-[#DFB626]";
  }

  if (status === "Ouvert") {
    return "bg-black text-white border border-black";
  }

  return "bg-gray-100 text-gray-700 border border-gray-300";
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const query = search.toLowerCase();

      const matchSearch =
        match.name.toLowerCase().includes(query) ||
        match.role.toLowerCase().includes(query) ||
        match.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchCategory =
        activeCategory === "Tous" || match.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-4 sm:px-5 pt-8">
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="bg-[#F5F5F5] rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-3">
            <span>🔍</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Que souhaitez-vous apprendre aujourd’hui ?"
              className="bg-transparent outline-none flex-1 text-sm sm:text-base"
            />

            <Link
              href="/matchs"
              className="hidden md:block bg-black text-white px-5 py-2 rounded-xl hover:bg-[#DFB626] hover:text-black transition"
            >
              Rechercher
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActiveCategory(item)}
                className={`border px-4 py-2 rounded-full text-sm transition ${
                  activeCategory === item
                    ? "bg-[#DFB626] border-[#DFB626]"
                    : "bg-white hover:bg-[#DFB626]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <p className="text-[#DFB626] font-bold mb-3">
            Plateforme étudiante collaborative
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight">
            Partage tes compétences.
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 text-[#DFB626] leading-tight">
            Trouve des étudiants pour apprendre plus vite.
          </h2>

          <p className="mt-6 text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl">
            Dev, Design, Langues, Marketing, Musique… Rejoins une communauté
            d’étudiants passionnés, partage ce que tu sais et apprends ce que tu
            aimes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/matchs"
              className="bg-black text-white px-7 py-4 rounded-xl text-center hover:bg-[#DFB626] hover:text-black transition"
            >
              Trouver des matchs
            </Link>

            <Link
              href="/register"
              className="border border-black px-7 py-4 rounded-xl text-center hover:bg-black hover:text-white transition"
            >
              Proposer une compétence
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-6">Résumé étudiant</h3>

          <div className="grid grid-cols-2 gap-4">
            {["14 Sessions", "680 XP gagnés", "8 Badges", "4.8 Note moyenne"].map(
              (item) => (
                <Link
                  href="/profil"
                  key={item}
                  className="bg-[#F5F5F5] rounded-2xl p-5 text-center hover:bg-[#DFB626] transition"
                >
                  <p className="font-bold text-2xl">{item.split(" ")[0]}</p>
                  <p className="text-sm text-gray-600">
                    {item.replace(item.split(" ")[0], "")}
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold">Matchs suggérés</h3>

          <Link
            href="/matchs"
            className="text-sm sm:text-lg hover:text-[#DFB626]"
          >
            Voir tout →
          </Link>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            Aucun match trouvé pour cette recherche.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {filteredMatches.map((match) => (
              <article
                key={match.name}
                className="relative bg-white border border-black rounded-xl p-6 min-h-[250px] hover:shadow-lg transition"
              >
                {match.best && (
                  <span className="absolute -top-3 left-6 bg-[#DFB626] text-black px-5 py-1 rounded-full text-xs font-bold">
                    Meilleur match
                  </span>
                )}

                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 items-start">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl ${
                        match.initials === "TC"
                          ? "bg-green-500"
                          : match.initials === "SA"
                          ? "bg-[#DFB626]"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {match.initials}
                    </div>

                    <div>
                      <h4 className="font-serif text-2xl leading-tight">
                        {match.name}
                      </h4>
                      <p className="font-serif text-xl">{match.role}</p>
                    </div>
                  </div>

                  <p className="font-serif text-right text-sm leading-5">
                    {match.score}%
                    <br />
                    compatib.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10">
                  {match.tags.map((tag, index) => (
                    <div
                      key={tag}
                      className="bg-[#F1F1F1] rounded-md px-3 py-2 flex items-center justify-center gap-2 font-serif text-base sm:text-lg"
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          index === 0 ? "bg-[#E8B7A3]" : "bg-purple-500"
                        }`}
                      />
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end mt-8">
                  <div>
                    <p className="text-xl tracking-widest text-[#DFB626]">
                      {renderStars(match.rating)}
                    </p>
                    <p className="font-serif text-sm">{match.sessions}</p>
                  </div>

                  <Link
                    href="/profil"
                    className="bg-[#363030] text-white px-6 py-3 rounded-xl font-serif text-base hover:bg-black transition"
                  >
                    {match.best ? "Matcher" : "Voir profil"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-10">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Prochaines sessions
          </h3>

          <Link
            href="/sessions"
            className="text-sm sm:text-lg hover:text-[#DFB626]"
          >
            Voir tout →
          </Link>
        </div>

        <div className="space-y-5">
          {sessions.map((session) => (
            <Link
              href="/sessions"
              key={session.title}
              className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#DFB626] hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-center gap-5">
                  <div className="bg-[#F5F5F5] w-20 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium">
                    <span>{session.day}</span>
                    <span>{session.hour}</span>
                  </div>

                  <div>
                    <h4 className="text-xl md:text-2xl font-bold">
                      {session.title}
                    </h4>

                    <p className="text-gray-600">
                      <span className="mr-2">{session.type}</span>
                      {session.place}
                    </p>
                  </div>
                </div>

                <span
                  className={`${getStatusClass(
                    session.status
                  )} px-6 py-2 rounded-full text-sm text-center`}
                >
                  {session.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold">Actualités</h3>

          <Link
            href="/feed"
            className="text-sm sm:text-lg hover:text-[#DFB626]"
          >
            Voir tout →
          </Link>
        </div>

        <div className="space-y-5">
          {news.map((item) => (
            <Link
              key={item.title}
              href="/feed"
              className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#DFB626] hover:shadow-md transition"
            >
              <div className="w-16 h-14 bg-[#DFB626] rounded-xl flex items-center justify-center text-2xl">
                {item.icon}
              </div>

              <div>
                <p className="text-lg sm:text-2xl font-bold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}