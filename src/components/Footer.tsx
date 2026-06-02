export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <img src="/logo-6you.jpeg" alt="SkillSwap" className="h-12 mb-4 bg-white rounded p-1" />
          <p className="text-gray-300">
            SkillSwap connecte les étudiants par leurs compétences.
          </p>
        </div>

        <div>
          <h4 className="text-[#DFB626] font-bold mb-3">Produit</h4>
          <p>Matching</p>
          <p>Sessions</p>
          <p>Badges</p>
        </div>

        <div>
          <h4 className="text-[#DFB626] font-bold mb-3">Profil</h4>
          <p>Mon compte</p>
          <p>Disponibilités</p>
          <p>Messages</p>
        </div>

        <div>
          <h4 className="text-[#DFB626] font-bold mb-3">Légal</h4>
          <p>CGU</p>
          <p>Confidentialité</p>
          <p>Contact</p>
        </div>
      </div>
    </footer>
  );
}