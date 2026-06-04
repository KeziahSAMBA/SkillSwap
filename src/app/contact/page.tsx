"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "Qui peut contacter l'administration ?",
    answer:
      "Tous les utilisateurs de SkillSwap peuvent contacter l'administration ou le support en cas de question, problÃ¨me technique ou demande liÃ©e au compte.",
  },
  {
    question: "Combien de temps pour obtenir une rÃ©ponse ?",
    answer:
      "Une rÃ©ponse est gÃ©nÃ©ralement apportÃ©e dans les meilleurs dÃ©lais par l'Ã©quipe support ou l'administration de l'Ã©tablissement.",
  },
  {
    question: "Puis-je demander la suppression de mon compte ici ?",
    answer:
      "Oui, vous pouvez utiliser ce formulaire pour faire une demande liÃ©e Ã  vos donnÃ©es personnelles ou Ã  votre compte.",
  },
  {
    question: "Le formulaire est-il connectÃ© au backend ?",
    answer:
      "Cette interface prÃ©voit un envoi via API sur la route /api/v1/contact.",
  },
];

const inputCls =
  "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#a594ff]/60 focus:bg-white/15 transition";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = { name: "", email: "", subject: "", message: "" };
    if (!form.name.trim()) e.name = "Le nom est obligatoire.";
    if (!form.email.trim()) e.email = "L'email est obligatoire.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide.";
    if (!form.subject.trim()) e.subject = "L'objet est obligatoire.";
    if (!form.message.trim()) e.message = "Le message est obligatoire.";
    else if (form.message.trim().length < 10) e.message = "Au moins 10 caractÃ¨res.";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-32 md:pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Contact &amp; support
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Contacter l&apos;administration ou le support
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Utilisez ce formulaire pour signaler un problÃ¨me technique, poser une
              question ou faire une demande liÃ©e Ã  votre compte SkillSwap.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Formulaire */}
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8"
            >
              {success && (
                <div className="mb-6 bg-green-500/10 border border-green-400/30 text-green-300 rounded-2xl p-4 font-medium">
                  Message envoyÃ©. Le support reviendra vers vous dÃ¨s que possible.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1.5">Nom</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Votre nom complet" className={inputCls} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1.5">Email</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" className={inputCls} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-white/70 text-xs font-medium mb-1.5">Objet</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Objet de votre demande" className={inputCls} />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div className="mt-4">
                <label className="block text-white/70 text-xs font-medium mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Expliquez votre demande..."
                  className={inputCls + " min-h-40 resize-none"}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/40 text-white font-bold py-3 rounded-xl hover:bg-[#4D3AFF]/70 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>

            {/* Aside */}
            <aside className="space-y-5">
              <div className="backdrop-blur-sm bg-[#4D3AFF]/30 border border-[#a594ff]/30 rounded-3xl p-6">
                <h2 className="text-xl font-bold text-[#a594ff]">Support SkillSwap</h2>
                <p className="mt-3 text-white/70 text-sm">
                  Pour toute demande urgente, contactez directement
                  l&apos;administration de votre Ã©tablissement.
                </p>
                <div className="mt-5 space-y-2 text-sm text-white/80">
                  <p>ðŸ“© support@skillswap.fr</p>
                  <p>ðŸ« Administration Ã©tablissement</p>
                  <p>â±ï¸ RÃ©ponse selon disponibilitÃ©</p>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6">
                <h2 className="text-xl font-bold text-[#a594ff] mb-5">FAQ</h2>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="backdrop-blur-xs bg-white/10 border border-white/10 rounded-2xl p-4"
                    >
                      <summary className="font-semibold text-white cursor-pointer text-sm">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

