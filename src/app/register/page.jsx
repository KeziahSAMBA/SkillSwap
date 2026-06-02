"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teach, setTeach] = useState("");
  const [learn, setLearn] = useState("");
  const [level, setLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message ?? "Erreur lors de l'inscription.");
      return;
    }

    localStorage.setItem("token", data.token);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    router.push("/profil");
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-xl">
        <img src="/logo-6you.png" className="h-12 mb-8" alt="SkillSwap" />

        <h1 className="text-3xl font-bold">Inscription</h1>
        <p className="text-gray-600 mt-2">Crée ton profil étudiant initial.</p>

        <form className="grid md:grid-cols-2 gap-4 mt-8" onSubmit={handleSubmit}>
          {error && (
            <p className="md:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <input
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded-xl px-4 py-3"
          />
          <input
            type="email"
            placeholder="Email étudiant"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-xl px-4 py-3"
          />
          <input
            placeholder="Compétence à enseigner"
            value={teach}
            onChange={(e) => setTeach(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />
          <input
            placeholder="Compétence à apprendre"
            value={learn}
            onChange={(e) => setLearn(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />
          <input
            placeholder="Niveau"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />
          <input
            placeholder="Disponibilités"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="md:col-span-2 border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white text-center py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60"
          >
            {loading ? "Création…" : "Créer mon profil"}
          </button>
        </form>

        <p className="text-sm mt-6">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-[#DFB626] font-bold">
            Connexion
          </Link>
        </p>
      </div>
    </main>
  );
}
