"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("skillswapCookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("skillswapCookieConsent", "accepted");
    setVisible(false);
  };

  const refuseCookies = () => {
    localStorage.setItem("skillswapCookieConsent", "refused");
    setVisible(false);
  };

  const customizeCookies = () => {
    localStorage.setItem("skillswapCookieConsent", "customized");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 z-[999] max-w-5xl mx-auto bg-white border border-[#E8E9F5] rounded-3xl shadow-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h3 className="text-xl font-bold text-[#1800AD]">
            Gestion des cookies
          </h3>

          <p className="text-[#4A4A4A] mt-2 text-sm leading-relaxed">
            SkillSwap utilise des cookies nécessaires au fonctionnement du site.
            Les cookies de mesure d’audience ou d’amélioration de l’expérience
            ne sont utilisés qu’avec votre accord.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={refuseCookies}
            className="border border-[#1800AD] text-[#1800AD] px-5 py-3 rounded-xl font-semibold hover:bg-[#1800AD] hover:text-white transition"
          >
            Refuser
          </button>

          <button
            onClick={customizeCookies}
            className="border border-[#1800AD] text-[#1800AD] px-5 py-3 rounded-xl font-semibold hover:bg-[#1800AD] hover:text-white transition"
          >
            Personnaliser
          </button>

          <button
            onClick={acceptCookies}
            className="bg-[#1800AD] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}