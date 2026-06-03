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
    { href: "/messages", label: "Messages" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8E9F5]">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-6you.jpeg" alt="SkillSwap" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#4A4A4A]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#1800AD] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/feed"
            className="relative text-xl text-[#1800AD] hover:text-[#4D3AFF] transition"
          >
            🔔
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#4D3AFF] rounded-full" />
          </Link>

          {user ? (
            <>
              <Link
                href="/profil"
                className="w-11 h-11 rounded-full bg-[#1800AD] text-white flex items-center justify-center font-bold shadow-md"
              >
                {initials}
              </Link>

              <button
                onClick={logout}
                className="text-sm border border-[#1800AD] text-[#1800AD] px-4 py-2 rounded-xl font-semibold hover:bg-[#1800AD] hover:text-white transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-[#1800AD] text-[#1800AD] px-4 py-2 rounded-xl font-semibold hover:bg-[#1800AD] hover:text-white transition"
              >
                Connexion
              </Link>

              <Link
                href="/register"
                className="bg-[#1800AD] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#4D3AFF] transition shadow-md"
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-3xl text-[#1800AD]"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-5 flex flex-col gap-4 bg-white border-t border-[#E8E9F5]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#4A4A4A] font-medium hover:text-[#1800AD] transition"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/profil"
                onClick={() => setOpen(false)}
                className="bg-[#1800AD] text-white px-4 py-2 rounded-xl text-center font-bold"
              >
                {initials}
              </Link>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="border border-[#1800AD] text-[#1800AD] px-4 py-2 rounded-xl font-semibold hover:bg-[#1800AD] hover:text-white transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="border border-[#1800AD] text-[#1800AD] px-4 py-2 rounded-xl text-center font-semibold"
              >
                Connexion
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="bg-[#1800AD] text-white px-4 py-2 rounded-xl text-center font-semibold hover:bg-[#4D3AFF] transition"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}