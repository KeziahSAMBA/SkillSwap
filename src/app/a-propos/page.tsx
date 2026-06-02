import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const team = [
  { name: "Marie Dupont", role: "CEO & Co-fondatrice", initials: "MD" },
  { name: "Lucas Martin", role: "CTO & Co-fondateur", initials: "LM" },
  { name: "Sarah Bernard", role: "Head of Product", initials: "SB" },
  { name: "Thomas Petit", role: "Lead Developer", initials: "TP" },
];

const values = [
  {
    title: "Collaboration",
    description: "Nous croyons que l'apprentissage est plus efficace quand il est partagé.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Confiance",
    description: "Une communauté sécurisée où chacun peut apprendre en toute sérénité.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Progression",
    description: "Chaque échange est une opportunité de grandir et d'évoluer.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "Nous innovons constamment pour améliorer l'expérience d'apprentissage.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Accessibilité",
    description: "L'apprentissage doit être accessible à tous, sans barrières financières.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-5 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Notre histoire
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1800AD] leading-tight">
              Connecter les talents.
              <br />
              <span className="text-[#4D3AFF]">Partager les savoirs.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#4A4A4A] mt-6 max-w-3xl mx-auto leading-relaxed">
              SkillSwap est né d&apos;une idée simple : chaque étudiant possède des compétences uniques 
              qu&apos;il peut partager avec d&apos;autres. Notre mission est de faciliter ces échanges 
              pour créer une communauté d&apos;apprentissage collaborative.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-5">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Notre mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1800AD] mb-6">
                  Démocratiser l&apos;apprentissage entre pairs
                </h2>
                <p className="text-[#4A4A4A] text-lg leading-relaxed mb-6">
                  Nous croyons que les meilleurs enseignants sont souvent ceux qui viennent de traverser 
                  les mêmes défis. SkillSwap permet aux étudiants de s&apos;entraider, de partager leurs 
                  connaissances et de progresser ensemble.
                </p>
                <p className="text-[#4A4A4A] text-lg leading-relaxed">
                  Notre plateforme 100% gratuite met en relation les étudiants selon leurs compétences 
                  et leurs besoins d&apos;apprentissage, créant ainsi un écosystème d&apos;entraide unique.
                </p>
              </div>
              <div className="bg-[#F6F7FB] rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "2500+", label: "Étudiants actifs" },
                    { value: "12K+", label: "Matchs réalisés" },
                    { value: "150+", label: "Compétences" },
                    { value: "98%", label: "Satisfaction" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-4xl font-bold text-[#1800AD]">{stat.value}</p>
                      <p className="text-[#4A4A4A] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-5">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Ce qui nous guide
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1800AD]">Nos valeurs</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition group"
                >
                  <div className="w-14 h-14 bg-[#F6F7FB] rounded-xl flex items-center justify-center text-[#1800AD] mb-4 group-hover:bg-[#1800AD] group-hover:text-white transition">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1800AD] mb-2">{value.title}</h3>
                  <p className="text-[#4A4A4A]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-5">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                L&apos;équipe
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1800AD]">Les personnes derrière SkillSwap</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#F6F7FB] rounded-2xl p-6 text-center hover:shadow-lg transition"
                >
                  <div className="w-20 h-20 bg-[#1800AD] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="text-lg font-bold text-[#1800AD]">{member.name}</h3>
                  <p className="text-[#4A4A4A] text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#1800AD]">
          <div className="max-w-4xl mx-auto px-4 sm:px-5 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Rejoignez l&apos;aventure SkillSwap
            </h2>
            <p className="text-indigo-200 text-lg mb-8">
              Faites partie d&apos;une communauté d&apos;étudiants passionnés et commencez à échanger vos compétences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-[#1800AD] px-8 py-4 rounded-xl font-semibold hover:bg-[#F6F7FB] transition"
              >
                Créer un compte gratuit
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1800AD] transition"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
