import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Mentions lÃ©gales",
    text: "SkillSwap est une plateforme Ã©tudiante collaborative permettant aux utilisateurs de partager des compÃ©tences, consulter des profils, organiser des sessions et interagir dans un cadre pÃ©dagogique. Projet rÃ©alisÃ© dans le cadre du Workshop Agile/Scrum â€” Institut F2i / Ã‰cole DSP.",
  },
  {
    title: "2. Conditions gÃ©nÃ©rales d'utilisation",
    text: "L'utilisateur s'engage Ã  utiliser SkillSwap dans un cadre respectueux, lÃ©gal et pÃ©dagogique. Il est interdit de publier des contenus offensants, frauduleux, discriminatoires ou contraires aux rÃ¨gles de l'Ã©tablissement. La plateforme peut restreindre l'accÃ¨s Ã  un compte en cas d'usage abusif.",
  },
  {
    title: "3. Politique de confidentialitÃ©",
    text: "Les donnÃ©es collectÃ©es peuvent inclure le nom, l'adresse email, les compÃ©tences, les disponibilitÃ©s, les sessions, les badges, les feedbacks et les interactions liÃ©es au fonctionnement de la plateforme. Ces donnÃ©es servent uniquement Ã  permettre le matching, la gestion des profils, les sessions et l'amÃ©lioration du service.",
  },
  {
    title: "4. Gestion des cookies",
    text: "Les cookies strictement nÃ©cessaires permettent le fonctionnement du site. Les cookies optionnels, par exemple liÃ©s aux statistiques ou Ã  l'amÃ©lioration de l'expÃ©rience, nÃ©cessitent le consentement prÃ©alable de l'utilisateur.",
  },
  {
    title: "5. Droit Ã  l'oubli",
    text: "L'utilisateur peut demander la suppression de son compte et des donnÃ©es personnelles associÃ©es. Certaines donnÃ©es peuvent Ãªtre conservÃ©es temporairement lorsqu'une obligation lÃ©gale ou technique l'exige.",
  },
  {
    title: "6. Export des donnÃ©es personnelles",
    text: "L'utilisateur peut demander une copie de ses donnÃ©es personnelles dans un format exploitable. La demande peut concerner le profil, les compÃ©tences, les sessions, les badges, les publications et les feedbacks associÃ©s au compte.",
  },
];

const rights = [
  "Droit d'accÃ¨s aux donnÃ©es personnelles",
  "Droit de rectification des informations inexactes",
  "Droit d'effacement des donnÃ©es",
  "Droit d'opposition au traitement",
  "Droit Ã  la portabilitÃ© des donnÃ©es",
  "Droit de limitation du traitement",
];

const steps = [
  ["Ã‰tape 1", "Envoyer une demande depuis l'adresse email associÃ©e au compte SkillSwap."],
  ["Ã‰tape 2", "Indiquer le type de demande : export, suppression ou rectification."],
  ["Ã‰tape 3", "L'Ã©quipe vÃ©rifie l'identitÃ© du demandeur avant traitement."],
  ["Ã‰tape 4", "Une rÃ©ponse est envoyÃ©e avec confirmation de l'action effectuÃ©e."],
];

export default function RGPDPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-6xl mx-auto px-5 pt-32 md:pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Pages lÃ©gales &amp; RGPD
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Protection des donnÃ©es personnelles
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Informations lÃ©gales, politique de confidentialitÃ©, gestion des cookies
              et droits des utilisateurs sur leurs donnÃ©es personnelles.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Sections principales */}
            <div className="space-y-5">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6"
                >
                  <h2 className="text-lg font-bold text-[#a594ff]">{section.title}</h2>
                  <p className="mt-3 text-white/70 leading-relaxed text-sm">{section.text}</p>
                </article>
              ))}

              {/* ProcÃ©dure */}
              <article className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
                <h2 className="text-lg font-bold text-[#a594ff] mb-5">
                  ProcÃ©dure de demande d&apos;export ou suppression
                </h2>
                <div className="space-y-3">
                  {steps.map(([label, text]) => (
                    <div
                      key={label}
                      className="backdrop-blur-xs bg-white/10 border border-white/10 rounded-2xl p-4"
                    >
                      <p className="font-bold text-[#a594ff] text-sm">{label}</p>
                      <p className="text-white/70 text-sm mt-1">{text}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="mailto:contact@skillswap.fr?subject=Demande RGPD SkillSwap"
                  className="inline-block mt-6 backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-[#4D3AFF]/70 transition"
                >
                  Faire une demande RGPD
                </a>
              </article>
            </div>

            {/* Aside droits */}
            <aside className="space-y-5">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
                <h2 className="text-lg font-bold text-[#a594ff] mb-4">Droits utilisateurs</h2>
                <div className="space-y-2">
                  {rights.map((right) => (
                    <div
                      key={right}
                      className="backdrop-blur-xs bg-white/10 border border-white/10 rounded-xl p-3 text-sm text-white/70"
                    >
                      {right}
                    </div>
                  ))}
                </div>
              </div>

              <div className="backdrop-blur-sm bg-[#4D3AFF]/30 border border-[#a594ff]/30 rounded-3xl p-6">
                <h2 className="text-lg font-bold text-[#a594ff]">Contact RGPD</h2>
                <p className="mt-3 text-white/70 text-sm">
                  Pour toute demande liÃ©e aux donnÃ©es personnelles :
                </p>
                <a
                  href="mailto:contact@skillswap.fr"
                  className="inline-block mt-4 backdrop-blur-xs bg-white/15 border border-white/30 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/25 transition text-sm"
                >
                  contact@skillswap.fr
                </a>
              </div>
            </aside>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

