import Link from "next/link";
import Image from "next/image";

import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#ffffff] text-[#1800AD] border-t">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* LOGO */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <Link href="/">
                <Image
                  src="/logo-6you.jpeg"
                  alt="SkillSwap"
                  width={100}
                  height={100}
                  className="h-25 w-25 object-cover rounded-xl"
                />
              </Link>

              <div>
                <h2 className="text-3xl font-bold text-[#1800AD]">SkillSwap</h2>
              </div>
            </div>

            <p className="text-[#4A4A4A]/70 text-sm leading-relaxed">
              SkillSwap connecte les étudiants afin d’échanger leurs
              compétences, apprendre ensemble et développer leur réseau.
            </p>

            {/* RESEAUX SOCIAUX */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1800AD]/10 text-[#1800AD] flex items-center justify-center hover:bg-[#1800AD] hover:text-white transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1800AD]/10 text-[#1800AD] flex items-center justify-center hover:bg-[#1800AD] hover:text-white transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1800AD]/10 text-[#1800AD] flex items-center justify-center hover:bg-[#1800AD] hover:text-white transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1800AD]/10 text-[#1800AD] flex items-center justify-center hover:bg-[#1800AD] hover:text-white transition"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* INFORMATIONS */}
          <div className="md:col-start-4">
            <h4 className="font-bold text-lg mb-4 text-[#1800AD]">Informations</h4>

            <div className="space-y-3 text-[#4A4A4A]/70">
              <Link href="/about" className="block hover:text-[#1800AD]">
                À propos
              </Link>

              <Link href="/contact" className="block hover:text-[#1800AD]">
                Contact
              </Link>

              <Link href="/rgpd" className="block hover:text-[#1800AD]">
                RGPD
              </Link>

              <Link href="/politique-de-confidentialite" className="block hover:text-[#1800AD]">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>

        {/* BAS FOOTER */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#4A4A4A]/60">
            © 2026 SkillSwap — Tous droits réservés.
          </p>

          <div className="flex items-start gap-2 text-sm text-[#4A4A4A]/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            Ceci est un projet fictif réalisé dans le cadre d’une formation. Toute ressemblance avec des entreprises réelles serait purement fortuite.
          </div>
        </div>
      </div>
    </footer>
  );
}
