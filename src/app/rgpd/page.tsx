import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function RGPDPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />

        <section className="max-w-4xl mx-auto px-4 sm:px-5 py-16">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Légal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1800AD]">
              Politique de confidentialité & RGPD
            </h1>
            <p className="text-[#4A4A4A] mt-4">
              Dernière mise à jour : Janvier 2024
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">1. Introduction</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                SkillSwap s&apos;engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité 
                explique comment nous collectons, utilisons et protégeons vos données personnelles conformément 
                au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">2. Données collectées</h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                <li>Informations d&apos;identification (nom, prénom, email)</li>
                <li>Données de profil (compétences, photo, description)</li>
                <li>Données de connexion (adresse IP, logs)</li>
                <li>Données d&apos;utilisation (sessions, matchs, messages)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">3. Utilisation des données</h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Faciliter les matchs entre étudiants</li>
                <li>Communiquer avec vous (notifications, newsletters)</li>
                <li>Assurer la sécurité de la plateforme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">4. Base légale du traitement</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                Le traitement de vos données repose sur : votre consentement, l&apos;exécution du contrat 
                (conditions d&apos;utilisation), nos intérêts légitimes, et nos obligations légales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">5. Partage des données</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                Vos données ne sont jamais vendues. Elles peuvent être partagées avec : d&apos;autres utilisateurs 
                (profil public), nos prestataires techniques (hébergement, analytics), et les autorités 
                compétentes si requis par la loi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">6. Durée de conservation</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                Vos données sont conservées pendant la durée de votre inscription et jusqu&apos;à 3 ans après 
                la suppression de votre compte pour des raisons légales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">7. Vos droits RGPD</h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Accès", desc: "Obtenir une copie de vos données" },
                  { title: "Rectification", desc: "Corriger vos données inexactes" },
                  { title: "Effacement", desc: "Supprimer vos données" },
                  { title: "Portabilité", desc: "Récupérer vos données" },
                  { title: "Opposition", desc: "Vous opposer au traitement" },
                  { title: "Limitation", desc: "Limiter le traitement" },
                ].map((right) => (
                  <div key={right.title} className="bg-[#F6F7FB] rounded-xl p-4">
                    <h4 className="font-bold text-[#1800AD]">{right.title}</h4>
                    <p className="text-sm text-[#4A4A4A]">{right.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">8. Cookies</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                Nous utilisons des cookies essentiels au fonctionnement du site et des cookies analytiques 
                (avec votre consentement) pour améliorer nos services. Vous pouvez gérer vos préférences 
                de cookies à tout moment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">9. Sécurité</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité appropriées : chiffrement SSL/TLS, 
                authentification sécurisée, sauvegardes régulières, et contrôle d&apos;accès strict.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">10. Contact DPO</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                Pour exercer vos droits ou pour toute question relative à la protection de vos données, 
                contactez notre Délégué à la Protection des Données :
              </p>
              <div className="bg-[#1800AD]/10 rounded-xl p-4 mt-4">
                <p className="font-semibold text-[#1800AD]">dpo@skillswap.fr</p>
                <p className="text-sm text-[#4A4A4A]">Réponse sous 30 jours maximum</p>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-[#1800AD] mb-4">Conditions Générales d&apos;Utilisation</h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-4">
                En utilisant SkillSwap, vous acceptez les présentes CGU. La plateforme est réservée aux 
                étudiants majeurs ou disposant d&apos;une autorisation parentale.
              </p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2 ml-4">
                <li>Respect des autres utilisateurs et de la communauté</li>
                <li>Interdiction de tout contenu illégal ou inapproprié</li>
                <li>Responsabilité des échanges de compétences</li>
                <li>Propriété intellectuelle des contenus partagés</li>
              </ul>
            </section>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
