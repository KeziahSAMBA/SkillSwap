"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "Qui peut contacter l’administration ?",
    answer:
      "Tous les utilisateurs de SkillSwap peuvent contacter l’administration ou le support en cas de question, problème technique ou demande liée au compte.",
  },
  {
    question: "Combien de temps faut-il pour obtenir une réponse ?",
    answer:
      "Une réponse est généralement apportée dans les meilleurs délais par l’équipe support ou l’administration de l’établissement.",
  },
  {
    question: "Puis-je demander la suppression de mon compte ici ?",
    answer:
      "Oui, vous pouvez utiliser ce formulaire pour faire une demande liée à vos données personnelles ou à votre compte.",
  },
  {
    question: "Le formulaire est-il connecté au backend ?",
    answer:
      "Cette interface prévoit un envoi via API. Le backend devra traiter la route `/api/v1/contact` ou adapter l’URL selon votre architecture.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Le nom est obligatoire.";
    }

    if (!form.email.trim()) {
      newErrors.email = "L’email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "L’email n’est pas valide.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "L’objet est obligatoire.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Le message est obligatoire.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    try {
      await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur d’envoi du formulaire :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A] pt-30">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-12">
        <p className="text-[#1800AD] font-bold">Contact & support</p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1800AD] mt-2">
          Contacter l’administration ou le support
        </h1>

        <p className="mt-4 max-w-3xl">
          Utilisez ce formulaire pour contacter l’administration de
          l’établissement, signaler un problème technique ou demander de l’aide
          concernant votre compte SkillSwap.
        </p>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 mt-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
          >
            {success && (
              <div className="mb-6 bg-green-50 border border-green-300 text-green-700 rounded-2xl p-4 font-medium">
                Votre message a bien été envoyé. Le support reviendra vers vous
                dès que possible.
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#1800AD] mb-2">
                  Nom
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
                />

                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#1800AD] mb-2">
                  Email
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
                />

                {errors.email && (
                  <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold text-[#1800AD] mb-2">
                Objet
              </label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Objet de votre demande"
                className="w-full border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
              />

              {errors.subject && (
                <p className="text-red-600 text-sm mt-2">{errors.subject}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block font-semibold text-[#1800AD] mb-2">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Expliquez votre demande..."
                className="w-full min-h-40 border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none resize-none focus:border-[#1800AD] focus:ring-2 focus:ring-[#1800AD]/10 transition"
              />

              {errors.message && (
                <p className="text-red-600 text-sm mt-2">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#1800AD] text-white py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition disabled:opacity-60"
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="bg-[#1800AD] text-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold">Support SkillSwap</h2>

              <p className="mt-3 text-white/80">
                Pour toute demande urgente, contactez directement
                l’administration de votre établissement.
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <p>📩 support@skillswap.fr</p>
                <p>🏫 Administration établissement</p>
                <p>⏱️ Réponse selon disponibilité du support</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1800AD]">
                FAQ intégrée
              </h2>

              <div className="space-y-4 mt-5">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="bg-[#F6F7FB] rounded-2xl p-4"
                  >
                    <summary className="font-semibold text-[#1800AD] cursor-pointer">
                      {faq.question}
                    </summary>

                    <p className="mt-3 text-sm leading-relaxed">
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
    </main>
  );
}