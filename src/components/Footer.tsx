import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1800AD] text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#1800AD] font-black text-2xl">
               <Link href="/" className="flex items-center gap-3">
                <img src="/logo-6you.jpeg" alt="SkillSwap" className="h-10 w-auto" />
              </Link>
              </div>

              <div>
                <h2 className="text-3xl font-bold">SkillSwap</h2>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed text-lg">
              Connecter les talents.
              <br />
              Partager les savoirs.
              <br />
              Grandir ensemble.
            </p>

          </div>

          {/* Produit */}
          <div>
            <h3 className="font-bold text-2xl mb-5 text-[#BDB7FF]">
              Produit
            </h3>

            <div className="flex flex-col gap-3 text-lg">
              <Link href="/matchs" className="hover:text-[#BDB7FF] transition">
                Matching
              </Link>

              <Link href="/sessions" className="hover:text-[#BDB7FF] transition">
                Sessions
              </Link>

              <Link href="/gamification" className="hover:text-[#BDB7FF] transition">
                Badges
              </Link>

              <Link href="/feed" className="hover:text-[#BDB7FF] transition">
                Feed Social
              </Link>
            </div>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-bold text-2xl mb-5 text-[#BDB7FF]">
              À propos
            </h3>

            <div className="flex flex-col gap-3 text-lg">
              <Link href="/" className="hover:text-[#BDB7FF] transition">
                Qui sommes-nous
              </Link>

              <Link href="/" className="hover:text-[#BDB7FF] transition">
                Contact
              </Link>

              <Link href="/profil" className="hover:text-[#BDB7FF] transition">
                Mon compte
              </Link>
            </div>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-bold text-2xl mb-5 text-[#BDB7FF]">
              Légal
            </h3>

            <div className="flex flex-col gap-3 text-lg">
              <Link href="/" className="hover:text-[#BDB7FF] transition">
                RGPD & Confidentialité
              </Link>

              <Link href="/" className="hover:text-[#BDB7FF] transition">
                CGU
              </Link>

              <Link href="/" className="hover:text-[#BDB7FF] transition">
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Ligne séparation */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-lg">
            © 2026 SkillSwap. Tous droits réservés.
          </p>

          <p className="text-white/80 text-lg">
            ⚡ Échange de compétences simple et rapide
          </p>
        </div>
      </div>
    </footer>
  );
}