"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  bio?: string;
  skills?: { id: string; name?: string; skill?: { name: string }; type: string; level: string }[];
  availabilities?: { id: string; day: string; startTime: string; endTime: string }[];
};

const profiles = [
  {
    slug: "tom",
    initials: "TC",
    name: "Tom Couture",
    role: "Développement Web",
    school: "Institut F2I",
    level: "Bac+3",
    score: 96,
    rating: 5,
    sessions: 23,
    xp: 680,
    color: "bg-green-500",
    bio: "Passionné de front-end, j’aide les étudiants à progresser sur React, Next.js et Node.js.",
    teach: [
      { name: "React.js", level: "Expert" },
      { name: "Node.js", level: "Intermédiaire" },
      { name: "Next.js", level: "Expert" },
      { name: "HTML/CSS", level: "Expert" },
    ],
    learn: ["Figma", "UX Design"],
    availability: [
      { day: "Lundi", hour: "14h - 15h", available: true },
      { day: "Mercredi", hour: "18h - 19h", available: true },
      { day: "Vendredi", hour: "10h - 11h", available: false },
    ],
    badges: ["Expert React", "Mentor", "23 sessions"],
    feedbacks: [
      "Très pédagogue sur React.",
      "Explique clairement les concepts.",
      "Je recommande pour progresser vite.",
    ],
  },
  {
    slug: "sarah",
    initials: "SA",
    name: "Sarah Benali",
    role: "E-business",
    school: "Institut F2I",
    level: "Bac+3",
    score: 89,
    rating: 4,
    sessions: 11,
    xp: 420,
    color: "bg-[#DFB626]",
    bio: "Spécialisée en marketing digital, SEO et création de contenus visuels avec Canva.",
    teach: [
      { name: "SEO", level: "Expert" },
      { name: "Canva", level: "Intermédiaire" },
      { name: "Marketing digital", level: "Expert" },
    ],
    learn: ["Node.js", "Analytics"],
    availability: [
      { day: "Mardi", hour: "12h - 13h", available: true },
      { day: "Jeudi", hour: "16h - 17h", available: false },
      { day: "Vendredi", hour: "14h - 15h", available: true },
    ],
    badges: ["Top Formateur", "SEO+", "Créative"],
    feedbacks: [
      "Très claire sur les bases du SEO.",
      "Bonne méthode pour structurer une campagne.",
      "Super accompagnement.",
    ],
  },
  {
    slug: "estelle",
    initials: "ES",
    name: "Estelle Morel",
    role: "Chef de projet",
    school: "Digital School of Paris",
    level: "Master 1",
    score: 83,
    rating: 4,
    sessions: 8,
    xp: 350,
    color: "bg-blue-600 text-white",
    bio: "J’accompagne les étudiants sur la gestion Agile, Scrum, Trello et la préparation de soutenance.",
    teach: [
      { name: "Agile", level: "Expert" },
      { name: "Scrum", level: "Expert" },
      { name: "Trello", level: "Intermédiaire" },
    ],
    learn: ["React.js", "UI Design"],
    availability: [
      { day: "Lundi", hour: "10h - 11h", available: true },
      { day: "Jeudi", hour: "13h - 14h", available: false },
      { day: "Vendredi", hour: "15h - 16h", available: true },
    ],
    badges: ["Scrum Master", "Organisation", "Sprint"],
    feedbacks: [
      "Très bonne méthode de travail.",
      "Aide beaucoup à organiser le projet.",
      "Très utile pour préparer le jury.",
    ],
  },
  {
    slug: "kim",
    initials: "KM",
    name: "Kim Martin",
    role: "Design UX/UI",
    school: "Digital School of Paris",
    level: "Bachelor",
    score: 91,
    rating: 5,
    sessions: 17,
    xp: 530,
    color: "bg-purple-500 text-white",
    bio: "Designer UX/UI, j’aide à créer des maquettes propres, modernes et faciles à utiliser.",
    teach: [
      { name: "Figma", level: "Expert" },
      { name: "Wireframe", level: "Expert" },
      { name: "Prototype", level: "Intermédiaire" },
    ],
    learn: ["Next.js", "SEO"],
    availability: [
      { day: "Mercredi", hour: "13h - 14h", available: true },
      { day: "Jeudi", hour: "18h - 19h", available: true },
      { day: "Vendredi", hour: "11h - 12h", available: false },
    ],
    badges: ["UX Designer", "Créativité", "Prototype"],
    feedbacks: [
      "Très bon sens du détail.",
      "Ses maquettes sont très claires.",
      "Aide vraiment à améliorer l’interface.",
    ],
  },
];

function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export default function ProfilPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userSlug = searchParams.get("user");

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem("user") ?? "null"); } catch { return null; }
  });
  const [loading, setLoading] = useState(!userSlug);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<{ name: string; bio: string }>(() => {
    if (typeof window === "undefined") return { name: "", bio: "" };
    try {
      const u = JSON.parse(localStorage.getItem("user") ?? "null");
      return { name: u?.name ?? "", bio: u?.bio ?? "" };
    } catch { return { name: "", bio: "" }; }
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userSlug) return;

    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    fetch("/api/v1/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (r.status === 401) { localStorage.removeItem("token"); router.push("/login"); return null; } return r.json(); })
      .then((data) => { if (!data) return; setAuthUser(data); setForm({ name: data.name ?? "", bio: data.bio ?? "" }); })
      .catch(() => setError("Impossible de charger le profil."))
      .finally(() => setLoading(false));
  }, [router, userSlug]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/v1/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setAuthUser((prev) => ({ ...prev, ...data }));
      localStorage.setItem("user", JSON.stringify({ ...authUser, ...data }));
      setEditMode(false);
    } else {
      setError(data.message ?? "Erreur lors de la sauvegarde.");
    }
  }

  if (loading) return <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center"><p className="text-gray-600">Chargement…</p></main>;

  // Vue profil d'un autre étudiant (?user=slug) — rendu statique original
  if (userSlug) {
    const profile = profiles.find((item) => item.slug === userSlug) || profiles[0];
    return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/matchs" className="text-sm hover:text-[#DFB626]">
          ← Retour aux matchs
        </Link>

        <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-8">
          <aside className="border border-gray-200 rounded-3xl p-6 h-fit">
            <div
              className={`w-32 h-32 ${profile.color} rounded-full flex items-center justify-center text-5xl font-bold mx-auto`}
            >
              {profile.initials}
            </div>

            <h1 className="text-2xl font-bold text-center mt-5">
              {profile.name}
            </h1>

            <p className="text-center text-gray-600">{profile.role}</p>
            <p className="text-center text-gray-500 text-sm">
              {profile.school} · {profile.level}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-black text-white rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">{profile.rating}.0 ★</p>
                <p className="text-sm">Note</p>
              </div>

              <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold text-green-700">
                  {profile.score}%
                </p>
                <p className="text-sm">Match</p>
              </div>

              <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">{profile.sessions}</p>
                <p className="text-sm">Sessions</p>
              </div>

              <div className="bg-[#DFB626] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">{profile.xp}</p>
                <p className="text-sm">XP</p>
              </div>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl mt-6 hover:bg-[#DFB626] hover:text-black transition">
              Matcher
            </button>

            <button className="w-full border border-black py-4 rounded-xl mt-3 hover:bg-black hover:text-white transition">
              Envoyer un message
            </button>
          </aside>

          <section className="space-y-8">
            <div className="border border-gray-200 rounded-3xl p-8">
              <p className="text-[#DFB626] font-bold mb-2">
                Profil étudiant
              </p>

              <h2 className="text-4xl font-serif font-bold">
                {profile.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {profile.role} · {profile.school} · {profile.level}
              </p>

              <p className="text-[#DFB626] mt-4 text-xl">
                {renderStars(profile.rating)}
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-xl mb-2">Bio</h3>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-3xl p-8">
                <h3 className="font-bold text-xl mb-4">J’enseigne</h3>

                <div className="space-y-3">
                  {profile.teach.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex justify-between items-center bg-[#F5F5F5] rounded-2xl px-4 py-3"
                    >
                      <span>{skill.name}</span>
                      <span className="bg-[#DFB626] px-3 py-1 rounded-full text-sm">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-3xl p-8">
                <h3 className="font-bold text-xl mb-4">J’apprends</h3>

                <div className="flex flex-wrap gap-3">
                  {profile.learn.map((item) => (
                    <span
                      key={item}
                      className="bg-[#F5F5F5] px-4 py-2 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <h3 className="font-bold text-xl mb-4">Disponibilités</h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.availability.map((slot) => (
                  <div
                    key={slot.day + slot.hour}
                    className={`rounded-2xl p-4 border ${
                      slot.available
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-[#F5F5F5]"
                    }`}
                  >
                    <p className="font-bold">{slot.day}</p>
                    <p className="text-gray-600">{slot.hour}</p>

                    <p
                      className={`text-sm mt-2 font-medium ${
                        slot.available ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {slot.available ? "Disponible" : "Occupé"}
                    </p>

                    {slot.available ? (
                      <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-[#DFB626] hover:text-black transition">
                        Réserver
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full mt-4 bg-gray-300 text-gray-500 py-2 rounded-xl cursor-not-allowed"
                      >
                        Indisponible
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <h3 className="font-bold text-xl mb-4">Badges débloqués</h3>

              <div className="flex flex-wrap gap-3">
                {profile.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-black text-white px-4 py-2 rounded-full"
                  >
                    🏆 {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <div className="flex justify-between mb-6">
                <h3 className="font-bold text-2xl">Avis reçus</h3>
                <Link href="/feed" className="hover:text-[#DFB626]">
                  Voir tout →
                </Link>
              </div>

              {profile.feedbacks.map((avis) => (
                <div
                  key={avis}
                  className="border-b border-gray-100 py-4 flex flex-col sm:flex-row sm:justify-between gap-2"
                >
                  <p>{avis}</p>
                  <p className="text-[#DFB626]">
                    {renderStars(profile.rating)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
    );
  }

  // Vue profil connecté (données API)
  const initials = authUser?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/" className="text-sm hover:text-[#DFB626]">← Accueil</Link>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
        )}

        <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-8">
          <aside className="border border-gray-200 rounded-3xl p-6 h-fit">
            <div className="w-32 h-32 bg-[#DFB626] rounded-full flex items-center justify-center text-5xl font-bold mx-auto">
              {initials}
            </div>
            <h1 className="text-2xl font-bold text-center mt-5">{authUser?.name}</h1>
            <p className="text-center text-gray-500 text-sm">{authUser?.email}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">{authUser?.skills?.length ?? 0}</p>
                <p className="text-sm">Compétences</p>
              </div>
              <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">{authUser?.availabilities?.length ?? 0}</p>
                <p className="text-sm">Dispos</p>
              </div>
            </div>

            <button onClick={() => setEditMode(true)} className="w-full bg-black text-white py-4 rounded-xl mt-6 hover:bg-[#DFB626] hover:text-black transition">
              Modifier le profil
            </button>
            <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/login"); }} className="w-full border border-black py-4 rounded-xl mt-3 hover:bg-black hover:text-white transition">
              Déconnexion
            </button>
          </aside>

          <section className="space-y-8">
            <div className="border border-gray-200 rounded-3xl p-8">
              <p className="text-[#DFB626] font-bold mb-2">Mon profil</p>

              {editMode ? (
                <form onSubmit={handleSave} className="space-y-4 mt-2">
                  <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required placeholder="Nom complet" className="w-full border rounded-xl px-4 py-3" />
                  <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} placeholder="Courte description (bio)" rows={3} className="w-full border rounded-xl px-4 py-3 resize-none" />
                  <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="bg-black text-white px-6 py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60">
                      {saving ? "Sauvegarde…" : "Enregistrer"}
                    </button>
                    <button type="button" onClick={() => setEditMode(false)} className="border border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition">
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-4xl font-serif font-bold">{authUser?.name}</h2>
                  <p className="text-gray-600 mt-2">{authUser?.email}</p>
                  {authUser?.bio && <p className="text-gray-700 mt-4 leading-relaxed">{authUser.bio}</p>}
                </>
              )}
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <h3 className="font-bold text-xl mb-4">Mes compétences</h3>
              {(authUser?.skills?.length ?? 0) > 0 ? (
                <div className="space-y-3">
                  {authUser!.skills!.map((s) => (
                    <div key={s.id} className="flex justify-between items-center bg-[#F5F5F5] rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span>{s.skill?.name ?? s.name}</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${s.type === "teach" ? "bg-[#DFB626] text-black" : "bg-black text-white"}`}>
                          {s.type === "teach" ? "J&apos;enseigne" : "J&apos;apprends"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{s.level}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-6">Aucune compétence ajoutée pour l&apos;instant.</p>
              )}
              <button className="mt-5 w-full border-2 border-dashed border-gray-200 text-gray-600 py-4 rounded-xl hover:border-[#DFB626] hover:text-black transition">
                + Ajouter une compétence
              </button>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <h3 className="font-bold text-xl mb-4">Mes disponibilités</h3>
              {(authUser?.availabilities?.length ?? 0) > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {authUser!.availabilities!.map((a) => (
                    <span key={a.id} className="bg-[#DFB626] text-black px-4 py-2 rounded-full text-sm">
                      {a.day} {a.startTime}–{a.endTime}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-6">Aucune disponibilité renseignée.</p>
              )}
              <button className="mt-5 w-full border-2 border-dashed border-gray-200 text-gray-600 py-4 rounded-xl hover:border-[#DFB626] hover:text-black transition">
                + Ajouter une disponibilité
              </button>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}