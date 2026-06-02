import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sessions = [
  { type: "Atelier", title: "Atelier React débutant", date: "Lundi 14h", lieu: "Salle B203", status: "Confirmé" },
  { type: "Cours rapide", title: "Canva pour présentation", date: "Jeudi 12h", lieu: "Visio", status: "Attente" },
  { type: "Club", title: "Club Agile & Scrum", date: "Vendredi 10h", lieu: "Salle projet", status: "Ouvert" },
];

export default function SessionsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-5 mb-10">
          <div>
            <p className="text-[#DFB626] font-bold">Gestion des sessions</p>
            <h1 className="text-5xl font-serif font-bold mt-2">Planifie tes échanges</h1>
            <p className="text-gray-600 mt-3">
              Ateliers, cours rapides et clubs thématiques entre étudiants.
            </p>
          </div>

          <button className="bg-black text-white px-6 py-4 rounded-xl h-fit">
            + Créer une session
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {["Ateliers", "Cours rapides", "Clubs thématiques"].map((item) => (
            <button key={item} className="border border-gray-200 rounded-3xl p-6 text-left hover:border-[#DFB626]">
              <h3 className="font-bold text-xl">{item}</h3>
              <p className="text-gray-600 mt-2">Organiser ou rejoindre</p>
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {sessions.map((session) => (
            <Link
              href="/profil"
              key={session.title}
              className="block border border-gray-200 rounded-3xl p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <div>
                  <span className="bg-[#DFB626] px-4 py-1 rounded-full text-sm">{session.type}</span>
                  <h3 className="text-2xl font-bold mt-4">{session.title}</h3>
                  <p className="text-gray-600">{session.date} · {session.lieu}</p>
                </div>

                <span className="bg-[#F5F5F5] px-5 py-3 rounded-full h-fit">
                  {session.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}