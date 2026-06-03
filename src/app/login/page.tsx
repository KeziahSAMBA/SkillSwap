"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Identifiants incorrects.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("skillswapUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));

      setSuccess("Connexion réussie ! Redirection…");
      setTimeout(() => router.push("/profil"), 1000);
    } catch {
      setError("Impossible de contacter le serveur. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-5 py-10">
      <div className="bg-white border border-[#E8E9F5] rounded-3xl p-8 w-full max-w-md shadow-sm">
        <img src="/logo-6you.jpeg" className="h-12 mb-8" alt="SkillSwap" />

        <p className="text-[#1800AD] font-bold mb-2">Bienvenue sur SkillSwap</p>
        <h1 className="text-3xl font-bold text-[#1800AD]">Connexion</h1>
        <p className="text-[#4A4A4A] mt-2">Accède à ton espace étudiant.</p>

        {error && (
          <p className="mt-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-6 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email étudiant"
            className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
          />

          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="Mot de passe"
            className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1800AD] text-white font-semibold text-center py-3 rounded-xl hover:bg-[#4D3AFF] transition disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="text-sm text-[#4A4A4A] mt-6">
          Pas encore inscrit ?{" "}
          <Link href="/register" className="text-[#1800AD] font-bold hover:text-[#4D3AFF] transition">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}
