"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type UserSkill = {
  id: string;
  skill: { name: string; category?: string | null };
  level: string;
};

type MatchUser = {
  id: string;
  name: string;
  skills: UserSkill[];
  availabilities: { id: string }[];
};

const LEVELS: Record<string, string> = {
  BEGINNER: "Débutant",
  INTERMEDIATE: "Intermédiaire",
  ADVANCED: "Avancé",
  EXPERT: "Expert",
};

export default function MatchsPage() {
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/v1/users")
      .then((r) => r.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  function toggleLevel(level: string) {
    setSelectedLevel((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  }

  const filtered = users.filter((u) => {
    const skillNames = u.skills.map((s) => s.skill.name.toLowerCase());
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      skillNames.some((s) => s.includes(search.toLowerCase()));
    const matchLevel =
      selectedLevel.length === 0 ||
      u.skills.some((s) => selectedLevel.includes(s.level));
    return matchSearch && matchLevel;
  });

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const avatarColors = [
    "bg-green-500",
    "bg-[#DFB626]",
    "bg-blue-600 text-white",
    "bg-purple-500 text-white",
    "bg-red-500 text-white",
    "bg-orange-500",
  ];

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

          <Link href="/profil" className="bg-black text-white px-6 py-3 rounded-xl text-center">
            Mon profil
          </Link>
        </div>

        <div className="bg-[#F5F5F5] rounded-3xl p-5 mb-8">
          <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3">
            <span>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une compétence ou un nom..."
              className="flex-1 outline-none bg-transparent"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-black">
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="border border-gray-200 rounded-3xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Filtres</h2>

            <p className="font-bold mb-3">Niveau</p>
            {["EXPERT", "ADVANCED", "INTERMEDIATE", "BEGINNER"].map((level) => (
              <label key={level} className="block mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedLevel.includes(level)}
                  onChange={() => toggleLevel(level)}
                />
                {LEVELS[level]}
              </label>
            ))}

            <button
              onClick={() => { setSearch(""); setSelectedLevel([]); }}
              className="w-full mt-6 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              Réinitialiser
            </button>
          </aside>

          <section>
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <p className="text-gray-500">Chargement des profils…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 border border-dashed border-gray-300 rounded-3xl gap-3">
                <p className="text-2xl">🔍</p>
                <p className="text-gray-600 font-medium">
                  {users.length === 0
                    ? "Aucun étudiant inscrit pour l'instant."
                    : "Aucun résultat pour cette recherche."}
                </p>
                {users.length === 0 && (
                  <p className="text-gray-400 text-sm">
                    Invite tes camarades à rejoindre SkillSwap !
                  </p>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map((user, i) => (
                  <article
                    key={user.id}
                    className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div
                          className={`w-16 h-16 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xl font-bold`}
                        >
                          {initials(user.name)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{user.name}</h3>
                          <p className="text-gray-600">
                            {user.skills.length} compétence{user.skills.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {user.availabilities.length} dispo{user.availabilities.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {user.skills.length === 0 ? (
                        <span className="text-gray-400 text-sm">Aucune compétence renseignée</span>
                      ) : (
                        user.skills.slice(0, 4).map((s) => (
                          <span key={s.id} className="bg-[#F5F5F5] px-3 py-1 rounded-full text-sm">
                            {s.skill.name}
                          </span>
                        ))
                      )}
                      {user.skills.length > 4 && (
                        <span className="text-gray-400 text-sm px-2 py-1">
                          +{user.skills.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-end mt-6">
                      <Link
                        href={`/profil?user=${user.id}`}
                        className="bg-black text-white px-5 py-2 rounded-xl"
                      >
                        Voir le profil
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
