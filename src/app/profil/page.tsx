"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Availability = { day: string; hour: string; available: boolean };
type Badge        = { name: string; description: string; emoji: string };
type MatchItem    = { id: string; partner: string; skill: string; status: "ACCEPTED" | "PENDING" };
type SessionItem  = {
  id: string;
  title: string;
  type: "WORKSHOP" | "QUICK_COURSE" | "CLUB";
  status: "PLANNED" | "ONGOING" | "DONE" | "CANCELLED";
  skill: string;
  date: string;
};
type CommentItem  = { id: string; text: string; createdAt: string };

type Profile = {
  slug: string;
  initials: string;
  name: string;
  role: string;
  score: number;
  rating: number;
  sessions: number;
  xp: number;
  color: string;
  presence: string;
  lastSeen: string;
  skills: { name: string; level: string }[];
  bio: string;
  availability: Availability[];
  badges: Badge[];
  matches: MatchItem[];
  mySessions: SessionItem[];
  comments: CommentItem[];
};

// ─── Constantes ───────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  WORKSHOP:    "Atelier",
  QUICK_COURSE:"Cours collectif",
  CLUB:        "Club",
};

const TYPE_ICON: Record<string, string> = {
  WORKSHOP:    "🛠️",
  QUICK_COURSE:"🎥",
  CLUB:        "🎙️",
};

const MATCH_STATUS_LABEL: Record<string, string> = {
  ACCEPTED: "Accepté",
  PENDING:  "En attente",
};

const TABS = ["Profil", "Matchs", "Sessions", "Commentaires"];

// ─── Données statiques (issues du seed) ───────────────────────────────────────

const initialProfiles: Profile[] = [
  {
    slug: "tom",
    initials: "TC",
    name: "Tom Couture",
    role: "Développement Web",
    score: 96,
    rating: 5,
    sessions: 23,
    xp: 680,
    color: "bg-[#1800AD]",
    presence: "online",
    lastSeen: "En ligne maintenant",
    skills: [
      { name: "React.js", level: "EXPERT" },
      { name: "Node.js",  level: "ADVANCED" },
      { name: "Next.js",  level: "INTERMEDIATE" },
    ],
    bio: "Passionné de front-end, j'aide les étudiants à progresser sur React, Next.js et Node.js.",
    badges: [
      { name: "Premier pas",    description: "A partagé sa première compétence",   emoji: "👣" },
      { name: "Mentor",         description: "A aidé 5 étudiants ou plus",          emoji: "🎓" },
      { name: "Curieux",        description: "A appris 3 compétences différentes",  emoji: "🔍" },
      { name: "Expert",         description: "Niveau EXPERT dans une compétence",   emoji: "🏆" },
      { name: "Sociable",       description: "A posté 10 fois sur le feed",         emoji: "💬" },
    ],
    availability: [
      { day: "Lundi",    hour: "14h - 15h", available: true  },
      { day: "Mercredi", hour: "18h - 19h", available: true  },
      { day: "Vendredi", hour: "10h - 11h", available: false },
    ],
    matches: [
      { id: "m1", partner: "Hugo Lefebvre",  skill: "React",    status: "ACCEPTED" },
      { id: "m2", partner: "Priya Sharma",   skill: "Machine Learning", status: "ACCEPTED" },
      { id: "m3", partner: "Fatou Ndiaye",   skill: "Figma",    status: "PENDING"  },
    ],
    mySessions: [
      {
        id: "s1",
        title: "Atelier React pour débutants",
        type: "WORKSHOP",
        status: "DONE",
        skill: "React",
        date: "2026-05-10T10:00:00Z",
      },
      {
        id: "s6",
        title: "Club Machine Learning avancé",
        type: "CLUB",
        status: "PLANNED",
        skill: "Machine Learning",
        date: "2026-06-18T18:00:00Z",
      },
      {
        id: "s4",
        title: "Atelier Marketing Digital",
        type: "WORKSHOP",
        status: "ONGOING",
        skill: "Marketing digital",
        date: "2026-06-04T10:00:00Z",
      },
    ],
    comments: [
      {
        id: "c1",
        text: "Je donne un atelier React ce samedi ! Rejoignez-moi si vous voulez débuter. 🚀",
        createdAt: "2026-05-08T10:00:00Z",
      },
      {
        id: "c2",
        text: "React + Node.js = stack parfaite pour débuter en fullstack. N'hésitez pas à me contacter !",
        createdAt: "2026-05-25T16:00:00Z",
      },
    ],
  },
  {
    slug: "sarah",
    initials: "SA",
    name: "Sarah Benali",
    role: "Marketing digital",
    score: 89,
    rating: 4,
    sessions: 11,
    xp: 420,
    color: "bg-[#4D3AFF]",
    presence: "away",
    lastSeen: "Vue il y a 12 min",
    skills: [
      { name: "SEO",       level: "ADVANCED"     },
      { name: "Canva",     level: "EXPERT"        },
      { name: "Marketing", level: "INTERMEDIATE"  },
    ],
    bio: "Spécialisée en marketing digital, SEO et création de contenus visuels.",
    badges: [
      { name: "Mentor",      description: "A aidé 5 étudiants ou plus",        emoji: "🎓" },
      { name: "Premier pas", description: "A partagé sa première compétence",  emoji: "👣" },
    ],
    availability: [
      { day: "Mardi",  hour: "12h - 13h", available: true  },
      { day: "Jeudi",  hour: "16h - 17h", available: false },
    ],
    matches: [
      { id: "m4", partner: "Noé Lambert",   skill: "Marketing digital", status: "ACCEPTED" },
      { id: "m5", partner: "Manon Girard",  skill: "Marketing digital", status: "PENDING"  },
    ],
    mySessions: [
      {
        id: "s4",
        title: "Atelier Marketing Digital",
        type: "WORKSHOP",
        status: "ONGOING",
        skill: "Marketing digital",
        date: "2026-06-04T10:00:00Z",
      },
      {
        id: "s7",
        title: "Session Anglais — conversation",
        type: "WORKSHOP",
        status: "ONGOING",
        skill: "Anglais",
        date: "2026-06-04T15:00:00Z",
      },
    ],
    comments: [
      {
        id: "c3",
        text: "Le marketing digital c'est pas sorcier. Je peux vous montrer comment créer votre première campagne.",
        createdAt: "2026-05-20T11:00:00Z",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function presenceColor(presence: string) {
  if (presence === "online") return "bg-green-500";
  if (presence === "away")   return "bg-yellow-400";
  return "bg-gray-400";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusStyle(status: string) {
  if (status === "ONGOING")   return "bg-red-500/20 border-red-400/40 text-red-300";
  if (status === "PLANNED")   return "bg-green-500/20 border-green-400/40 text-green-300";
  if (status === "DONE")      return "bg-white/10 border-white/20 text-white/50";
  return "bg-white/10 border-white/20 text-white/40";
}

function getMatchStyle(status: string) {
  if (status === "ACCEPTED") return "bg-green-500/20 border-green-400/40 text-green-300";
  return "bg-yellow-500/20 border-yellow-400/40 text-yellow-300";
}

// ─── Composant principal ──────────────────────────────────────────────────────

function ProfilContent() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("user") || "tom";

  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [activeTab, setActiveTab] = useState("Profil");

  // Profil fields
  const [editBio, setEditBio]           = useState(false);
  const [editIdentity, setEditIdentity] = useState(false);
  const [newSkill, setNewSkill]         = useState({ name: "", level: "BEGINNER" });
  const [newAvailability, setNewAvailability] = useState({ day: "", hour: "", available: true });

  // Sessions filter
  const [sessionFilter, setSessionFilter] = useState<"Tous" | "Planifié" | "En direct">("Tous");

  // Comments
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText]   = useState("");

  const profile = profiles.find((p) => p.slug === selected) || profiles[0];

  function updateProfile(field: keyof Profile, value: string) {
    setProfiles((cur) =>
      cur.map((p) => (p.slug === profile.slug ? { ...p, [field]: value } : p))
    );
  }

  function addSkill() {
    if (!newSkill.name.trim()) return;
    setProfiles((cur) =>
      cur.map((p) =>
        p.slug === profile.slug
          ? { ...p, skills: [...p.skills, { name: newSkill.name.trim(), level: newSkill.level }] }
          : p
      )
    );
    setNewSkill({ name: "", level: "BEGINNER" });
  }

  function removeSkill(name: string) {
    setProfiles((cur) =>
      cur.map((p) =>
        p.slug === profile.slug
          ? { ...p, skills: p.skills.filter((s) => s.name !== name) }
          : p
      )
    );
  }

  function addAvailability() {
    if (!newAvailability.day.trim() || !newAvailability.hour.trim()) return;
    setProfiles((cur) =>
      cur.map((p) =>
        p.slug === profile.slug
          ? { ...p, availability: [...p.availability, newAvailability] }
          : p
      )
    );
    setNewAvailability({ day: "", hour: "", available: true });
  }

  function deleteComment(id: string) {
    setProfiles((cur) =>
      cur.map((p) =>
        p.slug === profile.slug
          ? { ...p, comments: p.comments.filter((c) => c.id !== id) }
          : p
      )
    );
  }

  function saveComment(id: string) {
    setProfiles((cur) =>
      cur.map((p) =>
        p.slug === profile.slug
          ? { ...p, comments: p.comments.map((c) => (c.id === id ? { ...c, text: editCommentText } : c)) }
          : p
      )
    );
    setEditingCommentId(null);
    setEditCommentText("");
  }

  const filteredSessions = profile.mySessions.filter((s) => {
    if (sessionFilter === "Planifié")  return s.status === "PLANNED";
    if (sessionFilter === "En direct") return s.status === "ONGOING";
    return true;
  });

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/students.jpg')", backgroundSize: "cover", backgroundPosition: "top" }} />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-40 pb-16">

          {/* Page header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <span className="inline-block backdrop-blur-[4px] bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
                Profils étudiants
              </span>
              <h1 className="text-3xl md:text-4xl font-black mt-4 text-[#a594ff]">
                Gérer les profils et compétences
              </h1>
              <p className="mt-3 text-white/70">
                Consulte, modifie ou ajoute un profil étudiant avec ses compétences et disponibilités.
              </p>
            </div>
          </div>

          {/* Avatar card */}
          <section className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full ${profile.color} text-white flex items-center justify-center text-3xl font-bold border-2 border-white/30`}>
                    {profile.initials}
                  </div>
                  <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${presenceColor(profile.presence)}`} />
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    {editIdentity ? (
                      <div className="space-y-2">
                        <input
                          value={profile.name}
                          onChange={(e) => updateProfile("name", e.target.value)}
                          className="bg-white/10 border border-white/30 rounded-xl px-4 py-2 outline-none focus:border-[#a594ff] text-white placeholder-white/50 w-full"
                        />
                        <input
                          value={profile.role}
                          onChange={(e) => updateProfile("role", e.target.value)}
                          className="bg-white/10 border border-white/30 rounded-xl px-4 py-2 outline-none focus:border-[#a594ff] text-white placeholder-white/50 w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#a594ff]">{profile.name}</h2>
                        <p className="text-white/80">{profile.role}</p>
                      </>
                    )}
                    <p className="text-sm text-white/50 mt-1">{profile.lastSeen}</p>
                    <p className="text-[#a594ff] mt-2">{stars(profile.rating)}</p>
                  </div>

                  <button
                    onClick={() => setEditIdentity(!editIdentity)}
                    className="text-xs text-white/50 border border-white/20 rounded-lg px-2 py-0.5 hover:text-white hover:border-white/40 transition shrink-0"
                  >
                    {editIdentity ? "Valider" : "Modifier"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="backdrop-blur-[4px] bg-white/20 border border-white/30 rounded-2xl p-4">
                  <p className="font-bold text-white">{profile.score}%</p>
                  <p className="text-xs text-white/60">Match</p>
                </div>
                <div className="backdrop-blur-[4px] bg-black/20 border border-white/15 rounded-2xl p-4">
                  <p className="font-bold text-[#a594ff]">{profile.sessions}</p>
                  <p className="text-xs text-white/60">Sessions</p>
                </div>
                <div className="backdrop-blur-[4px] bg-black/20 border border-white/15 rounded-2xl p-4">
                  <p className="font-bold text-[#a594ff]">{profile.xp}</p>
                  <p className="text-xs text-white/60">XP</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition border ${
                  activeTab === tab
                    ? "bg-[#4D3AFF]/60 border-[#a594ff]/60 text-white"
                    : "bg-white/10 border-white/20 text-white/60 hover:bg-white/15 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── TAB: Profil ── */}
          {activeTab === "Profil" && (
            <section className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-lg space-y-8">
              {/* Badges */}
              {profile.badges.length > 0 && (
                <div className="inline-flex flex-col gap-3 backdrop-blur-[4px] bg-white/5 border border-white/20 rounded-2xl px-5 py-4">
                  <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Badges</h3>
                  <div className="flex flex-wrap gap-5">
                    {profile.badges.map((badge) => (
                      <div key={badge.name} className="relative group flex flex-col items-center gap-1">
                        <span className="text-3xl cursor-default">{badge.emoji}</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-xl text-[#a594ff]">Bio</h3>
                  {!editBio ? (
                    <button onClick={() => setEditBio(true)} className="text-xs text-white/50 border border-white/20 rounded-lg px-2 py-0.5 hover:text-white hover:border-white/40 transition">
                      Modifier
                    </button>
                  ) : (
                    <button onClick={() => setEditBio(false)} className="text-xs text-[#a594ff] border border-[#a594ff]/40 rounded-lg px-2 py-0.5 hover:bg-[#a594ff]/10 transition">
                      Valider
                    </button>
                  )}
                </div>
                {editBio ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => updateProfile("bio", e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#a594ff] text-white placeholder-white/50 transition"
                  />
                ) : (
                  <p className="text-white/80">{profile.bio}</p>
                )}
              </div>

              {/* Compétences */}
              <div>
                <h3 className="font-bold text-xl mb-3 text-[#a594ff]">Compétences</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <span key={skill.name} className="backdrop-blur-[4px] bg-white/15 border border-white/25 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                      {skill.name}
                      <span className="text-xs text-white/50 border border-white/20 rounded-full px-2 py-0.5">{skill.level}</span>
                      <button onClick={() => removeSkill(skill.name)} className="text-white/40 hover:text-red-400 font-bold transition">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <input
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Nouvelle compétence..."
                    className="bg-white/10 border border-white/30 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#a594ff] text-white placeholder-white/40 w-44"
                  />
                  <select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    className="bg-white/10 border border-white/30 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#a594ff] text-white"
                  >
                    <option value="BEGINNER"     className="text-black">Débutant</option>
                    <option value="INTERMEDIATE" className="text-black">Intermédiaire</option>
                    <option value="ADVANCED"     className="text-black">Avancé</option>
                    <option value="EXPERT"       className="text-black">Expert</option>
                  </select>
                  <button onClick={addSkill} className="bg-white/15 border border-white/30 text-white text-sm px-4 py-1.5 rounded-lg font-semibold hover:bg-white/25 transition">
                    + Ajouter
                  </button>
                </div>
              </div>

              {/* Disponibilités */}
              <div>
                <h3 className="font-bold text-xl mb-3 text-[#a594ff]">Disponibilités</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.availability.map((slot) => (
                    <div
                      key={`${slot.day}-${slot.hour}`}
                      className={`relative rounded-2xl p-4 backdrop-blur-[4px] border ${slot.available ? "border-green-400/50 bg-green-500/15" : "border-white/15 bg-white/5"}`}
                    >
                      <button
                        onClick={() =>
                          setProfiles((cur) =>
                            cur.map((p) =>
                              p.slug === profile.slug
                                ? { ...p, availability: p.availability.filter((s) => s.day !== slot.day || s.hour !== slot.hour) }
                                : p
                            )
                          )
                        }
                        className="absolute top-2 right-3 text-white/30 hover:text-red-400 font-bold text-lg transition"
                      >
                        ×
                      </button>
                      <p className="font-bold text-[#a594ff]">{slot.day}</p>
                      <p className="text-white/80">{slot.hour}</p>
                      <p className={`text-sm mt-2 ${slot.available ? "text-green-400" : "text-white/40"}`}>
                        {slot.available ? "Disponible" : "Occupé"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <input
                    value={newAvailability.day}
                    onChange={(e) => setNewAvailability({ ...newAvailability, day: e.target.value })}
                    placeholder="Jour"
                    className="w-24 bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#a594ff] text-white placeholder-white/50"
                  />
                  <input
                    value={newAvailability.hour}
                    onChange={(e) => setNewAvailability({ ...newAvailability, hour: e.target.value })}
                    placeholder="Horaire"
                    className="w-28 bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#a594ff] text-white placeholder-white/50"
                  />
                  <select
                    value={newAvailability.available ? "true" : "false"}
                    onChange={(e) => setNewAvailability({ ...newAvailability, available: e.target.value === "true" })}
                    className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#a594ff] text-white"
                  >
                    <option value="true"  className="text-black">Disponible</option>
                    <option value="false" className="text-black">Occupé</option>
                  </select>
                  <button onClick={addAvailability} className="bg-white/15 border border-white/30 text-white text-sm px-5 py-2 rounded-lg font-semibold hover:bg-white/25 transition">
                    Ajouter
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── TAB: Matchs ── */}
          {activeTab === "Matchs" && (
            <section className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-[#a594ff]">Mes matchs</h3>
                <Link
                  href="/matchs"
                  className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white font-semibold px-5 py-2 rounded-xl hover:bg-[#4D3AFF]/70 transition text-sm"
                >
                  🤝 Créer des matchs
                </Link>
              </div>

              {profile.matches.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-5xl mb-4">🤝</p>
                  <p className="text-white/60 text-lg font-semibold mb-2">Aucun match pour le moment</p>
                  <Link href="/matchs" className="mt-4 backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4D3AFF]/70 transition">
                    Explorer les profils
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.matches.map((m) => (
                    <div key={m.id} className="backdrop-blur-xs bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="font-bold text-white">{m.partner}</p>
                        <p className="text-white/50 text-sm mt-0.5">Compétence échangée · <span className="text-[#a594ff]">{m.skill}</span></p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-center ${getMatchStyle(m.status)}`}>
                        {MATCH_STATUS_LABEL[m.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── TAB: Sessions ── */}
          {activeTab === "Sessions" && (
            <section className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="font-bold text-xl text-[#a594ff]">Mes sessions</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/sessions"
                    className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white font-semibold px-5 py-2 rounded-xl hover:bg-[#4D3AFF]/70 transition text-sm"
                  >
                    🎓 Rejoindre une session
                  </Link>
                  {(["Tous", "Planifié", "En direct"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setSessionFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                        sessionFilter === f
                          ? f === "En direct"
                            ? "bg-red-500/30 border-red-400/50 text-red-300"
                            : f === "Planifié"
                            ? "bg-green-500/30 border-green-400/50 text-green-300"
                            : "bg-[#4D3AFF]/50 border-[#a594ff]/50 text-white"
                          : "bg-white/10 border-white/20 text-white/60 hover:bg-white/15"
                      }`}
                    >
                      {f === "En direct" && "🔴 "}
                      {f === "Planifié"  && "🗓️ "}
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-5xl mb-4">🎓</p>
                  <p className="text-white/60 text-lg font-semibold">
                    {sessionFilter === "Tous" ? "Aucune session" : `Aucune session « ${sessionFilter} »`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSessions.map((s) => (
                    <div key={s.id} className="backdrop-blur-xs bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl mt-0.5">{TYPE_ICON[s.type]}</span>
                        <div>
                          <p className="font-bold text-white">{s.title}</p>
                          <p className="text-white/50 text-sm mt-0.5">{TYPE_LABELS[s.type]} · {s.skill}</p>
                          <p className="text-white/40 text-xs mt-1">{formatDate(s.date)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-center ${getStatusStyle(s.status)}`}>
                        {s.status === "ONGOING" ? "🔴 En direct" : s.status === "PLANNED" ? "🗓️ Planifié" : s.status === "DONE" ? "Terminé" : "Annulé"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── TAB: Commentaires ── */}
          {activeTab === "Commentaires" && (
            <section className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-[#a594ff]">Mes commentaires</h3>
                <Link
                  href="/feed"
                  className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white font-semibold px-5 py-2 rounded-xl hover:bg-[#4D3AFF]/70 transition text-sm"
                >
                  ✏️ Créer un commentaire
                </Link>
              </div>

              {profile.comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-5xl mb-4">💬</p>
                  <p className="text-white/60 text-lg font-semibold mb-2">Aucun commentaire</p>
                  <Link href="/feed" className="mt-4 backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4D3AFF]/70 transition">
                    Aller sur le feed
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.comments.map((c) => (
                    <div key={c.id} className="backdrop-blur-xs bg-white/5 border border-white/15 rounded-2xl p-5">
                      {editingCommentId === c.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            rows={3}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#a594ff]/60 resize-none"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => saveComment(c.id)} className="px-4 py-2 bg-[#4D3AFF]/50 border border-[#a594ff]/50 text-white text-sm rounded-xl hover:bg-[#4D3AFF]/70 transition font-semibold">
                              Enregistrer
                            </button>
                            <button onClick={() => { setEditingCommentId(null); setEditCommentText(""); }} className="px-4 py-2 bg-white/10 border border-white/20 text-white/60 text-sm rounded-xl hover:bg-white/15 transition">
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-white/80">{c.text}</p>
                            <p className="text-white/40 text-xs mt-2">
                              {new Date(c.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => { setEditingCommentId(c.id); setEditCommentText(c.text); }}
                              className="px-3 py-1.5 bg-white/10 border border-white/20 text-white/70 text-xs rounded-lg hover:bg-white/20 transition"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteComment(c.id)}
                              className="px-3 py-1.5 bg-red-500/20 border border-red-400/30 text-red-300 text-xs rounded-lg hover:bg-red-500/30 transition"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

        </section>

        <Footer />
      </div>
    </main>
  );
}

export default function ProfilPage() {
  return (
    <Suspense>
      <ProfilContent />
    </Suspense>
  );
}
