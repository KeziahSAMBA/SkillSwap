"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const profiles = [
  {
    slug: "tom",
    initials: "TC",
    name: "Tom Couture",
    role: "Développement Web",
    score: 96,
    rating: 5,
    sessions: 23,
    xp: 680,
    color: "bg-[#1800AD]",
    presence: "online",
    lastSeen: "En ligne maintenant",
    skills: ["React.js", "Node.js", "Next.js"],
    bio: "Passionné de front-end, j’aide les étudiants à progresser sur React, Next.js et Node.js.",
    availability: [
      { day: "Lundi", hour: "14h - 15h", available: true },
      { day: "Mercredi", hour: "18h - 19h", available: true },
      { day: "Vendredi", hour: "10h - 11h", available: false },
    ],
  },
  {
    slug: "sarah",
    initials: "SA",
    name: "Sarah Benali",
    role: "E-business",
    score: 89,
    rating: 4,
    sessions: 11,
    xp: 420,
    color: "bg-[#4D3AFF]",
    presence: "away",
    lastSeen: "Vue il y a 12 min",
    skills: ["SEO", "Canva", "Marketing"],
    bio: "Spécialisée en marketing digital, SEO et création de contenus visuels.",
    availability: [
      { day: "Mardi", hour: "12h - 13h", available: true },
      { day: "Jeudi", hour: "16h - 17h", available: false },
    ],
  },
  {
    slug: "estelle",
    initials: "ES",
    name: "Estelle Morel",
    role: "Chef de projet",
    score: 83,
    rating: 4,
    sessions: 8,
    xp: 350,
    color: "bg-[#1800AD]",
    presence: "offline",
    lastSeen: "Hors ligne depuis 2h",
    skills: ["Agile", "Scrum", "Trello"],
    bio: "J’accompagne les étudiants sur la gestion Agile, Scrum et Trello.",
    availability: [
      { day: "Lundi", hour: "10h - 11h", available: true },
      { day: "Vendredi", hour: "15h - 16h", available: true },
    ],
  },
  {
    slug: "kim",
    initials: "KM",
    name: "Kim Martin",
    role: "Design UX/UI",
    score: 91,
    rating: 5,
    sessions: 17,
    xp: 530,
    color: "bg-[#4D3AFF]",
    presence: "online",
    lastSeen: "En ligne maintenant",
    skills: ["Figma", "Prototype", "UX"],
    bio: "Designer UX/UI, j’aide à créer des maquettes modernes et simples à utiliser.",
    availability: [
      { day: "Mercredi", hour: "13h - 14h", available: true },
      { day: "Jeudi", hour: "18h - 19h", available: true },
    ],
  },
];

function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function presenceColor(presence: string) {
  if (presence === "online") return "bg-green-500";
  if (presence === "away") return "bg-yellow-400";
  return "bg-gray-400";
}

export default function ProfilPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("user") || "tom";
  const profile = profiles.find((p) => p.slug === selected) || profiles[0];

  return (
    <main className="relative min-h-screen bg-[#F6F7FB] text-[#4A4A4A] overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 py-10">
          <div className="mb-10">
            <p className="text-[#1800AD] font-bold">Profils étudiants</p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#1800AD]">
              Consulte les profils disponibles
            </h1>

            <p className="mt-3">
              Sélectionne un étudiant pour voir ses compétences, ses
              disponibilités et son score de matching.
            </p>
          </div>

          <div className="grid lg:grid-cols-[360px_1fr] gap-10">
            <aside className="space-y-4">
              {profiles.map((item) => {
                const active = item.slug === profile.slug;

                return (
                  <Link
                    key={item.slug}
                    href={`/profil?user=${item.slug}`}
                    className={`block bg-white border rounded-3xl p-5 transition ${
                      active
                        ? "border-[#1800AD] shadow-md"
                        : "border-gray-100 hover:border-[#1800AD]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className={`w-14 h-14 rounded-full ${item.color} text-white flex items-center justify-center font-bold`}
                        >
                          {item.initials}
                        </div>

                        <span
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${presenceColor(
                            item.presence
                          )}`}
                        />
                      </div>

                      <div className="flex-1">
                        <h2 className="font-bold text-[#1800AD]">
                          {item.name}
                        </h2>
                        <p className="text-sm">{item.role}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.lastSeen}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-green-700">
                        {item.score}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </aside>

            <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div
                      className={`w-24 h-24 rounded-full ${profile.color} text-white flex items-center justify-center text-3xl font-bold`}
                    >
                      {profile.initials}
                    </div>

                    <span
                      className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${presenceColor(
                        profile.presence
                      )}`}
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1800AD]">
                      {profile.name}
                    </h2>
                    <p>{profile.role}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {profile.lastSeen}
                    </p>
                    <p className="text-[#1800AD] mt-2">
                      {stars(profile.rating)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-[#1800AD] text-white rounded-2xl p-4">
                    <p className="font-bold">{profile.score}%</p>
                    <p className="text-xs">Match</p>
                  </div>

                  <div className="border border-gray-100 rounded-2xl p-4">
                    <p className="font-bold text-[#1800AD]">
                      {profile.sessions}
                    </p>
                    <p className="text-xs">Sessions</p>
                  </div>

                  <div className="bg-[#1800AD]/10 rounded-2xl p-4">
                    <p className="font-bold text-[#1800AD]">{profile.xp}</p>
                    <p className="text-xs">XP</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-xl mb-2 text-[#1800AD]">Bio</h3>
                <p>{profile.bio}</p>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-xl mb-3 text-[#1800AD]">
                  Compétences
                </h3>

                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-xl mb-3 text-[#1800AD]">
                  Disponibilités
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.availability.map((slot) => (
                    <div
                      key={`${slot.day}-${slot.hour}`}
                      className={`rounded-2xl p-4 border ${
                        slot.available
                          ? "border-green-500 bg-green-50"
                          : "border-gray-100 bg-[#F6F7FB]"
                      }`}
                    >
                      <p className="font-bold text-[#1800AD]">{slot.day}</p>
                      <p>{slot.hour}</p>

                      <p
                        className={`text-sm mt-2 ${
                          slot.available ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {slot.available ? "Disponible" : "Occupé"}
                      </p>

                      <button
                        disabled={!slot.available}
                        className={`w-full mt-4 py-2 rounded-xl font-semibold transition ${
                          slot.available
                            ? "bg-[#1800AD] text-white hover:bg-[#4D3AFF]"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {slot.available ? "Réserver" : "Indisponible"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="/sessions"
                  className="bg-[#1800AD] text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition"
                >
                  Planifier une session
                </Link>

                <Link
                  href="/feed"
                  className="border border-[#1800AD] text-[#1800AD] text-center px-6 py-3 rounded-xl font-semibold hover:bg-[#1800AD] hover:text-white transition"
                >
                  Voir les feedbacks
                </Link>
              </div>
            </section>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}