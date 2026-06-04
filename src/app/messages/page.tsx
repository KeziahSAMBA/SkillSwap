"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const conversations = [
  {
    id: 1,
    name: "Tom Couture",
    initials: "TC",
    skill: "React.js",
    presence: "online",
    lastSeen: "En ligne",
    unread: 2,
    lastMessage: "Je t'ai envoyé l'exercice React.",
    messages: [
      {
        from: "other",
        text: "Salut, on peut travailler sur les composants React ?",
        time: "10:12",
      },
      {
        from: "me",
        text: "Oui, je suis disponible après 14h.",
        time: "10:14",
      },
      {
        from: "other",
        text: "Parfait, je t'ai envoyé l'exercice React.",
        time: "10:16",
        document: "exercice-react.pdf",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Benali",
    initials: "SA",
    skill: "SEO & Canva",
    presence: "away",
    lastSeen: "Vue il y a 12 min",
    unread: 0,
    lastMessage: "Merci pour ton retour sur la maquette.",
    messages: [
      {
        from: "other",
        text: "J'ai préparé une fiche SEO simple.",
        time: "09:20",
        document: "fiche-seo.docx",
      },
      {
        from: "me",
        text: "Merci, je regarde ça aujourd'hui.",
        time: "09:25",
      },
    ],
  },
  {
    id: 3,
    name: "Estelle Morel",
    initials: "ES",
    skill: "Gestion de projet",
    presence: "offline",
    lastSeen: "Hors ligne depuis 2h",
    unread: 1,
    lastMessage: "On peut faire un point Trello demain.",
    messages: [
      {
        from: "other",
        text: "On peut faire un point Trello demain.",
        time: "Hier",
      },
    ],
  },
];

function presenceDot(presence: string) {
  if (presence === "online") return "bg-green-500";
  if (presence === "away") return "bg-yellow-400";
  return "bg-white/30";
}

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [message, setMessage] = useState("");

  const activeConversation = useMemo(
    () =>
      conversations.find((c) => c.id === activeConversationId) ||
      conversations[0],
    [activeConversationId]
  );

  const sendMessage = () => {
    if (!message.trim()) return;
    alert("Message simulé côté front : " + message);
    setMessage("");
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/students2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <Header />

        <section className="max-w-7xl mx-auto px-5 pt-40 pb-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block backdrop-blur-xs bg-white/10 border border-white/20 text-white font-bold px-4 py-2 text-sm rounded-full">
              Messagerie interne
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-[#a594ff]">
              Échanger avec tes matchs
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Discute avec les étudiants matchés, partage des cours ou exercices
              et suis les nouveaux messages.
            </p>
          </div>

          {/* Chat container */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl overflow-hidden grid lg:grid-cols-[320px_1fr] min-h-[620px]">
            {/* LISTE CONVERSATIONS */}
            <aside className="border-r border-white/10">
              <div className="p-4 border-b border-white/10">
                <input
                  placeholder="Rechercher..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#a594ff]/60 transition"
                />
              </div>

              <div className="divide-y divide-white/10">
                {conversations.map((conv) => {
                  const active = conv.id === activeConversationId;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`w-full text-left p-4 transition ${
                        active ? "bg-[#4D3AFF]/30" : "hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-full bg-[#4D3AFF]/60 border border-white/20 text-white flex items-center justify-center font-bold text-sm">
                            {conv.initials}
                          </div>
                          <span
                            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white/20 ${presenceDot(conv.presence)}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h2 className="font-bold text-white text-sm truncate">
                              {conv.name}
                            </h2>
                            {conv.unread > 0 && (
                              <span className="bg-[#4D3AFF] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#a594ff] mt-0.5">{conv.skill}</p>
                          <p className="text-xs text-white/50 mt-1 truncate">
                            {conv.lastMessage}
                          </p>
                          <p className="text-xs text-white/30 mt-0.5">{conv.lastSeen}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* ZONE CHAT */}
            <section className="flex flex-col min-h-[620px]">
              {/* Header chat */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-[#4D3AFF]/60 border border-white/20 text-white flex items-center justify-center font-bold text-sm">
                      {activeConversation.initials}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white/20 ${presenceDot(activeConversation.presence)}`}
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-white">
                      {activeConversation.name}
                    </h2>
                    <p className="text-xs text-white/50">
                      {activeConversation.lastSeen}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block backdrop-blur-xs bg-[#4D3AFF]/30 border border-[#a594ff]/40 text-[#a594ff] px-4 py-1.5 rounded-full text-sm font-semibold">
                  Match : {activeConversation.skill}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-white/5">
                {activeConversation.messages.map((item, index) => {
                  const isMe = item.from === "me";
                  return (
                    <div
                      key={`${item.time}-${index}`}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] md:max-w-[60%] rounded-3xl px-5 py-4 ${
                          isMe
                            ? "bg-[#4D3AFF]/70 border border-[#a594ff]/30 text-white"
                            : "backdrop-blur-xs bg-white/15 border border-white/20 text-white"
                        }`}
                      >
                        <p>{item.text}</p>
                        {"document" in item && item.document && (
                          <div className="mt-3 rounded-2xl p-3 text-sm font-semibold bg-white/10 border border-white/20 text-white/80">
                            📎 {item.document}
                          </div>
                        )}
                        <p className="text-xs mt-2 text-white/40">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Formulaire message */}
              <div className="p-4 border-t border-white/10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="backdrop-blur-xs bg-white/10 border border-white/20 text-white/70 px-4 py-3 rounded-xl font-semibold text-center cursor-pointer hover:bg-white/15 hover:text-white transition text-sm">
                    📎 Document
                    <input type="file" className="hidden" />
                  </label>

                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Écrire un message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#a594ff]/60 transition"
                  />

                  <button
                    onClick={sendMessage}
                    className="backdrop-blur-xs bg-[#4D3AFF]/50 border border-[#a594ff]/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4D3AFF]/70 transition"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
