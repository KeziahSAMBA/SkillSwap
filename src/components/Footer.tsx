import Link from "next/link";

import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-[#1800AD] text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* LOGO */}
          <div>
            <img src="/logo-6you.jpeg" alt="SkillSwap"  className="h-12 mb-4 bg-white rounded-lg p-1"  />

            <p className="text-white/80 text-sm leading-relaxed">
              SkillSwap connecte les étudiants afin d’échanger leurs
              compétences, apprendre ensemble et développer leur réseau.
            </p>

            {/* RESEAUX SOCIAUX */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1800AD] transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1800AD] transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1800AD] transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1800AD] transition"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* PRODUIT */}
          <div>
            <h4 className="font-bold text-lg mb-4">
              Navigation
            </h4>

            <div className="space-y-3 text-white/80">

              <Link href="/matchs" className="block hover:text-white">
                Matching
              </Link>

               <Link href="/profil" className="block hover:text-white">
                Profil
              </Link>

              <Link href="/sessions" className="block hover:text-white">
                Sessions
              </Link>

               <Link href="/feed" className="block hover:text-white">
                Feed social
              </Link>

              <Link href="/messages" className="block hover:text-white">
                Messagerie
              </Link>

              <Link href="/gamification" className="block hover:text-white">
                Gamification
              </Link>
            </div>
          </div>

          {/* COMPTE */}
          <div>
            <h4 className="font-bold text-lg mb-4">
              Compte
            </h4>

            <div className="space-y-3 text-white/80">
              <Link href="/profil" className="block hover:text-white">
                Mon profil
              </Link>

              <Link href="/feed" className="block hover:text-white">
                Feed social
              </Link>

              <Link href="/contact" className="block hover:text-white">
                Support
              </Link>

              <Link href="/login" className="block hover:text-white">
                Connexion
              </Link>
            </div>
          </div>

          {/* INFORMATIONS */}
          <div>
            <h4 className="font-bold text-lg mb-4">
              Informations
            </h4>

            <div className="space-y-3 text-white/80">
              <Link href="/a-propos" className="block hover:text-white">
                À propos
              </Link>

              <Link href="/contact" className="block hover:text-white">
                Contact
              </Link>

              <Link href="/rgpd" className="block hover:text-white">
                RGPD
              </Link>

              <Link href="/rgpd" className="block hover:text-white">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>

        {/* BAS FOOTER */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            © 2026 SkillSwap — Tous droits réservés.
          </p>

          <div className="flex gap-6 text-sm text-white/70">
            <Link href="/rgpd" className="hover:text-white">
              Confidentialité
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>

            <Link href="/a-propos" className="hover:text-white">
              À propos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}