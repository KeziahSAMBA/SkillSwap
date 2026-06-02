"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- Types ---
type MatchUser = {
  id: string;
  name: string;
  skills: { id: string; skill: { name: string; category?: string | null }; level: string }[];
  availabilities: { id: string }[];
};

type FeedPost = {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
};

type Me = {
  id: string;
  name: string;
  skills: { id: string }[];
  availabilities: { id: string }[];
  badges?: { id: string }[];
};

// --- Helpers ---
function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `Il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Il y a ${h}h`;
  return `Il y a ${Math.floor(h / 24)} jour(s)`;
}

const AVATAR_COLORS = [
  "bg-green-500", "bg-[#DFB626]", "bg-blue-600 text-white",
  "bg-purple-500 text-white", "bg-red-500 text-white", "bg-orange-500",
];

function renderStars(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function LockedOverlay({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] rounded-3xl z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-3xl">🔒</span>
      <p className="text-gray-700 font-medium max-w-xs">{message}</p>
      <Link href="/login" className="bg-black text-white px-6 py-2 rounded-xl text-sm hover:bg-[#DFB626] hover:text-black transition">
        Se connecter
      </Link>
    </div>
  );
}

// --- Page ---
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  const [me, setMe] = useState<Me | null>(null);
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setIsLoggedIn(true);
    setLoadingData(true);

    Promise.all([
      fetch("/api/v1/users/me", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null),
      fetch("/api/v1/users").then((r) => r.json()),
      fetch("/api/v1/feed").then((r) => r.json()),
    ])
      .then(([meData, usersData, feedData]) => {
        if (meData) setMe(meData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setPosts(Array.isArray(feedData) ? feedData : []);
      })
      .catch(() => {})
      .finally(() => setLoadingData(false));
  }, []);

  const meId = me?.id;
  const filteredUsers = users
    .filter((u) => u.id !== meId)
    .filter((u) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.skills.some((s) => s.skill.name.toLowerCase().includes(q))
      );
    })
    .slice(0, 3);

  const recentPosts = posts.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-black">
      <Header />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-6 grid lg:grid-cols-2 gap-6 items-center">
        <div>
          <p className="text-[#DFB626] font-bold mb-3">Plateforme étudiante collaborative</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
            Partage tes compétences.
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 text-[#DFB626] leading-tight">
            Trouve des étudiants pour apprendre plus vite.
          </h2>
          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl">
            Dev, Design, Langues, Marketing, Musique… Rejoins une communauté d'étudiants passionnés,
            partage ce que tu sais et apprends ce que tu aimes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Link href="/matchs" className="bg-black text-white px-7 py-4 rounded-xl text-center hover:bg-[#DFB626] hover:text-black transition">
              Trouver des matchs
            </Link>
            <Link href="/register" className="border border-black px-7 py-4 rounded-xl text-center hover:bg-black hover:text-white transition">
              Proposer une compétence
            </Link>
          </div>
        </div>

        {/* Résumé étudiant */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          {!isLoggedIn && (
            <LockedOverlay message="Connecte-toi pour accéder à ton résumé personnel : compétences, disponibilités et badges." />
          )}
          <h3 className="text-2xl font-bold mb-6">Résumé étudiant</h3>
          {isLoggedIn && loadingData ? (
            <p className="text-gray-400 text-center py-6">Chargement…</p>
          ) : isLoggedIn ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: me?.skills?.length ?? 0, label: "Compétences" },
                  { value: me?.availabilities?.length ?? 0, label: "Disponibilités" },
                  { value: me?.badges?.length ?? 0, label: "Badges" },
                  { value: "—", label: "Sessions" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F5F5F5] rounded-2xl p-5 text-center">
                    <p className="font-bold text-2xl">{item.value}</p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                {(me?.skills?.length ?? 0) === 0 && (me?.availabilities?.length ?? 0) === 0 ? (
                  <>
                    Ton profil est encore vide.{" "}
                    <Link href="/profil" className="underline hover:text-black">
                      Complète-le
                    </Link>{" "}
                    pour apparaître dans les matchs.
                  </>
                ) : (
                  <>
                    Consulte ton{" "}
                    <Link href="/profil" className="underline hover:text-black">
                      profil complet
                    </Link>.
                  </>
                )}
              </p>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {["14 Sessions", "680 XP gagnés", "8 Badges", "4.8 Note moyenne"].map((item) => (
                <div key={item} className="bg-[#F5F5F5] rounded-2xl p-5 text-center">
                  <p className="font-bold text-2xl">{item.split(" ")[0]}</p>
                  <p className="text-sm text-gray-600">{item.replace(item.split(" ")[0], "")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Barre de recherche */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-5 pt-5">
        {!isLoggedIn && (
          <LockedOverlay message="Connecte-toi pour rechercher des compétences et filtrer les étudiants par domaine." />
        )}
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="bg-[#F5F5F5] rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-3">
            <span>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
              className="bg-transparent outline-none flex-1 text-sm sm:text-base"
            />
            <Link href="/matchs" className="hidden md:block bg-black text-white px-5 py-2 rounded-xl hover:bg-[#DFB626] hover:text-black transition">
              Rechercher
            </Link>
          </div>
        </div>
      </section>

      {/* Matchs suggérés */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-5 mt-4 py-5 border-t border-gray-200">
        {!isLoggedIn && (
          <LockedOverlay message="Connecte-toi pour découvrir les étudiants qui correspondent à tes compétences." />
        )}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold">Matchs suggérés</h3>
          <Link href="/matchs" className="text-sm sm:text-lg text-gray-400 hover:text-black">Voir tout →</Link>
        </div>

        {isLoggedIn && loadingData ? (
          <p className="text-gray-400 text-center py-8">Chargement…</p>
        ) : isLoggedIn && filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center flex flex-col items-center gap-3">
            <p className="text-3xl">🤝</p>
            <p className="font-medium text-gray-700">
              {search ? "Aucun résultat pour cette recherche." : "Aucun étudiant disponible pour le moment."}
            </p>
            <p className="text-gray-400 text-sm">Invite tes camarades à rejoindre SkillSwap !</p>
          </div>
        ) : isLoggedIn ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {filteredUsers.map((user, i) => (
              <article key={user.id} className="relative bg-white border border-black rounded-xl p-6 min-h-[250px] hover:shadow-lg transition">
                {i === 0 && (
                  <span className="absolute -top-3 left-6 bg-[#DFB626] text-black px-5 py-1 rounded-full text-xs font-bold">
                    Suggestion
                  </span>
                )}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {initials(user.name)}
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl leading-tight">{user.name}</h4>
                      <p className="text-gray-500 text-sm">{user.skills.length} compétence{user.skills.length !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{user.availabilities.length} dispo{user.availabilities.length !== 1 ? "s" : ""}</p>
                </div>

                {user.skills.length === 0 ? (
                  <p className="text-gray-400 text-sm mt-6">Aucune compétence renseignée.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {user.skills.slice(0, 4).map((s) => (
                      <div key={s.id} className="bg-[#F1F1F1] rounded-md px-3 py-2 flex items-center justify-center text-sm font-serif">
                        {s.skill.name}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <Link href={`/profil?user=${user.id}`} className="bg-[#363030] text-white px-6 py-3 rounded-xl font-serif text-base hover:bg-black transition">
                    Voir profil
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Version déconnectée — aperçu statique
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {[
              { initials: "TC", name: "Tom", role: "Dev Web", score: 96, rating: 5, tags: ["React.js", "Node"], sessions: "23 sessions", best: true },
              { initials: "SA", name: "Sarah", role: "E-biz", score: 89, rating: 4, tags: ["SEO", "Canva"], sessions: "11 sessions", best: false },
              { initials: "ES", name: "Estelle", role: "Chef de projet", score: 83, rating: 4, tags: ["Agile", "Sprints"], sessions: "8 sessions", best: false },
            ].map((match, i) => (
              <article key={match.name} className="relative bg-white border border-black rounded-xl p-6 min-h-[250px]">
                {match.best && (
                  <span className="absolute -top-3 left-6 bg-[#DFB626] text-black px-5 py-1 rounded-full text-xs font-bold">
                    Meilleur match
                  </span>
                )}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {match.initials}
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl leading-tight">{match.name}</h4>
                      <p className="font-serif text-xl">{match.role}</p>
                    </div>
                  </div>
                  <p className="font-serif text-right text-sm leading-5">{match.score}%<br />compatib.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {match.tags.map((tag, idx) => (
                    <div key={tag} className="bg-[#F1F1F1] rounded-md px-3 py-2 flex items-center justify-center gap-2 font-serif text-base sm:text-lg">
                      <span className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-[#E8B7A3]" : "bg-purple-500"}`} />
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-end mt-8">
                  <div>
                    <p className="text-xl tracking-widest text-[#DFB626]">{renderStars(match.rating)}</p>
                    <p className="font-serif text-sm">{match.sessions}</p>
                  </div>
                  <Link href="/login" className="bg-[#363030] text-white px-6 py-3 rounded-xl font-serif text-base hover:bg-black transition">
                    {match.best ? "Matcher" : "Voir profil"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Prochaines sessions */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-5 mt-4 py-5 border-t border-gray-200">
        {!isLoggedIn && (
          <LockedOverlay message="Connecte-toi pour consulter et gérer tes prochaines sessions planifiées." />
        )}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl sm:text-3xl font-bold">Prochaines sessions</h3>
          <Link href="/sessions" className="text-sm sm:text-lg text-gray-400 hover:text-black">Voir tout →</Link>
        </div>

        {isLoggedIn ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center flex flex-col items-center gap-3">
            <p className="text-3xl">📅</p>
            <p className="font-medium text-gray-700">Aucune session planifiée pour le moment.</p>
            <Link href="/matchs" className="bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-[#DFB626] hover:text-black transition">
              Trouver un étudiant
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {[
              { day: "LUN", hour: "14h", title: "Intro React avec Tom", place: "Salle B203 · 1h", status: "Confirmé" },
              { day: "JEU", hour: "12h", title: "Canva avec Sarah", place: "Visio · 45min", status: "Attente" },
              { day: "VEN", hour: "10h", title: "Sprints avec Estelle", place: "Visio · 30min", status: "Ouvert" },
            ].map((s) => (
              <div key={s.title} className="block bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="bg-[#F5F5F5] w-20 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-medium">
                      <span>{s.day}</span><span>{s.hour}</span>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold">{s.title}</h4>
                      <p className="text-gray-600">{s.place}</p>
                    </div>
                  </div>
                  <span className={`px-6 py-2 rounded-full text-sm text-center ${
                    s.status === "Confirmé" ? "bg-green-100 text-green-700 border border-green-300" :
                    s.status === "Attente" ? "bg-[#DFB626] text-black border border-[#DFB626]" :
                    "bg-black text-white border border-black"
                  }`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Actualités */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-5 mt-4 py-5 border-t border-gray-200">
        {!isLoggedIn && (
          <LockedOverlay message="Connecte-toi pour suivre les actualités de ta communauté : réalisations, badges et recommandations." />
        )}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold">Actualités</h3>
          <Link href="/feed" className="text-sm sm:text-lg text-gray-400 hover:text-black">Voir tout →</Link>
        </div>

        {isLoggedIn && loadingData ? (
          <p className="text-gray-400 text-center py-6">Chargement…</p>
        ) : isLoggedIn && recentPosts.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center flex flex-col items-center gap-3">
            <p className="text-3xl">📭</p>
            <p className="font-medium text-gray-700">Aucune actualité pour le moment.</p>
            <Link href="/feed" className="bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-[#DFB626] hover:text-black transition">
              Aller sur le feed
            </Link>
          </div>
        ) : isLoggedIn ? (
          <div className="space-y-5">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-5 bg-white border border-gray-200 rounded-2xl p-5">
                <div className="w-16 h-14 bg-[#DFB626] rounded-xl flex items-center justify-center text-xl font-bold shrink-0">
                  {initials(post.author.name)}
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{post.author.name}</p>
                  <p className="text-gray-700 mt-1 line-clamp-2">{post.content}</p>
                  <p className="text-sm text-gray-400 mt-1">{timeAgo(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {[
              { icon: "🖼️", title: "Tom a partagé son portfolio", meta: "Il y a 2h · 24 likes" },
              { icon: "🏆", title: "Kim a obtenu un badge", meta: "Il y a 5h · Top Formateur" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl p-5">
                <div className="w-16 h-14 bg-[#DFB626] rounded-xl flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
