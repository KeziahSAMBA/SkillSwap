import Header from "@/components/Header";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "1. Responsable du traitement",
    text: "Le responsable du traitement des données est l'équipe SkillSwap, dans le cadre du projet pédagogique réalisé à l'Institut F2i / École DSP. Pour toute question, contactez : contact@skillswap.fr.",
  },
  {
    title: "2. Données collectées",
    text: "Nous collectons les données que vous nous fournissez lors de l'inscription (nom, email institutionnel), ainsi que les données générées par votre utilisation de la plateforme : compétences déclarées, disponibilités, sessions, badges, feedbacks et interactions sociales.",
  },
  {
    title: "3. Finalités du traitement",
    text: "Vos données sont utilisées pour vous identifier sur la plateforme, permettre le matching avec d'autres étudiants, organiser des sessions, gérer la gamification et afficher le feed social. Aucune donnée n'est utilisée à des fins commerciales.",
  },
  {
    title: "4. Base légale",
    text: "Le traitement est fondé sur votre consentement, donné lors de l'inscription, et sur l'intérêt légitime lié au fonctionnement de la plateforme éducative.",
  },
  {
    title: "5. Durée de conservation",
    text: "Vos données sont conservées pendant la durée de vie de votre compte. À la suppression du compte, les données personnelles sont effacées dans un délai de 30 jours, sauf obligation légale contraire.",
  },
  {
    title: "6. Partage des données",
    text: "Vos données ne sont pas vendues ni cédées à des tiers. Certaines informations de profil (nom, compétences, disponibilités) sont visibles des autres étudiants inscrits sur la plateforme dans le cadre du matching.",
  },
  {
    title: "7. Cookies",
    text: "SkillSwap utilise des cookies strictement nécessaires au fonctionnement du site (session, authentification). Les cookies optionnels nécessitent votre consentement préalable via le bandeau affiché à votre première visite.",
  },
  {
    title: "8. Vos droits",
    text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de portabilité et de limitation du traitement de vos données. Pour exercer ces droits, rendez-vous sur la page RGPD ou écrivez à contact@skillswap.fr.",
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

        <section className="max-w-4xl mx-auto px-5 pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Légal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Politique de confidentialité
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Dernière mise à jour : juin 2026. Comment SkillSwap collecte, utilise
              et protège vos données personnelles.
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
                <h2 className="text-lg font-bold text-[#a594ff]">Une question sur vos données ?</h2>
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
