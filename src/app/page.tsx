import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { FaHandshake } from "react-icons/fa";

const BG_OVERLAY = "bg-black/60";
const BG_BLUR = "backdrop-blur-[2px]";

function SectionBg({ src, position = "center" }: { src: string; position?: string }) {
  return (
    <>
      <div className="absolute inset-0" style={{ backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: position }} />
      <div className={`absolute inset-0 ${BG_OVERLAY} ${BG_BLUR}`} />
    </>
  );
}

const steps = [
  {
    icon: "👤",
    number: "01",
    title: "Créez votre profil",
    text: "Renseignez vos compétences, votre niveau et ce que vous souhaitez apprendre.",
  },
  {
    icon: "👥",
    number: "02",
    title: "Trouvez un match",
    text: "Découvrez les étudiants compatibles avec vos objectifs d'apprentissage.",
  },
  {
    icon: "📅",
    number: "03",
    title: "Planifiez une session",
    text: "Organisez une session en visio ou en présentiel selon vos disponibilités.",
  },
  {
    icon: "📈",
    number: "04",
    title: "Progressez",
    text: "Échangez, gagnez des badges et valorisez vos contributions.",
  },
];

const advantages = [
  {
    icon: "💲",
    title: "100% Gratuit",
    text: "Un apprentissage collaboratif accessible à tous les étudiants.",
  },
  {
    icon: "🛡️",
    title: "Communauté fiable",
    text: "Profils, avis et badges pour favoriser des échanges de qualité.",
  },
  {
    icon: "🕒",
    title: "Flexible",
    text: "Des sessions adaptées à vos disponibilités et à votre rythme.",
  },
  {
    icon: "✨",
    title: "Progression",
    text: "XP, badges et niveaux pour suivre votre évolution.",
  },
];

const skills = [
  { icon: "⚛️", name: "React.js", tag: "Dev" },
  { icon: "🎨", name: "Figma", tag: "Design" },
  { icon: "🌍", name: "Anglais", tag: "Langues" },
  { icon: "📈", name: "SEO", tag: "Marketing" },
  { icon: "🐍", name: "Python", tag: "Dev" },
  { icon: "🖼️", name: "Photoshop", tag: "Design" },
  { icon: "📊", name: "Excel", tag: "Business" },
  { icon: "ES", name: "Espagnol", tag: "Langues" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1800AD] text-white">
      <div className="min-h-screen bg-black/50">
      <Header />

      {/* HERO */}
      <section className="min-h-screen flex items-center relative pt-32 md:pt-36 overflow-hidden">
        <SectionBg src="/students.jpg" position="top" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="mt-6 md:mt-10">
            <span className="inline-block backdrop-blur-[1px] bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full mb-6">
              Plateforme étudiante collaborative
            </span>

            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white">
              Apprendre.
              <br />
              <span className="text-[#a594ff]">Partager.</span>
              <br />
              Évoluer.
            </h1>

            <p className="mt-6 text-lg leading-relaxed max-w-xl text-white/75">
              SkillSwap connecte les étudiants grâce à leurs compétences.
              Apprenez, partagez et progressez ensemble dans une communauté de
              confiance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/register"
                className="backdrop-blur-[1px] bg-white/10 border border-white/30 text-white font-bold px-6 py-3 rounded-xl text-center hover:bg-white/30 transition"
              >
                Commencer
              </Link>
            </div>

            <div className="flex items-center mt-8">
              <div className="flex -space-x-3">
                {["TC", "SA", "ES", "KM"].map((avatar) => (
                  <div
                    key={avatar}
                    className="w-10 h-10 rounded-full bg-[#4D3AFF]/70 backdrop-blur-[4px] text-white border-2 border-white/30 flex items-center justify-center text-sm font-bold"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <p className="ml-5 text-base text-white/80">
                <span className="text-white font-bold">+2500</span>{" "}
                étudiants actifs
              </p>
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0 mb-8 lg:mb-0">
            <div className="hidden sm:flex absolute -right-3 -top-4 z-10 bg-white rounded-2xl shadow-lg px-5 py-3 items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
              </span>
              <p className="font-bold text-gray-800">Match trouvé !</p>
            </div>

            <div className="backdrop-blur-[4px] bg-white/10 border border-white/20 rounded-3xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-[2px] border border-white/20 text-white flex items-center justify-center text-2xl">
                  <FaHandshake />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Collaboration</h2>
                  <p className="text-base text-white/70">Échange de compétences</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["12K+", "Matchs réalisés"],
                  ["3.5K", "Sessions/mois"],
                  ["150+", "Compétences"],
                  ["98%", "Satisfaction"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="backdrop-blur-[2px] bg-black/20 border border-white/15 rounded-2xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm mt-1 text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden sm:flex absolute -left-3 bottom-[-22px] z-10 bg-white shadow-lg rounded-2xl px-5 py-3 items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#4D3AFF] text-white flex items-center justify-center">
                🎓
              </span>
              <p className="font-bold text-gray-800">+50 XP gagnés</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="min-h-screen flex flex-col justify-center py-16 relative overflow-hidden border-t border-white/20">
        <SectionBg src="/students2.jpg" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
          <div className="text-center mb-12">
            <span className="inline-block backdrop-blur-[4px] bg-white/10 border border-white/15 text-white font-bold px-4 py-2 text-sm rounded-full">
              Simple et efficace
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-5 text-[#a594ff]">
              Comment ça marche ?
            </h2>
            <p className="text-base mt-4 max-w-2xl mx-auto text-white/70">
              En quelques étapes simples, commencez à échanger vos compétences
              avec d&apos;autres étudiants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const images = ["/photo_profil.jpg", "/match.jpg", "/calendar.jpg", "/progresser.jpg"];
              const titleColors = ["#a594ff", "#a594ff", "#a594ff", "#a594ff"];
              return (
                <div
                  key={step.number}
                  className="relative rounded-3xl p-6 min-h-65 shadow-lg overflow-hidden border border-white/10 transition hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${images[index]})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
                  <div className="relative z-10 h-full flex flex-col justify-between min-h-55">
                    <p className="text-4xl font-black text-[#4D3AFF] w-fit rounded-lg px-1">{step.number}</p>
                    <div className="text-center">
                      <h3 className="text-xl font-bold" style={{ color: titleColors[index] }}>{step.title}</h3>
                      <p className="text-base mt-2 leading-relaxed text-white/90">{step.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="min-h-screen flex flex-col justify-center py-16 relative overflow-hidden border-t border-blue-700/70">
        <SectionBg src="/students3.jpg" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
          <div className="text-center mb-12">
            <span className="inline-block backdrop-blur-[4px] bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Pourquoi nous choisir
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#a594ff] mt-5">
              Les avantages SkillSwap
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg hover:bg-white/15 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-black/20 border border-white/15 text-white flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#a594ff]">{item.title}</h3>
                <p className="text-base mt-4 leading-relaxed text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + COMPÉTENCES — image commune */}
      <div className="relative overflow-hidden border-t border-white/20">
        <SectionBg src="/students4.jpg" />

      {/* CTA */}
      <section className="min-h-[50vh] flex flex-col justify-center py-8 text-center relative">
        <div className="relative z-10 max-w-5xl mx-auto px-5 w-full">
          <div className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-3xl p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-black text-[#a594ff]">
              Prêt à rejoindre la communauté ?
            </h2>
            <p className="text-lg mt-5 text-white/75">
              Inscrivez-vous gratuitement et commencez à échanger vos compétences
              dès aujourd&apos;hui.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                href="/register"
                className="backdrop-blur-[4px] bg-white/25 border border-white/40 text-white font-bold px-7 py-3 rounded-xl hover:bg-white/35 transition"
              >
                Créer un compte gratuit
              </Link>
              <Link
                href="/login"
                className="backdrop-blur-[4px] bg-black/20 border border-white/25 text-white/80 font-bold px-7 py-3 rounded-xl hover:bg-black/30 hover:text-white transition"
              >
                J&apos;ai déjà un compte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section className="min-h-[50vh] flex flex-col justify-center py-8 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-5 w-full text-center">
          <span className="inline-block backdrop-blur-[4px] bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
            Découvrez
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#a594ff] mt-5">
            Exemples de compétences
          </h2>
          <p className="text-base mt-4 text-white/70">
            Dev, Design, Langues, Marketing... Trouvez ou partagez toutes les
            compétences imaginables.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {skills.map((skill) => (
              <div
                
                key={skill.name}
                className="backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-full px-5 py-3 flex items-center justify-between hover:bg-white/20 transition"
              >
                <span className="flex items-center gap-3 text-base font-semibold text-white">
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>
                <span className="backdrop-blur-[4px] bg-black/20 border border-white/15 px-3 py-1 rounded-full text-sm text-white/70">
                  {skill.tag}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/login"
            className="inline-block text-white/80 hover:text-white font-bold text-lg mt-10 transition"
          >
            Voir toutes les compétences →
          </Link>
        </div>
      </section>
      </div>{/* fin wrapper CTA + COMPÉTENCES */}

      <CookieBanner />
      <Footer />
      </div>
    </main>
  );
}