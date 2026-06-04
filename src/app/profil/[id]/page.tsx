"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const DAY_LABELS: Record<number, string> = {
  0: "Dimanche",
  1: "Lundi",
  2: "Mardi",
  3: "Mercredi",
  4: "Jeudi",
  5: "Vendredi",
  6: "Samedi",
};

const AVATAR_COLORS = [
  "bg-[#1800AD]",
  "bg-[#4D3AFF]",
  "bg-blue-600",
  "bg-purple-500",
  "bg-indigo-600",
  "bg-violet-600",
];

const BADGE_EMOJIS: Record<string, string> = {
  "Premier pas": "👣",
  "Mentor": "🎓",
  "Curieux": "🔍",
  "Expert": "🏆",
  "Sociable": "💬",
  "Étoile montante": "⭐",
  "Assidu": "📅",
  "Polyglotte": "🌍",
};

type UserSkill = {
  level: string;
  skill: { name: string; category: string | null };
};

type Availability = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

type Badge = {
  badge: { name: string; description: string | null; iconUrl: string | null };
};

type Feedback = {
  rating: number;
  comment: string | null;
  giver: { name: string };
};

const STATIC_FEEDBACKS: Feedback[] = [
  { rating: 5, comment: "Excellent enseignant, très patient et pédagogue. Je recommande vivement !", giver: { name: "Amara Diallo" } },
  { rating: 4, comment: "Session très enrichissante, j'ai beaucoup appris en peu de temps.", giver: { name: "Hugo Lefebvre" } },
  { rating: 5, comment: "Explications claires et exemples concrets. Super expérience !", giver: { name: "Sofia Perez" } },
];

type SessionItem = {
  session: {
    id: string;
    title: string;
    type: string;
    status: string;
    scheduledAt: string;
    skill: { name: string; category: string | null };
    participants: { userId: string }[];
  };
};

const SESSION_TYPE_LABELS: Record<string, string> = {
  WORKSHOP: "Atelier",
  QUICK_COURSE: "Cours collectif",
  CLUB: "Club",
};

const SESSION_TYPE_ICONS: Record<string, string> = {
  WORKSHOP: "🛠️",
  QUICK_COURSE: "🎥",
  CLUB: "🎙️",
};

const MAX_PARTICIPANTS: Record<string, number> = {
  WORKSHOP: 10,
  QUICK_COURSE: 12,
  CLUB: 20,
};

type UserProfile = {
  id: string;
  name: string;
  bio: string | null;
  skills: UserSkill[];
  availabilities: Availability[];
  badges: Badge[];
  feedbacksRecv: Feedback[];
  sessionsParts: SessionItem[];
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function avatarColor(name: string) {
  let hash = 0;
  for (const c of name) hash += c.charCodeAt(0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export default function UserProfilPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [matchPending, setMatchPending] = useState(false);
  const [matchHovered, setMatchHovered] = useState(false);
  const matchJustClicked = useRef(false);
  const [reserved, setReserved] = useState<Set<string>>(new Set());
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const justClickedSession = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetch(`/api/v1/users/${id}`)
      .then((res) => {
        if (res.status === 404) { setNotFound(true); return null; }
        return res.json();
      })
      .then((data) => { if (data) setUser(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-40 pb-16">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
                Profil étudiant
              </span>
              <h1 className="text-3xl md:text-4xl font-black mt-4 text-[#a594ff]">
                {loading ? "Chargement..." : user?.name ?? "Profil introuvable"}
              </h1>
              <p className="mt-3 text-white/70">
                Consulte les compétences et disponibilités de cet étudiant.
              </p>
            </div>

            <button
              onClick={() => router.back()}
              className="backdrop-blur-xs bg-white/25 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/35 transition self-start"
            >
              ← Retour
            </button>
          </div>

          {loading ? (
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-10 animate-pulse space-y-6">
              <div className="flex gap-5">
                <div className="w-24 h-24 rounded-full bg-white/20" />
                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-6 bg-white/20 rounded w-1/3" />
                  <div className="h-4 bg-white/10 rounded w-1/4" />
                </div>
              </div>
              <div className="h-4 bg-white/10 rounded w-2/3" />
              <div className="flex gap-3">
                <div className="h-8 bg-white/10 rounded-full w-24" />
                <div className="h-8 bg-white/10 rounded-full w-20" />
              </div>
            </div>
          ) : notFound || !user ? (
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
              <p className="text-4xl mb-4">😕</p>
              <p className="text-xl font-bold text-[#a594ff]">Profil introuvable</p>
              <p className="text-white/60 mt-2">Cet étudiant n&apos;existe pas ou a supprimé son compte.</p>
              <Link
                href="/matchs"
                className="mt-6 inline-block backdrop-blur-xs bg-white/15 border border-white/30 text-white px-6 py-2 rounded-xl hover:bg-white/25 transition"
              >
                Retour aux matchs
              </Link>
            </div>
          ) : (
            <section className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-lg">
              {/* Header profil */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-24 h-24 rounded-full ${avatarColor(user.name)} text-white flex items-center justify-center text-3xl font-bold border-2 border-white/30 shrink-0`}
                  >
                    {initials(user.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#a594ff]">
                      {user.name}
                    </h2>
                    <p className="text-white/60 text-sm mt-1">
                      {user.skills.length} compétence{user.skills.length !== 1 ? "s" : ""}
                    </p>
                    {user.bio && (
                      <p className="text-white/75 mt-3 max-w-xl">{user.bio}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="backdrop-blur-xs bg-black/20 border border-white/15 rounded-2xl p-4">
                    <p className="font-bold text-[#a594ff]">{user.feedbacksRecv.length || STATIC_FEEDBACKS.length}</p>
                    <p className="text-xs text-white/60">Avis</p>
                  </div>
                  <div className="backdrop-blur-xs bg-black/20 border border-white/15 rounded-2xl p-4">
                    <p className="font-bold text-[#a594ff]">{user.badges.length}</p>
                    <p className="text-xs text-white/60">Badges</p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              {user.badges.length > 0 && (
                <div className="mt-6 inline-flex flex-col gap-3 backdrop-blur-xs bg-white/5 border border-white/20 rounded-2xl px-5 py-4">
                  <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Badges</h3>
                  <div className="flex flex-wrap gap-5">
                    {user.badges.map((b, i) => (
                      <div key={i} className="relative group flex flex-col items-center gap-1">
                        <span className="text-3xl cursor-default">
                          {BADGE_EMOJIS[b.badge.name] ?? "🏅"}
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {b.badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compétences */}
              {user.skills.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-xl mb-3 text-[#a594ff]">Compétences</h3>
                  <div className="flex flex-wrap gap-3">
                    {user.skills.map((us) => (
                      <span
                        key={us.skill.name}
                        className="backdrop-blur-xs bg-white/15 border border-white/25 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2"
                      >
                        {us.skill.name}
                        <span className="text-xs text-white/50 border border-white/20 rounded-full px-2 py-0.5">
                          {us.level}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Disponibilités */}
              {user.availabilities.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-xl mb-3 text-[#a594ff]">Disponibilités</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.availabilities.map((slot, i) => (
                      <div
                        key={i}
                        className="rounded-2xl p-4 backdrop-blur-xs border border-green-400/50 bg-green-500/15"
                      >
                        <p className="font-bold text-[#a594ff]">{DAY_LABELS[slot.dayOfWeek]}</p>
                        <p className="text-white/80">{slot.startTime} – {slot.endTime}</p>
                        <p className="text-sm mt-2 text-green-400">Disponible</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sessions */}
              <div className="mt-8 max-w-sm">
                <h3 className="font-bold text-xl mb-3 text-[#a594ff]">Sessions</h3>

                {user.sessionsParts.length === 0 ? (
                  <p className="text-white/40 text-sm">Aucune session planifiée pour l&apos;instant.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {user.sessionsParts.map(({ session }, i) => {
                      const max = MAX_PARTICIPANTS[session.type] ?? 10;
                      const count = session.participants.length;
                      const placesLeft = max - count;
                      const statusStyle =
                        session.status === "ONGOING"
                          ? "bg-red-500/20 border-red-400/40 text-red-300"
                          : "bg-green-500/20 border-green-400/40 text-green-300";
                      const statusLabel =
                        session.status === "ONGOING" ? "En direct" : "Planifié";
                      return (
                        <div
                          key={i}
                          className="backdrop-blur-xs bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col"
                        >
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="backdrop-blur-xs bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full text-xs font-semibold">
                              {SESSION_TYPE_ICONS[session.type]} {SESSION_TYPE_LABELS[session.type] ?? session.type}
                            </span>
                            <span className={`border px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
                              {statusLabel}
                            </span>
                          </div>
                          <p className="font-semibold text-white">{session.title}</p>
                          <p className="text-sm text-[#a594ff] font-medium mt-0.5">
                            {session.skill.name}
                            {session.skill.category && (
                              <span className="text-white/40 font-normal"> · {session.skill.category}</span>
                            )}
                          </p>
                          <div className="mt-3 space-y-1 text-xs text-white/60">
                            <p>📅 {new Date(session.scheduledAt).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</p>
                            <p>👥 {count}/{max} participants</p>
                          </div>
                          <div className="mt-3 bg-white/15 rounded-full h-1.5">
                            <div
                              className="bg-[#a594ff] h-1.5 rounded-full transition-all"
                              style={{ width: `${Math.min((count / max) * 100, 100)}%` }}
                            />
                          </div>
                          <p className="text-white/40 text-xs mt-1 text-right">
                            {placesLeft > 0
                              ? `${placesLeft} place${placesLeft > 1 ? "s" : ""} restante${placesLeft > 1 ? "s" : ""}`
                              : "Complet"}
                          </p>
                          {session.status !== "DONE" && session.status !== "CANCELLED" && (
                            <button
                              onClick={() => {
                                if (session.status !== "ONGOING") {
                                  if (!reserved.has(session.id)) {
                                    setHoveredSession(null);
                                    justClickedSession.current.add(session.id);
                                  }
                                  setReserved((prev) => {
                                    const next = new Set(prev);
                                    if (next.has(session.id)) next.delete(session.id);
                                    else next.add(session.id);
                                    return next;
                                  });
                                }
                              }}
                              onMouseEnter={() => {
                                if (!justClickedSession.current.has(session.id)) setHoveredSession(session.id);
                              }}
                              onMouseLeave={() => {
                                setHoveredSession(null);
                                justClickedSession.current.delete(session.id);
                              }}
                              className={`mt-4 mx-auto block backdrop-blur-xs border text-sm font-semibold px-10 py-3 rounded-xl transition ${
                                reserved.has(session.id)
                                  ? hoveredSession === session.id
                                    ? "bg-orange-500/50 border-orange-400/50 text-white"
                                    : "bg-green-500/20 border-green-400/40 text-green-300"
                                  : "bg-[#4D3AFF]/50 border-[#a594ff]/40 text-white hover:bg-[#4D3AFF]/70"
                              }`}
                            >
                              {session.status === "ONGOING"
                                ? "Rejoindre l'appel"
                                : reserved.has(session.id)
                                ? hoveredSession === session.id ? "Annuler" : "Session réservée ✓"
                                : "Réserver une place"}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Avis / Feedbacks */}
              <div className="mt-8 max-w-[50%]">
                <h3 className="font-bold text-xl mb-3 text-[#a594ff]">Avis reçus</h3>
                {(() => {
                  const feedbacks = user.feedbacksRecv.length > 0 ? user.feedbacksRecv : STATIC_FEEDBACKS;
                  return (
                    <div className="space-y-3">
                      {user.feedbacksRecv.length === 0 && (
                        <p className="text-white/30 text-xs mb-3 italic">Aperçu — aucun avis réel pour l&apos;instant</p>
                      )}
                      {feedbacks.map((fb, i) => (
                        <div
                          key={i}
                          className="backdrop-blur-xs bg-white/5 border border-white/15 rounded-2xl p-4"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-white/80">{fb.giver.name}</p>
                            <p className="text-[#a594ff] text-sm">{stars(fb.rating)}</p>
                          </div>
                          {fb.comment && <p className="text-white/60 text-sm">{fb.comment}</p>}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  onClick={() => {
                    if (!matchPending) {
                      matchJustClicked.current = true;
                      setMatchHovered(false);
                    }
                    setMatchPending((v) => !v);
                  }}
                  onMouseEnter={() => {
                    if (!matchJustClicked.current) setMatchHovered(true);
                  }}
                  onMouseLeave={() => {
                    setMatchHovered(false);
                    matchJustClicked.current = false;
                  }}
                  className={`backdrop-blur-xs font-semibold px-6 py-3 rounded-xl transition ${
                    matchPending
                      ? matchHovered
                        ? "bg-orange-500/50 border border-orange-400/50 text-white"
                        : "bg-white/10 border border-white/15 text-white/40"
                      : "bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white hover:bg-[#4D3AFF]/70"
                  }`}
                >
                  {matchPending
                    ? matchHovered ? "Annuler" : "En attente"
                    : "Matcher"}
                </button>
                <Link
                  href="/matchs"
                  className="backdrop-blur-xs bg-black/20 border border-white/25 text-white/80 text-center px-6 py-3 rounded-xl font-semibold hover:bg-black/30 hover:text-white transition"
                >
                  Retour aux matchs
                </Link>
              </div>
            </section>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
