"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = ["Tous", "Dev", "Design", "Langues", "Business", "Marketing"];
const LEVELS = ["Expert", "Avancé", "Intermédiaire", "Débutant"];
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const DAY_LABELS: Record<number, string> = {
  0: "Dim",
  1: "Lun",
  2: "Mar",
  3: "Mer",
  4: "Jeu",
  5: "Ven",
  6: "Sam",
};

type UserSkill = {
  level: string;
  skill: { name: string; category: string | null };
};

type MatchUser = {
  id: string;
  name: string;
  bio: string | null;
  skills: UserSkill[];
  availabilities: { dayOfWeek: number; startTime: string; endTime: string }[];
  _count: { sessionsParts: number };
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-[#1800AD]",
  "bg-[#4D3AFF]",
  "bg-blue-600",
  "bg-purple-500",
  "bg-indigo-600",
  "bg-violet-600",
];

function avatarColor(name: string) {
  let hash = 0;
  for (const c of name) hash += c.charCodeAt(0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function MatchsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([...LEVELS]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingMatchs, setPendingMatchs] = useState<Set<string>>(new Set());
  const [hoveredMatch, setHoveredMatch] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const justClickedMatch = useRef<Set<string>>(new Set());

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (selectedLevels.length > 0 && selectedLevels.length < LEVELS.length)
      params.set("levels", selectedLevels.join(","));
    if (selectedDays.length > 0) params.set("days", selectedDays.join(","));
    if (selectedCategory !== "Tous") params.set("category", selectedCategory);

    fetch(`/api/v1/matchs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setUsers(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setUsers([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [debouncedSearch, selectedLevels, selectedDays, selectedCategory]);

  function toggleLevel(level: string) {
    setLoading(true);
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  }

  function toggleDay(day: string) {
    setLoading(true);
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function resetFilters() {
    setLoading(true);
    setSearch("");
    setSelectedCategory("Tous");
    setSelectedLevels([...LEVELS]);
    setSelectedDays([]);
  }

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
          backgroundAttachment: "scroll",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-32 md:pt-40 pb-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
                Matchmaking étudiant
              </span>
              <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
                Trouve ton meilleur match
              </h1>
              <p className="text-white/70 mt-3">
                Recherche un étudiant selon une compétence, un niveau ou une disponibilité.
              </p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-5 mb-8">
            <div className="backdrop-blur-xs bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-3">
              <input
                value={search}
                onChange={(e) => { setLoading(true); setSearch(e.target.value); }}
                placeholder="Rechercher une compétence..."
                className="flex-1 outline-none bg-transparent text-white placeholder-white/50"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/40 hover:text-white transition text-lg"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setLoading(true); setSelectedCategory(cat); }}
                  className={`backdrop-blur-xs border px-5 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat
                      ? "bg-[#4D3AFF]/60 border-[#a594ff]/70 text-white"
                      : "bg-white/10 border-white/20 text-white hover:bg-[#4D3AFF]/40 hover:border-[#a594ff]/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grille filtres + cartes */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Filtres */}
            <aside className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 h-fit">
              <button
                className="lg:hidden w-full flex items-center justify-between mb-2"
                onClick={() => setShowFilters((v) => !v)}
              >
                <h2 className="text-2xl font-black text-[#a594ff]">Filtres</h2>
                <span className="text-white/60 text-xl">{showFilters ? "▲" : "▼"}</span>
              </button>
              <h2 className="hidden lg:block text-2xl font-black mb-6 text-[#a594ff]">Filtres</h2>
              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <p className="font-bold mb-3 text-white/80">Niveau</p>
              {LEVELS.map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 mb-3 text-white/70 cursor-pointer hover:text-white transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => toggleLevel(level)}
                    className="accent-[#a594ff]"
                  />
                  {level}
                </label>
              ))}

              <p className="font-bold mt-7 mb-3 text-white/80">Disponibilité</p>
              {DAYS.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 mb-3 text-white/70 cursor-pointer hover:text-white transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="accent-[#a594ff]"
                  />
                  {day}
                </label>
              ))}

              <button
                onClick={resetFilters}
                className="w-full mt-6 backdrop-blur-xs bg-black/20 border border-white/25 text-white/80 py-3 rounded-xl hover:bg-black/30 hover:text-white font-semibold transition"
              >
                Réinitialiser
              </button>
              </div>
            </aside>

            {/* Cartes */}
            <section>
              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 animate-pulse"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-white/20" />
                        <div className="flex-1 space-y-2 pt-1">
                          <div className="h-4 bg-white/20 rounded w-2/3" />
                          <div className="h-3 bg-white/10 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-7 bg-white/10 rounded-full w-20" />
                        <div className="h-7 bg-white/10 rounded-full w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : users.length === 0 ? (
                <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-xl font-bold text-[#a594ff]">Aucun résultat</p>
                  <p className="text-white/60 mt-2">
                    Essaie d&apos;autres mots-clés ou modifie tes filtres.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-6 backdrop-blur-xs bg-white/15 border border-white/30 text-white px-6 py-2 rounded-xl hover:bg-white/25 transition"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {users.map((user) => (
                    <article
                      key={user.id}
                      className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div
                            className={`w-16 h-16 rounded-full ${avatarColor(user.name)} text-white flex items-center justify-center text-xl font-bold border-2 border-white/30 shrink-0`}
                          >
                            {initials(user.name)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{user.name}</h3>
                            {user.bio && (
                              <p className="text-white/60 text-sm mt-0.5 line-clamp-2">{user.bio}</p>
                            )}
                          </div>
                        </div>

                        <span className="backdrop-blur-xs bg-[#4D3AFF]/30 border border-[#a594ff]/40 text-[#a594ff] px-3 py-1 rounded-full text-sm font-bold shrink-0">
                          {user._count.sessionsParts} sessions
                        </span>
                      </div>

                      {/* Compétences */}
                      {user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {user.skills.slice(0, 4).map((us) => (
                            <span
                              key={us.skill.name}
                              className="backdrop-blur-xs bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                              {us.skill.name}
                              <span className="text-white/40 text-xs">{us.level}</span>
                            </span>
                          ))}
                          {user.skills.length > 4 && (
                            <span className="text-white/40 text-sm self-center">
                              +{user.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Disponibilités */}
                      {user.availabilities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {user.availabilities.slice(0, 3).map((a, i) => (
                            <span
                              key={i}
                              className="backdrop-blur-xs bg-green-500/15 border border-green-400/30 text-green-300 px-2 py-0.5 rounded-full text-xs"
                            >
                              {DAY_LABELS[a.dayOfWeek]} {a.startTime}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 mt-6">
                        <Link
                          href={`/profil/${user.id}`}
                          className="backdrop-blur-xs bg-white/25 border border-white/40 text-white font-semibold px-5 py-2 rounded-xl hover:bg-white/35 transition"
                        >
                          Profil
                        </Link>
                        <button
                          onClick={() => {
                            if (!pendingMatchs.has(user.id)) {
                              setHoveredMatch(null);
                              justClickedMatch.current.add(user.id);
                            }
                            setPendingMatchs((prev) => {
                              const next = new Set(prev);
                              if (next.has(user.id)) next.delete(user.id);
                              else next.add(user.id);
                              return next;
                            });
                          }}
                          onMouseEnter={() => {
                            if (!justClickedMatch.current.has(user.id)) setHoveredMatch(user.id);
                          }}
                          onMouseLeave={() => {
                            setHoveredMatch(null);
                            justClickedMatch.current.delete(user.id);
                          }}
                          className={`backdrop-blur-xs font-semibold px-5 py-2 rounded-xl transition ${
                            pendingMatchs.has(user.id)
                              ? hoveredMatch === user.id
                                ? "bg-orange-500/50 border border-orange-400/50 text-white"
                                : "bg-white/10 border border-white/15 text-white/40"
                              : "bg-black/20 border border-white/25 text-white/80 hover:bg-black/30 hover:text-white"
                          }`}
                        >
                          {pendingMatchs.has(user.id)
                            ? hoveredMatch === user.id ? "Annuler" : "En attente"
                            : "Matcher"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
