"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message ?? "Erreur de connexion.");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-sm">
        <h1 className="text-3xl font-serif font-bold mb-2">Connexion</h1>
        <p className="text-gray-500 text-sm mb-8">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-black font-medium hover:text-[#DFB626]">
            Inscris-toi
          </Link>
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="ton@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-[#DFB626] hover:text-black transition disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-black">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
