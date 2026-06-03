"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  bio?: string;
  skills?: {
    id: string;
    name?: string;
    skill?: { name: string };
    type: string;
    level: string;
  }[];
  availabilities?: {
    id: string;
    day?: string;
    dayOfWeek?: number;
    startTime: string;
    endTime: string;
  }[];
};

type PublicUser = {
  id: string;
  name: string;
  skills: {
    id: string;
    skill: { name: string };
    type: string;
    level: string;
  }[];
  availabilities: {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  badges: { id: string; badge: { name: string } }[];
  feedbacksRecv: {
    rating: number;
    comment?: string | null;
    giver: { name: string };
  }[];
};

type SkillOption = { id: string; name: string; category?: string | null };
type UserSkillItem = {
  id: string;
  name?: string;
  skill?: { name: string };
  type: string;
  level: string;
};
type AvailabilityItem = {
  id: string;
  day?: string;
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
};

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const LEVELS: Record<string, string> = {
  BEGINNER: "Débutant",
  INTERMEDIATE: "Intermédiaire",
  ADVANCED: "Avancé",
  EXPERT: "Expert",
};

function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function PublicProfilView({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/v1/users/${userId}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [userId]);

  const initials =
    profile?.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  const teachSkills = profile?.skills.filter((s) => s.type === "TEACH") ?? [];
  const learnSkills = profile?.skills.filter((s) => s.type === "LEARN") ?? [];

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/matchs" className="text-sm hover:text-[#DFB626]">
          ← Retour aux matchs
        </Link>

        {loading && (
          <div className="flex justify-center mt-20">
            <p className="text-gray-500">Chargement du profil…</p>
          </div>
        )}

        {!loading && notFound && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <p className="text-5xl">🙈</p>
            <p className="text-2xl font-bold">Profil introuvable</p>
            <p className="text-gray-500">
              Ce profil n&apos;existe pas ou a été supprimé.
            </p>
            <Link
              href="/matchs"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition"
            >
              Voir les matchs
            </Link>
          </div>
        )}

        {!loading && profile && (
          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-8">
            <aside className="border border-gray-200 rounded-3xl p-6 h-fit">
              <div className="w-32 h-32 bg-[#DFB626] rounded-full flex items-center justify-center text-5xl font-bold mx-auto">
                {initials}
              </div>

              <h1 className="text-2xl font-bold text-center mt-5">
                {profile.name}
              </h1>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                  <p className="text-xl font-bold">{teachSkills.length}</p>
                  <p className="text-sm">Enseigne</p>
                </div>
                <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                  <p className="text-xl font-bold">{learnSkills.length}</p>
                  <p className="text-sm">Apprend</p>
                </div>
                <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                  <p className="text-xl font-bold">
                    {profile.availabilities.length}
                  </p>
                  <p className="text-sm">Dispos</p>
                </div>
                <div className="bg-[#DFB626] rounded-2xl p-4 text-center">
                  <p className="text-xl font-bold">{profile.badges.length}</p>
                  <p className="text-sm">Badges</p>
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
                <p className="text-[#DFB626] font-bold mb-2">Profil étudiant</p>
                <h2 className="text-4xl font-serif font-bold">
                  {profile.name}
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="border border-gray-200 rounded-3xl p-8">
                  <h3 className="font-bold text-xl mb-4">J&apos;enseigne</h3>
                  {teachSkills.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      Aucune compétence à enseigner renseignée.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {teachSkills.map((s) => (
                        <div
                          key={s.id}
                          className="flex justify-between items-center bg-[#F5F5F5] rounded-2xl px-4 py-3"
                        >
                          <span>{s.skill.name}</span>
                          <span className="bg-[#DFB626] px-3 py-1 rounded-full text-sm">
                            {LEVELS[s.level] ?? s.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 rounded-3xl p-8">
                  <h3 className="font-bold text-xl mb-4">J&apos;apprends</h3>
                  {learnSkills.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      Aucune compétence à apprendre renseignée.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {learnSkills.map((s) => (
                        <span
                          key={s.id}
                          className="bg-[#F5F5F5] px-4 py-2 rounded-full"
                        >
                          {s.skill.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-gray-200 rounded-3xl p-8">
                <h3 className="font-bold text-xl mb-4">Disponibilités</h3>
                {profile.availabilities.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Aucune disponibilité renseignée.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.availabilities.map((slot) => (
                      <div
                        key={slot.id}
                        className="rounded-2xl p-4 border border-green-500 bg-green-50"
                      >
                        <p className="font-bold">
                          {DAYS[slot.dayOfWeek] ?? `Jour ${slot.dayOfWeek}`}
                        </p>
                        <p className="text-gray-600">
                          {slot.startTime} – {slot.endTime}
                        </p>
                        <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-[#DFB626] hover:text-black transition">
                          Réserver
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-3xl p-8">
                <h3 className="font-bold text-xl mb-4">Badges débloqués</h3>
                {profile.badges.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Aucun badge débloqué pour l&apos;instant.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {profile.badges.map((b) => (
                      <span
                        key={b.id}
                        className="bg-black text-white px-4 py-2 rounded-full"
                      >
                        🏆 {b.badge.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-3xl p-8">
                <div className="flex justify-between mb-6">
                  <h3 className="font-bold text-2xl">Avis reçus</h3>
                  <Link href="/feed" className="hover:text-[#DFB626]">
                    Voir tout →
                  </Link>
                </div>
                {profile.feedbacksRecv.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Aucun avis reçu pour l&apos;instant.
                  </p>
                ) : (
                  profile.feedbacksRecv.map((fb, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-100 py-4 flex flex-col sm:flex-row sm:justify-between gap-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {fb.giver.name}
                        </p>
                        {fb.comment && (
                          <p className="text-gray-600 mt-1">{fb.comment}</p>
                        )}
                      </div>
                      <p className="text-[#DFB626]">{renderStars(fb.rating)}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

function AddSkillModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (skill: UserSkillItem) => void;
}) {
  const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);
  const [skillId, setSkillId] = useState("");
  const [skillName, setSkillName] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [type, setType] = useState<"TEACH" | "LEARN">("TEACH");
  const [level, setLevel] = useState("BEGINNER");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/v1/skills")
      .then((r) => r.json())
      .then(setSkillOptions)
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const token = localStorage.getItem("token");
    const body = useCustom
      ? { skillName, type, level }
      : { skillId, type, level };
    const res = await fetch("/api/v1/users/me/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      onAdded(data);
      onClose();
    } else {
      setError(data.message ?? "Erreur lors de l'ajout.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6">Ajouter une compétence</h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setUseCustom(false)}
              className={`flex-1 py-2 rounded-xl border text-sm transition ${!useCustom ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"}`}
            >
              Choisir existante
            </button>
            <button
              type="button"
              onClick={() => setUseCustom(true)}
              className={`flex-1 py-2 rounded-xl border text-sm transition ${useCustom ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"}`}
            >
              Créer nouvelle
            </button>
          </div>

          {useCustom ? (
            <input
              type="text"
              required
              placeholder="Nom de la compétence"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          ) : (
            <select
              required
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 bg-white"
            >
              <option value="">-- Sélectionner une compétence --</option>
              {skillOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "TEACH" | "LEARN")}
                className="w-full border rounded-xl px-4 py-3 bg-white"
              >
                <option value="TEACH">J&apos;enseigne</option>
                <option value="LEARN">J&apos;apprends</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Niveau
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 bg-white"
              >
                {Object.entries(LEVELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60"
            >
              {saving ? "Ajout…" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddAvailabilityModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (a: AvailabilityItem) => void;
}) {
  const [dayOfWeek, setDayOfWeek] = useState("0");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const token = localStorage.getItem("token");
    const res = await fetch("/api/v1/users/me/availabilities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      onAdded(data);
      onClose();
    } else {
      setError(data.message ?? "Erreur lors de l'ajout.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6">Ajouter une disponibilité</h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Jour
            </label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 bg-white"
            >
              {DAYS.map((d, i) => (
                <option key={i} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Heure de début
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Heure de fin
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60"
            >
              {saving ? "Ajout…" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProfilContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("user");

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("user") ?? "null");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!userId);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<{ name: string; bio: string }>(() => {
    if (typeof window === "undefined") return { name: "", bio: "" };
    try {
      const u = JSON.parse(localStorage.getItem("user") ?? "null");
      return { name: u?.name ?? "", bio: u?.bio ?? "" };
    } catch {
      return { name: "", bio: "" };
    }
  });
  const [saving, setSaving] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddAvailability, setShowAddAvailability] = useState(false);

  useEffect(() => {
    if (userId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/v1/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setAuthUser(data);
        setForm({ name: data.name ?? "", bio: data.bio ?? "" });
      })
      .catch(() => setError("Impossible de charger le profil."))
      .finally(() => setLoading(false));
  }, [router, userId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/v1/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

  function handleSkillAdded(skill: UserSkillItem) {
    setAuthUser((prev) => ({
      ...prev,
      skills: [...(prev?.skills ?? []), skill],
    }));
  }

  function handleAvailabilityAdded(availability: AvailabilityItem) {
    setAuthUser((prev) => ({
      ...prev,
      availabilities: [...(prev?.availabilities ?? []), availability],
    }));
  }

  // Vue profil d'un autre utilisateur
  if (userId) return <PublicProfilView userId={userId} />;

  if (loading)
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <p className="text-gray-600">Chargement…</p>
      </main>
    );

  const initials = authUser?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      {showAddSkill && (
        <AddSkillModal
          onClose={() => setShowAddSkill(false)}
          onAdded={handleSkillAdded}
        />
      )}
      {showAddAvailability && (
        <AddAvailabilityModal
          onClose={() => setShowAddAvailability(false)}
          onAdded={handleAvailabilityAdded}
        />
      )}

      <section className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/" className="text-sm hover:text-[#DFB626]">
          ← Accueil
        </Link>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
            {error}
          </p>
        )}

        <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-8">
          <aside className="border border-gray-200 rounded-3xl p-6 h-fit">
            <div className="w-32 h-32 bg-[#DFB626] rounded-full flex items-center justify-center text-5xl font-bold mx-auto">
              {initials}
            </div>
            <h1 className="text-2xl font-bold text-center mt-5">
              {authUser?.name}
            </h1>
            <p className="text-center text-gray-500 text-sm">
              {authUser?.email}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">
                  {authUser?.skills?.length ?? 0}
                </p>
                <p className="text-sm">Compétences</p>
              </div>
              <div className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                <p className="text-xl font-bold">
                  {authUser?.availabilities?.length ?? 0}
                </p>
                <p className="text-sm">Dispos</p>
              </div>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-black text-white py-4 rounded-xl mt-6 hover:bg-[#DFB626] hover:text-black transition"
            >
              Modifier le profil
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                router.push("/");
              }}
              className="w-full border border-black py-4 rounded-xl mt-3 hover:bg-black hover:text-white transition"
            >
              Déconnexion
            </button>
          </aside>

          <section className="space-y-8">
            <div className="border border-gray-200 rounded-3xl p-8">
              <p className="text-[#DFB626] font-bold mb-2">Mon profil</p>

              {editMode ? (
                <form onSubmit={handleSave} className="space-y-4 mt-2">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    placeholder="Nom complet"
                    className="w-full border rounded-xl px-4 py-3"
                  />
                  <textarea
                    value={form.bio}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bio: e.target.value }))
                    }
                    placeholder="Courte description (bio)"
                    rows={3}
                    className="w-full border rounded-xl px-4 py-3 resize-none"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-black text-white px-6 py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60"
                    >
                      {saving ? "Sauvegarde…" : "Enregistrer"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="border border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-4xl font-serif font-bold">
                    {authUser?.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{authUser?.email}</p>
                  {authUser?.bio && (
                    <p className="text-gray-700 mt-4 leading-relaxed">
                      {authUser.bio}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <h3 className="font-bold text-xl mb-4">Mes compétences</h3>
              {(authUser?.skills?.length ?? 0) > 0 ? (
                <div className="space-y-3">
                  {authUser!.skills!.map((s) => (
                    <div
                      key={s.id}
                      className="flex justify-between items-center bg-[#F5F5F5] rounded-2xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span>{s.skill?.name ?? s.name}</span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${s.type === "TEACH" ? "bg-[#DFB626] text-black" : "bg-black text-white"}`}
                        >
                          {s.type === "TEACH" ? "J'enseigne" : "J'apprends"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {LEVELS[s.level] ?? s.level}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Aucune compétence ajoutée pour l&apos;instant.
                </p>
              )}
              <button
                onClick={() => setShowAddSkill(true)}
                className="mt-5 w-full border-2 border-dashed border-gray-200 text-gray-600 py-4 rounded-xl hover:border-[#DFB626] hover:text-black transition"
              >
                + Ajouter une compétence
              </button>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8">
              <h3 className="font-bold text-xl mb-4">Mes disponibilités</h3>
              {(authUser?.availabilities?.length ?? 0) > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {authUser!.availabilities!.map((a) => (
                    <span
                      key={a.id}
                      className="bg-[#DFB626] text-black px-4 py-2 rounded-full text-sm"
                    >
                      {a.dayOfWeek !== undefined ? DAYS[a.dayOfWeek] : a.day}{" "}
                      {a.startTime}–{a.endTime}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Aucune disponibilité renseignée.
                </p>
              )}
              <button
                onClick={() => setShowAddAvailability(true)}
                className="mt-5 w-full border-2 border-dashed border-gray-200 text-gray-600 py-4 rounded-xl hover:border-[#DFB626] hover:text-black transition"
              >
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

export default function ProfilPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
          <p className="text-gray-600">Chargement…</p>
        </main>
      }
    >
      <ProfilContent />
    </Suspense>
  );
}
