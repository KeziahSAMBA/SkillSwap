"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  name: string;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const readUser = () => {
      const savedUser = localStorage.getItem("skillswapUser");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    const killSession = () => {
      localStorage.removeItem("skillswapUser");
      localStorage.removeItem("token");
    };

    const onScroll = () => setScrolled(window.scrollY > 10);

    readUser();
    window.addEventListener("storage", readUser);
    window.addEventListener("beforeunload", killSession);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("storage", readUser);
      window.removeEventListener("beforeunload", killSession);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const logout = () => {
    localStorage.removeItem("skillswapUser");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const links = [
    { href: "/profil", label: "Profil" },
    { href: "/matchs", label: "Matching" },
    { href: "/sessions", label: "Sessions" },
    { href: "/gamification", label: "Gamification" },
    { href: "/feed", label: "Feed social" },
    { href: "/messages", label: "Messages" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: scrolled ? "60px" : "120px",
        background: scrolled ? "#ffffff" : "#ffffff",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
        borderBottom: "1px solid rgba(232,233,245,0.8)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-6you.jpeg"
            alt="SkillSwap"
            width={100}
            height={100}
            style={{
              height: scrolled ? "40px" : "100px",
              width: scrolled ? "40px" : "100px",
              objectFit: "cover",
              transition: "all 0.3s ease",
            }}
          />
        </Link>

        {user && (
          <nav className="hidden lg:flex items-center gap-6 font-semibold"
            style={{ fontSize: scrolled ? "0.85rem" : "1.05rem", transition: "font-size 0.3s ease" }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "#1800AD", transition: "color 0.3s ease" }}
                className="hover:opacity-70 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center gap-3">
          {user && (
            <>
              <Link
                href="/feed"
                className="relative text-xl hover:opacity-70 transition"
                style={{ color: "#1800AD" }}
              >
                🔔
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#4D3AFF] rounded-full" />
              </Link>
              <Link
                href="/messages"
                className="relative text-xl hover:opacity-70 transition"
                style={{ color: "#1800AD" }}
              >
                📬
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link
                href="/profil"
                className="rounded-full flex items-center justify-center font-bold transition-all"
                style={{
                  width: scrolled ? "36px" : "44px",
                  height: scrolled ? "36px" : "44px",
                  fontSize: scrolled ? "0.75rem" : "0.9rem",
                  background: "#1800AD",
                  color: "white",
                  transition: "all 0.3s ease",
                }}
              >
                {initials}
              </Link>

              <button
                onClick={logout}
                className="rounded-xl font-semibold transition"
                style={{
                  padding: scrolled ? "4px 10px" : "6px 12px",
                  fontSize: scrolled ? "0.7rem" : "0.75rem",
                  border: "1px solid #1800AD",
                  color: "#1800AD",
                  background: "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl font-semibold transition"
                style={{
                  padding: scrolled ? "6px 14px" : "10px 20px",
                  fontSize: scrolled ? "0.8rem" : "0.95rem",
                  border: "1px solid #1800AD",
                  color: "#1800AD",
                  transition: "all 0.3s ease",
                }}
              >
                Connexion
              </Link>

              <Link
                href="/register"
                className="rounded-xl font-semibold transition"
                style={{
                  padding: scrolled ? "6px 14px" : "10px 20px",
                  fontSize: scrolled ? "0.8rem" : "0.95rem",
                  background: "#1800AD",
                  color: "white",
                  transition: "all 0.3s ease",
                }}
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-2xl transition"
          style={{ color: "#1800AD" }}
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden px-5 pb-5 flex flex-col gap-4 border-t border-gray-100"
          style={{ background: "rgba(255, 255, 255, 0.97)", backdropFilter: "blur(12px)" }}
        >
          {user && links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#1800AD]/70 font-medium hover:text-[#1800AD] transition pt-3"
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
                onClick={() => { logout(); setOpen(false); }}
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
                className="border border-[#1800AD] text-[#1800AD] px-4 py-2 rounded-xl text-center font-semibold mt-3"
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