"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  name: string;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("skillswapUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const logout = () => {
    localStorage.removeItem("skillswapUser");
    setUser(null);
  };

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/matchs", label: "Matching" },
    { href: "/profil", label: "Profil" },
    { href: "/sessions", label: "Sessions" },
    { href: "/gamification", label: "Gamification" },
    { href: "/feed", label: "Feed social" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-6you.jpeg" alt="SkillSwap" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#DFB626]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/feed" className="relative text-xl">
            🔔
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#DFB626] rounded-full" />
          </Link>

          {user ? (
            <>
              <Link
                href="/profil"
                className="w-11 h-11 rounded-full bg-[#DFB626] flex items-center justify-center font-bold"
              >
                {initials}
              </Link>

              <button
                onClick={logout}
                className="text-sm border border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="border border-black px-4 py-2 rounded-xl">
                Connexion
              </Link>

              <Link href="/register" className="bg-[#DFB626] px-4 py-2 rounded-xl font-semibold">
                Inscription
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-3xl">
          ☰
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-5 flex flex-col gap-4 bg-white">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/profil" className="bg-[#DFB626] px-4 py-2 rounded-xl text-center font-bold">
                {initials}
              </Link>

              <button onClick={logout} className="border border-black px-4 py-2 rounded-xl">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Connexion</Link>
              <Link href="/register" className="bg-[#DFB626] px-4 py-2 rounded-xl text-center">
                Inscription
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}