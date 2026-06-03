"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const sessions = [
  {
    id: 1,
    title: "Cours React.js en groupe",
    teacher: "Tom Couture",
    type: "Vidéo",
    format: "Cours collectif",
    date: "Lundi 14h",
    duration: "1h",
    participants: 8,
    maxParticipants: 12,
    status: "En direct",
  },
  {
    id: 2,
    title: "Atelier SEO & Canva",
    teacher: "Sarah Benali",
    type: "Vocal",
    format: "Atelier",
    date: "Jeudi 12h",
    duration: "45min",
    participants: 5,
    maxParticipants: 10,
    status: "Ouvert",
  },
  {
    id: 3,
    title: "Club Agile & Scrum",
    teacher: "Estelle Morel",
    type: "Vidéo",
    format: "Club",
    date: "Vendredi 10h",
    duration: "1h30",
    participants: 12,
    maxParticipants: 15,
    status: "Planifié",
  },
];

const filters = ["Tous", "Vidéo", "Vocal", "Atelier", "Club"];

function getStatusClass(status: string) {
  if (status === "En direct") {
    return "bg-red-100 text-red-700 border-red-300";
  }

  if (status === "Ouvert") {
    return "bg-green-100 text-green-700 border-green-300";
  }

  return "bg-[#1800AD]/10 text-[#1800AD] border-[#1800AD]/20";
}

export default function SessionsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredSessions = useMemo(() => {
    if (activeFilter === "Tous") return sessions;

    return sessions.filter(
      (session) =>
        session.type === activeFilter || session.format === activeFilter
    );
  }, [activeFilter]);

  return (
    <main className="relative min-h-screen bg-[#F6F7FB] text-[#4A4A4A] overflow-hidden pt-30">
      <AnimatedBackground />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-[#1800AD] font-bold">
                Sessions & cours live
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#1800AD]">
                Rejoins un cours collectif
              </h1>

              <p className="text-[#4A4A4A] mt-3 max-w-2xl">
                Participe à des cours en groupe avec un formateur et plusieurs
                étudiants, en format vidéo ou vocal.
              </p>
            </div>

            <button className="bg-[#1800AD] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition">
              + Créer un cours
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full border font-medium transition ${
                  activeFilter === filter
                    ? "bg-[#1800AD] border-[#1800AD] text-white"
                    : "bg-white border-gray-200 text-[#4A4A4A] hover:border-[#1800AD] hover:text-[#1800AD]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <article
                key={session.id}
                className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="bg-[#1800AD]/10 text-[#1800AD] px-4 py-1 rounded-full text-sm font-semibold">
                      {session.type === "Vidéo" ? "🎥 Vidéo" : "🎙️ Vocal"}
                    </span>

                    <h2 className="text-xl font-bold mt-5 text-[#1800AD]">
                      {session.title}
                    </h2>

                    <p className="text-[#4A4A4A] mt-1">
                      Animé par {session.teacher}
                    </p>
                  </div>

                  <span
                    className={`border px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      session.status
                    )}`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm text-[#4A4A4A]">
                  <p>📅 {session.date}</p>
                  <p>⏱️ {session.duration}</p>
                  <p>
                    👥 {session.participants}/{session.maxParticipants}{" "}
                    participants
                  </p>
                  <p>📚 {session.format}</p>
                </div>

                <div className="mt-6 bg-[#F6F7FB] rounded-full h-3">
                  <div
                    className="bg-[#1800AD] h-3 rounded-full"
                    style={{
                      width: `${
                        (session.participants / session.maxParticipants) * 100
                      }%`,
                    }}
                  />
                </div>

                <button className="w-full mt-6 bg-[#1800AD] text-white py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition">
                  {session.status === "En direct"
                    ? "Rejoindre l’appel"
                    : "Réserver une place"}
                </button>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}