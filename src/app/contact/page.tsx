"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-4 sm:px-5 py-16">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1800AD]/10 text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Contactez-nous
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1800AD]">
              Une question ? Écrivez-nous
            </h1>
            <p className="text-[#4A4A4A] mt-4 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1800AD] mb-2">Message envoyé !</h3>
                  <p className="text-[#4A4A4A]">Nous vous répondrons dans les 24-48h.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#1800AD] font-semibold hover:text-[#4D3AFF]"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/20 outline-none transition"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/20 outline-none transition"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Sujet
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/20 outline-none transition"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="bug">Signaler un bug</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/20 outline-none transition resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1800AD] text-white py-4 rounded-xl font-semibold hover:bg-[#4D3AFF] transition"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1800AD]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#1800AD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1800AD]">Email</h3>
                    <p className="text-[#4A4A4A]">contact@skillswap.fr</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1800AD]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#1800AD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1800AD]">Adresse</h3>
                    <p className="text-[#4A4A4A]">Paris, France</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1800AD]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#1800AD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1800AD]">Horaires</h3>
                    <p className="text-[#4A4A4A]">Lun - Ven: 9h - 18h</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1800AD] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">FAQ</h3>
                <p className="text-indigo-200 mb-4">
                  Consultez notre FAQ pour trouver rapidement des réponses à vos questions les plus fréquentes.
                </p>
                <button className="bg-white text-[#1800AD] px-6 py-2 rounded-xl font-semibold hover:bg-[#F6F7FB] transition">
                  Voir la FAQ
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
