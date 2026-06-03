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
    lastMessage: "Je t’ai envoyé l’exercice React.",
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
        text: "Parfait, je t’ai envoyé l’exercice React.",
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
        text: "J’ai préparé une fiche SEO simple.",
        time: "09:20",
        document: "fiche-seo.docx",
      },
      {
        from: "me",
        text: "Merci, je regarde ça aujourd’hui.",
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

function presenceColor(presence: string) {
  if (presence === "online") return "bg-green-500";
  if (presence === "away") return "bg-yellow-400";
  return "bg-gray-400";
}

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [message, setMessage] = useState("");

  const activeConversation = useMemo(() => {
    return (
      conversations.find((conversation) => conversation.id === activeConversationId) ||
      conversations[0]
    );
  }, [activeConversationId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    alert("Message simulé côté front : " + message);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#F6F7FB] text-[#4A4A4A]">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-[#1800AD] font-bold">Messagerie interne</p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1800AD] mt-2">
          Échanger avec tes matchs
        </h1>

        <p className="mt-3 max-w-3xl">
          Discute avec les étudiants matchés, partage des cours ou exercices et
          suis les nouveaux messages.
        </p>

        <div className="mt-10 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden grid lg:grid-cols-[360px_1fr] min-h-[650px]">
          {/* LISTE CONVERSATIONS */}
          <aside className="border-r border-gray-100 bg-white">
            <div className="p-5 border-b border-gray-100">
              <input
                placeholder="Rechercher une conversation..."
                className="w-full bg-[#F6F7FB] border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none focus:border-[#1800AD]"
              />
            </div>

            <div className="divide-y divide-gray-100">
              {conversations.map((conversation) => {
                const active = conversation.id === activeConversationId;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveConversationId(conversation.id)}
                    className={`w-full text-left p-5 transition ${
                      active ? "bg-[#1800AD]/10" : "hover:bg-[#F6F7FB]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#1800AD] text-white flex items-center justify-center font-bold">
                          {conversation.initials}
                        </div>

                        <span
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${presenceColor(
                            conversation.presence
                          )}`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="font-bold text-[#1800AD]">
                            {conversation.name}
                          </h2>

                          {conversation.unread > 0 && (
                            <span className="bg-[#4D3AFF] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500">
                          {conversation.skill}
                        </p>

                        <p className="text-sm mt-1 line-clamp-1">
                          {conversation.lastMessage}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {conversation.lastSeen}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ZONE CHAT */}
          <section className="flex flex-col min-h-[650px]">
            {/* HEADER CHAT */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#1800AD] text-white flex items-center justify-center font-bold">
                    {activeConversation.initials}
                  </div>

                  <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${presenceColor(
                      activeConversation.presence
                    )}`}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#1800AD]">
                    {activeConversation.name}
                  </h2>
                  <p className="text-sm">{activeConversation.lastSeen}</p>
                </div>
              </div>

              <span className="hidden sm:inline-block bg-[#F6F7FB] text-[#1800AD] px-4 py-2 rounded-full text-sm font-semibold">
                Match : {activeConversation.skill}
              </span>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto bg-[#F6F7FB]">
              {activeConversation.messages.map((item, index) => {
                const isMe = item.from === "me";

                return (
                  <div
                    key={`${item.time}-${index}`}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[65%] rounded-3xl px-5 py-4 ${
                        isMe
                          ? "bg-[#1800AD] text-white"
                          : "bg-white text-[#4A4A4A] border border-gray-100"
                      }`}
                    >
                      <p>{item.text}</p>

                      {item.document && (
                        <div
                          className={`mt-3 rounded-2xl p-3 text-sm font-semibold ${
                            isMe
                              ? "bg-white/15 text-white"
                              : "bg-[#F6F7FB] text-[#1800AD]"
                          }`}
                        >
                          📎 {item.document}
                        </div>
                      )}

                      <p
                        className={`text-xs mt-2 ${
                          isMe ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FORMULAIRE MESSAGE */}
            <div className="p-5 border-t border-gray-100 bg-white">
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="border border-[#1800AD] text-[#1800AD] px-4 py-3 rounded-xl font-semibold text-center cursor-pointer hover:bg-[#1800AD] hover:text-white transition">
                  📎 Document
                  <input type="file" className="hidden" />
                </label>

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrire un message..."
                  className="flex-1 border border-[#E8E9F5] rounded-xl px-4 py-3 outline-none focus:border-[#1800AD]"
                />

                <button
                  onClick={sendMessage}
                  className="bg-[#1800AD] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4D3AFF] transition"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}