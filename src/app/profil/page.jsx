"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LEVELS = ["Débutant", "Intermédiaire", "Avancé", "Expert"];
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/connexion");
      return;
    }

    const cached = localStorage.getItem("user");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setUser((prev) => prev ?? parsed);
        setForm((f) => ({ name: parsed.name ?? f.name, bio: parsed.bio ?? f.bio }));
      } catch {}
    }

    fetch("/api/v1/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("token");
          router.push("/connexion");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setUser(data);
        setForm({ name: data.name ?? "", bio: data.bio ?? "" });
      })
      .catch(() => setError("Impossible de charger le profil."))
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/connexion");
  }

  async function handleSave(e) {
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
      setUser((prev) => ({ ...prev, ...data }));
      setEditMode(false);
    } else {
      setError(data.message ?? "Erreur lors de la sauvegarde.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <p className="text-gray-700">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Nav espace connecté */}
      <header className="w-full bg-white shadow-sm">
        <div className="w-[90%] max-w-6xl mx-auto flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-semibold text-black">
            SkillSwap
          </Link>
          <nav className="flex gap-6 text-gray-700 font-medium text-sm">
            <Link href="/profil" className="text-blue-600 font-semibold">
              Mon profil
            </Link>
            <Link href="/recherche">Recherche</Link>
            <Link href="/sessions">Mes sessions</Link>
            <Link href="/gamification">Progression</Link>
            <Link href="/feed">Feed</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-600">#{user?.id}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-700 hover:text-red-500"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="w-[90%] max-w-4xl mx-auto py-10 space-y-8">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Carte identité */}
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>

            <div className="flex-1">
              {editMode ? (
                <form onSubmit={handleSave} className="space-y-3">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="Nom complet"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    placeholder="Courte description (bio)"
                    rows={2}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
                    >
                      {saving ? "Sauvegarde…" : "Enregistrer"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="text-sm px-4 py-2 rounded-lg border hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-700 text-sm mt-1">{user?.email}</p>
                  {user?.bio && (
                    <p className="text-gray-600 mt-2 text-sm">{user.bio}</p>
                  )}
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-3 text-sm text-blue-600 hover:underline"
                  >
                    Modifier le profil
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Compétences */}
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Mes compétences</h3>
            <span className="text-xs text-gray-600">Niveaux déclarés</span>
          </div>

          {user?.skills?.length > 0 ? (
            <ul className="space-y-3">
              {user.skills.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between border rounded-xl px-4 py-3"
                >
                  <div>
                    <span className="font-medium text-sm">{s.skill?.name ?? s.name}</span>
                    <span
                      className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                        s.type === "teach"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {s.type === "teach" ? "J'enseigne" : "J'apprends"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-700">{s.level}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm text-center py-6">
              Aucune compétence ajoutée pour l'instant.
            </p>
          )}

          <button className="mt-5 w-full border-2 border-dashed border-gray-200 text-gray-600 text-sm py-3 rounded-xl hover:border-blue-300 hover:text-blue-500 transition-colors">
            + Ajouter une compétence
          </button>
        </section>

        {/* Disponibilités */}
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-lg font-semibold mb-6">Mes disponibilités</h3>

          {user?.availabilities?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.availabilities.map((a) => (
                <span
                  key={a.id}
                  className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {a.day} {a.startTime}–{a.endTime}
                </span>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600 text-sm text-center">
                Aucune disponibilité renseignée.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {DAYS.map((day) => (
                  <span
                    key={day}
                    className="border text-gray-600 text-xs px-3 py-1 rounded-full cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button className="mt-5 w-full border-2 border-dashed border-gray-200 text-gray-600 text-sm py-3 rounded-xl hover:border-blue-300 hover:text-blue-500 transition-colors">
            + Ajouter une disponibilité
          </button>
        </section>
      </main>
    </div>
  );
}
