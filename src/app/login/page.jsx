"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message ?? "Erreur de connexion.");
      return;
    }

    localStorage.setItem("token", data.token);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    router.push("/profil");
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <img src="/logo-6you.png" className="h-12 mb-8" alt="SkillSwap" />

        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="text-gray-600 mt-2">Accède à ton espace étudiant.</p>

        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email étudiant"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-center py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="text-sm mt-6">
          Pas encore inscrit ?{" "}
          <Link href="/register" className="text-[#DFB626] font-bold">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}
