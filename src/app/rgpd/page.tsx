import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const sections = [
  {
    title: "1. Mentions légales",
    text: "SkillSwap est une plateforme étudiante collaborative permettant aux utilisateurs de partager des compétences, consulter des profils, organiser des sessions et interagir dans un cadre pédagogique. Pour un projet réel, les informations de l’éditeur, de l’hébergeur et du responsable de publication devront être complétées.",
  },
  {
    title: "2. Conditions générales d’utilisation",
    text: "L’utilisateur s’engage à utiliser SkillSwap dans un cadre respectueux, légal et pédagogique. Il est interdit de publier des contenus offensants, frauduleux, discriminatoires ou contraires aux règles de l’établissement. La plateforme peut restreindre l’accès à un compte en cas d’usage abusif.",
  },
  {
    title: "3. Politique de confidentialité",
    text: "Les données collectées peuvent inclure le nom, l’adresse email, les compétences, les disponibilités, les sessions, les badges, les feedbacks et les interactions liées au fonctionnement de la plateforme. Ces données servent uniquement à permettre le matching, la gestion des profils, les sessions et l’amélioration du service.",
  },
  {
    title: "4. Gestion des cookies",
    text: "Les cookies strictement nécessaires permettent le fonctionnement du site. Les cookies optionnels, par exemple liés aux statistiques ou à l’amélioration de l’expérience, nécessitent le consentement préalable de l’utilisateur.",
  },
  {
    title: "5. Droit à l’oubli",
    text: "L’utilisateur peut demander la suppression de son compte et des données personnelles associées. Certaines données peuvent être conservées temporairement lorsqu’une obligation légale ou technique l’exige.",
  },
  {
    title: "6. Export des données personnelles",
    text: "L’utilisateur peut demander une copie de ses données personnelles dans un format exploitable. La demande peut concerner le profil, les compétences, les sessions, les badges, les publications et les feedbacks associés au compte.",
  },
];

const rights = [
  "Droit d’accès aux données personnelles",
  "Droit de rectification des informations inexactes",
  "Droit d’effacement des données",
  "Droit d’opposition au traitement",
  "Droit à la portabilité des données",
  "Droit de limitation du traitement",
];

export default function RGPDPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <Header />

      <section className="max-w-6xl mx-auto px-5 py-12">
        <p className="text-[#1800AD] font-bold">Pages légales & RGPD</p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1800AD] mt-2">
          Protection des données personnelles
        </h1>

        <p className="mt-4 max-w-3xl">
          Cette page présente les informations légales, la politique de
          confidentialité, la gestion des cookies et les procédures liées aux
          droits des utilisateurs sur leurs données personnelles.
        </p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-10">
          <div className="space-y-6">
            {sections.map((section) => (
              <article
                key={section.title}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-[#1800AD]">
                  {section.title}
                </h2>

                <p className="mt-3 leading-relaxed">{section.text}</p>
              </article>
            ))}

            <article className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1800AD]">
                Procédure de demande d’export ou suppression
              </h2>

              <div className="mt-4 space-y-4">
                <div className="bg-[#F6F7FB] rounded-2xl p-4">
                  <p className="font-bold text-[#1800AD]">Étape 1</p>
                  <p>
                    Envoyer une demande depuis l’adresse email associée au
                    compte SkillSwap.
                  </p>
                </div>

                <div className="bg-[#F6F7FB] rounded-2xl p-4">
                  <p className="font-bold text-[#1800AD]">Étape 2</p>
                  <p>
                    Indiquer le type de demande : export des données,
                    suppression du compte ou rectification.
                  </p>
                </div>

                <div className="bg-[#F6F7FB] rounded-2xl p-4">
                  <p className="font-bold text-[#1800AD]">Étape 3</p>
                  <p>
                    L’équipe vérifie l’identité du demandeur avant traitement.
                  </p>
                </div>

                <div className="bg-[#F6F7FB] rounded-2xl p-4">
                  <p className="font-bold text-[#1800AD]">Étape 4</p>
                  <p>
                    Une réponse est envoyée avec confirmation de l’export, de la
                    rectification ou de la suppression.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="mailto:contact@skillswap.fr?subject=Demande RGPD SkillSwap"
                  className="inline-block bg-[#1800AD] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition"
                >
                  Faire une demande RGPD
                </a>
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1800AD]">
                Droits utilisateurs
              </h2>

              <div className="space-y-3 mt-4">
                {rights.map((right) => (
                  <div
                    key={right}
                    className="bg-[#F6F7FB] rounded-xl p-3 text-sm font-medium"
                  >
                    {right}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1800AD] text-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold">Contact RGPD</h2>

              <p className="mt-3 text-white/80">
                Pour toute demande liée aux données personnelles :
              </p>

              <a
                href="mailto:contact@skillswap.fr"
                className="inline-block mt-4 bg-white text-[#1800AD] px-5 py-3 rounded-xl font-semibold"
              >
                contact@skillswap.fr
              </a>
            </div>
          </aside>
        </div>
      </section>

      <CookieBanner />

      <Footer />
    </main>
  );
}