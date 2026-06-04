"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ApiSession = {
  id: string;
  title: string;
  type: "WORKSHOP" | "QUICK_COURSE" | "CLUB";
  status: "PLANNED" | "ONGOING" | "DONE" | "CANCELLED";
  scheduledAt: string;
  skill: { name: string; category: string | null };
  participants: { userId: string }[];
};

type ApiSkill = { id: string; name: string; category: string | null };

const TYPE_LABELS: Record<string, string> = {
  WORKSHOP: "Atelier",
  QUICK_COURSE: "Cours collectif",
  CLUB: "Club",
};

const TYPE_ICON: Record<string, string> = {
  WORKSHOP: "🛠️",
  QUICK_COURSE: "🎥",
  CLUB: "🎙️",
};

const STATUS_LABELS: Record<string, string> = {
  ONGOING: "En direct",
  PLANNED: "Planifié",
  DONE: "Terminé",
  CANCELLED: "Annulé",
};

const TYPE_FILTERS = ["Tous", "Atelier", "Cours collectif", "Club"];

const STATUS_FILTERS: { label: string; statuses: string[] }[] = [
  { label: "Actives", statuses: ["PLANNED", "ONGOING"] },
  { label: "Terminées", statuses: ["DONE"] },
  { label: "Annulées", statuses: ["CANCELLED"] },
  { label: "Toutes", statuses: ["PLANNED", "ONGOING", "DONE", "CANCELLED"] },
];

const MAX_PARTICIPANTS: Record<string, number> = {
  WORKSHOP: 10,
  QUICK_COURSE: 12,
  CLUB: 20,
};

const TYPE_OPTIONS = [
  { value: "WORKSHOP", label: "🛠️ Atelier" },
  { value: "QUICK_COURSE", label: "🎥 Cours collectif" },
  { value: "CLUB", label: "🎙️ Club" },
];

function getStatusStyle(status: string) {
  if (status === "ONGOING") return "bg-red-500/20 border-red-400/40 text-red-300";
  if (status === "PLANNED") return "bg-green-500/20 border-green-400/40 text-green-300";
  if (status === "DONE")    return "bg-white/10 border-white/20 text-white/50";
  return "bg-white/10 border-white/20 text-white/40";
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

const inputCls =
  "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#a594ff]/60 focus:bg-white/15 transition";

export default function SessionsPage() {
  const [sessions, setSessions]           = useState<ApiSession[]>([]);
  const [loading, setLoading]             = useState(true);
  const [activeFilter, setActiveFilter]   = useState("Tous");
  const [activeStatus, setActiveStatus]   = useState("Actives");

  const [showForm, setShowForm]           = useState(false);
  const [skills, setSkills]               = useState<ApiSkill[]>([]);
  const [customMode, setCustomMode]       = useState(false);
  const [form, setForm]                   = useState({
    title: "",
    type: "WORKSHOP",
    skillId: "",
    customSkill: "",
    scheduledAt: "",
  });
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState("");
  const [reserved, setReserved]           = useState<Set<string>>(new Set());
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const justClickedSession = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/v1/sessions")
      .then((r) => r.json())
      .then((data) => setSessions(Array.isArray(data) ? data : []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!showForm || skills.length > 0) return;
    fetch("/api/v1/skills")
      .then((r) => r.json())
      .then((data) => setSkills(Array.isArray(data) ? data : []));
  }, [showForm, skills.length]);

  const filteredSessions = useMemo(() => {
    const allowedStatuses = STATUS_FILTERS.find((f) => f.label === activeStatus)?.statuses ?? ["PLANNED", "ONGOING"];
    let result = sessions.filter((s) => allowedStatuses.includes(s.status));
    if (activeFilter !== "Tous") {
      const typeKey = Object.entries(TYPE_LABELS).find(([, label]) => label === activeFilter)?.[0];
      result = result.filter((s) => s.type === typeKey);
    }
    return result;
  }, [sessions, activeFilter, activeStatus]);

  async function handleCreate(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Tu dois être connecté pour créer une session.");
      setSubmitting(false);
      return;
    }

    try {
      const body = customMode
        ? { title: form.title, type: form.type, scheduledAt: form.scheduledAt, customSkill: form.customSkill }
        : { title: form.title, type: form.type, scheduledAt: form.scheduledAt, skillId: form.skillId };

      const res = await fetch("/api/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message ?? "Une erreur est survenue.");
        return;
      }

      const newSession = await res.json();
      setSessions((prev) => [newSession, ...prev]);
      setSuccess("Session créée avec succès !");
      setForm({ title: "", type: "WORKSHOP", skillId: "", customSkill: "", scheduledAt: "" });
      setCustomMode(false);
      setTimeout(() => { setShowForm(false); setSuccess(""); }, 1500);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Sessions &amp; cours live
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Rejoins un cours collectif
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Participe à des cours en groupe avec un formateur et plusieurs
              étudiants, en format vidéo ou vocal.
            </p>
            {!showForm && (
              <button
                onClick={() => { setShowForm(true); setError(""); setSuccess(""); }}
                className="mt-5 backdrop-blur-xs bg-white/15 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/25 transition"
              >
                + Créer une session
              </button>
            )}
          </div>

          {/* Formulaire inline */}
          {showForm && (
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 w-fit">
              <form onSubmit={handleCreate}>
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-2xl font-black text-[#a594ff]">Nouvelle session</h2>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setError(""); setSuccess(""); }}
                    className="text-white/40 hover:text-white transition text-2xl leading-none mt-0.5 ml-4"
                  >
                    ×
                  </button>
                </div>
                <p className="text-white/50 text-sm mt-2 mb-6">
                  Remplis les informations pour créer ton cours collectif
                </p>

                <div className="flex flex-col gap-4 max-w-sm">
                    {/* Titre */}
                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-1.5">
                        Titre de la session
                      </label>
                      <input
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Ex : Atelier React pour débutants"
                        className={inputCls}
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-1.5">
                        Type de session
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {TYPE_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, type: opt.value })}
                            className={`py-2 px-1 rounded-xl border text-xs font-semibold transition text-center ${
                              form.type === opt.value
                                ? "bg-[#4D3AFF]/60 border-[#a594ff]/70 text-white"
                                : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compétence */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-white/70 text-xs font-medium">Compétence</label>
                        <button
                          type="button"
                          onClick={() => { setCustomMode((v) => !v); setForm({ ...form, skillId: "", customSkill: "" }); }}
                          className="text-[#a594ff] text-xs hover:underline transition"
                        >
                          {customMode ? "← Liste" : "Autre →"}
                        </button>
                      </div>
                      {customMode ? (
                        <input
                          required
                          value={form.customSkill}
                          onChange={(e) => setForm({ ...form, customSkill: e.target.value })}
                          placeholder="Ex : Blockchain, Premiere Pro…"
                          className={inputCls}
                        />
                      ) : (
                        <select
                          required
                          value={form.skillId}
                          onChange={(e) => setForm({ ...form, skillId: e.target.value })}
                          className={inputCls + " cursor-pointer"}
                        >
                          <option value="" disabled className="bg-[#1a1040] text-white/60">
                            Choisir…
                          </option>
                          {skills.map((s) => (
                            <option key={s.id} value={s.id} className="bg-[#1a1040] text-white">
                              {s.name}{s.category ? ` · ${s.category}` : ""}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-1.5">
                        Date et heure
                      </label>
                      <input
                        required
                        type="datetime-local"
                        value={form.scheduledAt}
                        onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                        className={inputCls + " cursor-pointer scheme-dark"}
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}
                    {success && (
                      <p className="text-green-400 text-sm bg-green-500/10 border border-green-400/20 rounded-xl px-4 py-3">
                        {success}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="backdrop-blur-xs bg-[#4D3AFF]/60 border border-[#a594ff]/50 text-white font-bold px-8 py-2.5 rounded-xl hover:bg-[#4D3AFF]/80 transition disabled:opacity-50 disabled:cursor-not-allowed self-start"
                    >
                      {submitting ? "Création…" : "Créer la session"}
                    </button>
                  </div>
              </form>
            </div>
          )}

          {/* Filtres */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-5 mb-8 space-y-4">
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Statut</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((sf) => (
                  <button
                    key={sf.label}
                    onClick={() => setActiveStatus(sf.label)}
                    className={`backdrop-blur-xs border px-5 py-2 rounded-full font-medium transition ${
                      activeStatus === sf.label
                        ? "bg-[#4D3AFF]/60 border-[#a594ff]/70 text-white"
                        : "bg-white/10 border-white/20 text-white hover:bg-[#4D3AFF]/40 hover:border-[#a594ff]/50"
                    }`}
                  >
                    {sf.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Type</p>
              <div className="flex flex-wrap gap-2">
                {TYPE_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`backdrop-blur-xs border px-5 py-2 rounded-full font-medium transition ${
                      activeFilter === filter
                        ? "bg-[#4D3AFF]/60 border-[#a594ff]/70 text-white"
                        : "bg-white/10 border-white/20 text-white hover:bg-[#4D3AFF]/40 hover:border-[#a594ff]/50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cartes */}
          {loading ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 animate-pulse h-64"
                />
              ))}
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-xl font-bold text-[#a594ff]">Aucune session</p>
              <p className="text-white/60 mt-2">Aucune session disponible pour ce filtre.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {filteredSessions.map((session) => {
                const max = MAX_PARTICIPANTS[session.type] ?? 10;
                const count = session.participants.length;
                const placesLeft = max - count;

                return (
                  <article
                    key={session.id}
                    className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition flex flex-col"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="backdrop-blur-xs bg-white/10 border border-white/20 text-white/80 px-4 py-1 rounded-full text-sm font-semibold">
                        {TYPE_ICON[session.type]} {TYPE_LABELS[session.type]}
                      </span>
                      <span
                        className={`border px-3 py-1 rounded-full text-sm font-medium shrink-0 ${getStatusStyle(session.status)}`}
                      >
                        {STATUS_LABELS[session.status]}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mt-5 text-white">{session.title}</h2>
                    <p className="text-[#a594ff] text-sm mt-1 font-medium">
                      {session.skill.name}
                      {session.skill.category && (
                        <span className="text-white/40 font-normal"> · {session.skill.category}</span>
                      )}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-white/70">
                      <p>📅 {formatDate(session.scheduledAt)}</p>
                      <p>👥 {count}/{max} participants</p>
                    </div>

                    <div className="mt-5 bg-white/15 rounded-full h-2">
                      <div
                        className="bg-[#a594ff] h-2 rounded-full transition-all"
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
                        className={`mt-8 mx-auto block backdrop-blur-xs border text-sm font-semibold px-10 py-3 rounded-xl transition ${
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
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
