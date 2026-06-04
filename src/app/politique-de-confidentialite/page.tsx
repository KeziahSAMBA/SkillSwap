import Header from "@/components/Header";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "1. Responsable du traitement",
    text: "Le responsable du traitement des donnÃ©es est l'Ã©quipe SkillSwap, dans le cadre du projet pÃ©dagogique rÃ©alisÃ© Ã  l'Institut F2i / Ã‰cole DSP. Pour toute question, contactez : contact@skillswap.fr.",
  },
  {
    title: "2. DonnÃ©es collectÃ©es",
    text: "Nous collectons les donnÃ©es que vous nous fournissez lors de l'inscription (nom, email institutionnel), ainsi que les donnÃ©es gÃ©nÃ©rÃ©es par votre utilisation de la plateforme : compÃ©tences dÃ©clarÃ©es, disponibilitÃ©s, sessions, badges, feedbacks et interactions sociales.",
  },
  {
    title: "3. FinalitÃ©s du traitement",
    text: "Vos donnÃ©es sont utilisÃ©es pour vous identifier sur la plateforme, permettre le matching avec d'autres Ã©tudiants, organiser des sessions, gÃ©rer la gamification et afficher le feed social. Aucune donnÃ©e n'est utilisÃ©e Ã  des fins commerciales.",
  },
  {
    title: "4. Base lÃ©gale",
    text: "Le traitement est fondÃ© sur votre consentement, donnÃ© lors de l'inscription, et sur l'intÃ©rÃªt lÃ©gitime liÃ© au fonctionnement de la plateforme Ã©ducative.",
  },
  {
    title: "5. DurÃ©e de conservation",
    text: "Vos donnÃ©es sont conservÃ©es pendant la durÃ©e de vie de votre compte. Ã€ la suppression du compte, les donnÃ©es personnelles sont effacÃ©es dans un dÃ©lai de 30 jours, sauf obligation lÃ©gale contraire.",
  },
  {
    title: "6. Partage des donnÃ©es",
    text: "Vos donnÃ©es ne sont pas vendues ni cÃ©dÃ©es Ã  des tiers. Certaines informations de profil (nom, compÃ©tences, disponibilitÃ©s) sont visibles des autres Ã©tudiants inscrits sur la plateforme dans le cadre du matching.",
  },
  {
    title: "7. Cookies",
    text: "SkillSwap utilise des cookies strictement nÃ©cessaires au fonctionnement du site (session, authentification). Les cookies optionnels nÃ©cessitent votre consentement prÃ©alable via le bandeau affichÃ© Ã  votre premiÃ¨re visite.",
  },
  {
    title: "8. Vos droits",
    text: "ConformÃ©ment au RGPD, vous disposez d'un droit d'accÃ¨s, de rectification, d'effacement, d'opposition, de portabilitÃ© et de limitation du traitement de vos donnÃ©es. Pour exercer ces droits, rendez-vous sur la page RGPD ou Ã©crivez Ã  contact@skillswap.fr.",
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-4xl mx-auto px-5 pt-32 md:pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              LÃ©gal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Politique de confidentialitÃ©
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              DerniÃ¨re mise Ã  jour : juin 2026. Comment SkillSwap collecte, utilise
              et protÃ¨ge vos donnÃ©es personnelles.
            </p>
          </div>

          <div className="space-y-4">
            {articles.map((article) => (
              <article
                key={article.title}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6"
              >
                <h2 className="text-lg font-bold text-[#a594ff]">{article.title}</h2>
                <p className="mt-3 text-white/70 leading-relaxed text-sm">{article.text}</p>
              </article>
            ))}

            {/* Contact */}
            <div className="backdrop-blur-sm bg-[#4D3AFF]/30 border border-[#a594ff]/30 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#a594ff]">Une question sur vos donnÃ©es ?</h2>
                <p className="text-white/60 text-sm mt-1">Contactez-nous ou consultez la page RGPD.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="mailto:contact@skillswap.fr"
                  className="backdrop-blur-xs bg-white/15 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition text-sm"
                >
                  contact@skillswap.fr
                </a>
                <a
                  href="/rgpd"
                  className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/40 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#4D3AFF]/70 transition text-sm"
                >
                  Page RGPD
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

