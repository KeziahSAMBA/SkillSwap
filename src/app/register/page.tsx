"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Erreur lors de l'inscription.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("skillswapUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));

      setSuccess("Compte créé ! Redirection…");
      setTimeout(() => router.push("/profil"), 1000);
    } catch {
      setError("Impossible de contacter le serveur. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-5 py-10">
      <div className="bg-white border border-[#E8E9F5] rounded-3xl p-8 w-full max-w-xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <img src="/logo-6you.jpeg" className="h-12" alt="SkillSwap" />
          <Link href="/" className="text-sm font-semibold text-[#1800AD] hover:text-[#4D3AFF] transition">
            ← Retour
          </Link>
        </div>

        <p className="text-[#1800AD] font-bold mb-2">Rejoins la communauté SkillSwap</p>
        <h1 className="text-3xl font-bold text-[#1800AD]">Inscription</h1>
        <p className="text-[#4A4A4A] mt-2">
          Crée ton profil étudiant et commence à partager tes compétences.
        </p>

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

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-8">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Nom complet"
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
          />

          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email étudiant"
            className="border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
          />

          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="Mot de passe (min. 6 caractères)"
            className="md:col-span-2 border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none text-[#4A4A4A] focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-[#1800AD] text-white font-semibold text-center py-3 rounded-xl hover:bg-[#4D3AFF] transition disabled:opacity-60"
          >
            {loading ? "Création du compte…" : "Créer mon profil"}
          </button>
        </form>

        <p className="text-sm text-[#4A4A4A] mt-6">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-[#1800AD] font-bold hover:text-[#4D3AFF] transition">
            Connexion
          </Link>
        </p>
      </div>
    </main>
  );
}
