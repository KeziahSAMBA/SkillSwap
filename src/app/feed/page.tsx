"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FeedPost = {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/v1/feed")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    setError("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Tu dois être connecté pour publier.");
      setPosting(false);
      return;
    }

    const res = await fetch("/api/v1/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    if (res.ok) {
      setPosts((prev) => [data, ...prev]);
      setContent("");
    } else {
      setError(data.message ?? "Erreur lors de la publication.");
    }
    setPosting(false);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-5xl mx-auto px-5 py-12">
        <p className="text-[#DFB626] font-bold">Feed social</p>
        <h1 className="text-5xl font-serif font-bold mt-2">Valorise tes réalisations</h1>
        <p className="text-gray-600 mt-3">
          Publications, recommandations et feedbacks entre étudiants.
        </p>

        <form onSubmit={handlePublish} className="border border-gray-200 rounded-3xl p-6 mt-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Partage une réalisation, une recommandation ou un feedback..."
            className="w-full min-h-28 outline-none resize-none"
          />
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={posting || !content.trim()}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-[#DFB626] hover:text-black transition disabled:opacity-50"
            >
              {posting ? "Publication…" : "Publier"}
            </button>
          </div>
        </form>

        <div className="space-y-6 mt-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <p className="text-gray-500">Chargement du feed…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-300 rounded-3xl gap-3">
              <p className="text-4xl">📭</p>
              <p className="text-gray-600 font-medium text-xl">Aucune publication pour l&apos;instant.</p>
              <p className="text-gray-400 text-sm text-center max-w-xs">
                Sois le premier à partager une réalisation ou à laisser un feedback !
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-3xl p-6 hover:shadow-md transition"
              >
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-[#DFB626] rounded-2xl flex items-center justify-center text-xl font-bold shrink-0">
                    {initials(post.author.name)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{post.author.name}</h3>
                      <span className="text-gray-400 text-sm">{timeAgo(post.createdAt)}</span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
