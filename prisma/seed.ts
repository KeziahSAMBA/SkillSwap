import { PrismaClient, SkillLevel, SkillType, MatchStatus, SessionType, SessionStatus, ChallengeStatus } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // ─── Nettoyage ────────────────────────────────────────────────────────────────
  await prisma.feedback.deleteMany()
  await prisma.recommendation.deleteMany()
  await prisma.feedPost.deleteMany()
  await prisma.challenge.deleteMany()
  await prisma.userBadge.deleteMany()
  await prisma.point.deleteMany()
  await prisma.sessionParticipant.deleteMany()
  await prisma.session.deleteMany()
  await prisma.match.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.userSkill.deleteMany()
  await prisma.badge.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash('Password123!', 10)

  // ─── Compétences ──────────────────────────────────────────────────────────────
  const skills = await Promise.all([
    // Programmation
    prisma.skill.create({ data: { name: 'JavaScript', category: 'Programmation' } }),
    prisma.skill.create({ data: { name: 'Python', category: 'Programmation' } }),
    prisma.skill.create({ data: { name: 'React', category: 'Programmation' } }),
    prisma.skill.create({ data: { name: 'Node.js', category: 'Programmation' } }),
    prisma.skill.create({ data: { name: 'SQL', category: 'Programmation' } }),
    prisma.skill.create({ data: { name: 'Java', category: 'Programmation' } }),
    prisma.skill.create({ data: { name: 'C++', category: 'Programmation' } }),
    // Design
    prisma.skill.create({ data: { name: 'Figma', category: 'Design' } }),
    prisma.skill.create({ data: { name: 'Illustrator', category: 'Design' } }),
    prisma.skill.create({ data: { name: 'UI/UX Design', category: 'Design' } }),
    // Langues
    prisma.skill.create({ data: { name: 'Anglais', category: 'Langues' } }),
    prisma.skill.create({ data: { name: 'Espagnol', category: 'Langues' } }),
    prisma.skill.create({ data: { name: 'Arabe', category: 'Langues' } }),
    prisma.skill.create({ data: { name: 'Allemand', category: 'Langues' } }),
    // Data / IA
    prisma.skill.create({ data: { name: 'Machine Learning', category: 'Data & IA' } }),
    prisma.skill.create({ data: { name: 'Data Analysis', category: 'Data & IA' } }),
    prisma.skill.create({ data: { name: 'Excel avancé', category: 'Data & IA' } }),
    // Autres
    prisma.skill.create({ data: { name: 'Gestion de projet', category: 'Management' } }),
    prisma.skill.create({ data: { name: 'Photographie', category: 'Créativité' } }),
    prisma.skill.create({ data: { name: 'Montage vidéo', category: 'Créativité' } }),
    prisma.skill.create({ data: { name: 'Musique', category: 'Arts' } }),
    prisma.skill.create({ data: { name: 'Marketing digital', category: 'Business' } }),
    prisma.skill.create({ data: { name: 'Comptabilité', category: 'Business' } }),
    prisma.skill.create({ data: { name: 'Cuisine', category: 'Vie pratique' } }),
    prisma.skill.create({ data: { name: 'Yoga', category: 'Bien-être' } }),
  ])

  const [
    skillJS, skillPython, skillReact, skillNode, skillSQL,
    skillJava, skillCpp, skillFigma, skillIllustrator, skillUiUx,
    skillAnglais, skillEspagnol, skillArabe, skillAllemand,
    skillML, skillDataAnalysis, skillExcel,
    skillProjMgmt, skillPhoto, skillVideo,
    skillMusique, skillMarketing, skillCompta, skillCuisine, skillYoga,
  ] = skills

  // ─── Badges ───────────────────────────────────────────────────────────────────
  const badges = await Promise.all([
    prisma.badge.create({ data: { name: 'Premier pas', description: 'A partagé sa première compétence', iconUrl: '/badges/first-step.svg' } }),
    prisma.badge.create({ data: { name: 'Mentor', description: 'A aidé 5 étudiants ou plus', iconUrl: '/badges/mentor.svg' } }),
    prisma.badge.create({ data: { name: 'Curieux', description: 'A appris 3 compétences différentes', iconUrl: '/badges/curious.svg' } }),
    prisma.badge.create({ data: { name: 'Expert', description: 'Niveau EXPERT dans au moins une compétence', iconUrl: '/badges/expert.svg' } }),
    prisma.badge.create({ data: { name: 'Sociable', description: 'A posté 10 fois sur le feed', iconUrl: '/badges/social.svg' } }),
    prisma.badge.create({ data: { name: 'Étoile montante', description: 'A obtenu 5 avis 5 étoiles', iconUrl: '/badges/rising-star.svg' } }),
    prisma.badge.create({ data: { name: 'Assidu', description: 'A participé à 10 sessions', iconUrl: '/badges/assiduous.svg' } }),
    prisma.badge.create({ data: { name: 'Polyglotte', description: 'Parle ou apprend 3 langues ou plus', iconUrl: '/badges/polyglot.svg' } }),
  ])
  const [badgePremierPas, badgeMentor, badgeCurieux, badgeExpert, badgeSociable, badgeEtoile, badgeAssidu, badgePolyglotte] = badges

  // ─── Étudiants ────────────────────────────────────────────────────────────────
  const usersData = [
    {
      name: 'Amara Diallo', email: 'amara.diallo@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=1',
      bio: 'Passionnée de data science et ML, je peux t\'aider à maîtriser Python et les bases de l\'intelligence artificielle.',
      teach: [{ skill: skillPython, level: SkillLevel.EXPERT }, { skill: skillML, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillFigma, level: SkillLevel.BEGINNER }, { skill: skillAnglais, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '11:00' },
        { dayOfWeek: 3, startTime: '14:00', endTime: '16:00' },
        { dayOfWeek: 5, startTime: '10:00', endTime: '12:00' },
      ],
    },
    {
      name: 'Lucas Martin', email: 'lucas.martin@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=2',
      bio: 'Développeur front-end React/JS avec 2 ans d\'expérience. J\'adore partager mes connaissances avec les débutants.',
      teach: [{ skill: skillReact, level: SkillLevel.ADVANCED }, { skill: skillJS, level: SkillLevel.EXPERT }],
      learn: [{ skill: skillML, level: SkillLevel.BEGINNER }, { skill: skillEspagnol, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 2, startTime: '18:00', endTime: '20:00' },
        { dayOfWeek: 4, startTime: '14:00', endTime: '16:00' },
      ],
    },
    {
      name: 'Fatou Ndiaye', email: 'fatou.ndiaye@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=5',
      bio: 'Designer UI/UX créative, spécialisée sur Figma. Je transforme vos idées en interfaces élégantes et accessibles.',
      teach: [{ skill: skillFigma, level: SkillLevel.EXPERT }, { skill: skillUiUx, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillJS, level: SkillLevel.BEGINNER }, { skill: skillSQL, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '14:00', endTime: '16:00' },
        { dayOfWeek: 3, startTime: '09:00', endTime: '11:00' },
        { dayOfWeek: 6, startTime: '10:00', endTime: '12:00' },
      ],
    },
    {
      name: 'Hugo Lefebvre', email: 'hugo.lefebvre@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=3',
      bio: 'Passionné par les bases de données et le back-end Java. Toujours partant pour un échange de compétences.',
      teach: [{ skill: skillSQL, level: SkillLevel.ADVANCED }, { skill: skillJava, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillReact, level: SkillLevel.BEGINNER }, { skill: skillMarketing, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 2, startTime: '12:00', endTime: '13:00' },
        { dayOfWeek: 5, startTime: '16:00', endTime: '18:00' },
      ],
    },
    {
      name: 'Sofia Perez', email: 'sofia.perez@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=9',
      bio: 'Native espagnole et experte en marketing digital. Je peux t\'aider à communiquer en espagnol ou à lancer ta première campagne.',
      teach: [{ skill: skillEspagnol, level: SkillLevel.EXPERT }, { skill: skillMarketing, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillPython, level: SkillLevel.INTERMEDIATE }, { skill: skillFigma, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '10:00', endTime: '12:00' },
        { dayOfWeek: 4, startTime: '17:00', endTime: '19:00' },
      ],
    },
    {
      name: 'Youssef El Amrani', email: 'youssef.elamrani@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=7',
      bio: 'Bilingue arabe-français, expert en comptabilité. Idéal si tu veux apprendre la gestion financière ou la langue arabe.',
      teach: [{ skill: skillArabe, level: SkillLevel.EXPERT }, { skill: skillCompta, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillJS, level: SkillLevel.INTERMEDIATE }, { skill: skillNode, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 3, startTime: '19:00', endTime: '21:00' },
        { dayOfWeek: 6, startTime: '09:00', endTime: '11:00' },
      ],
    },
    {
      name: 'Chloé Bernard', email: 'chloe.bernard@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=10',
      bio: 'Photographe et illustratrice passionnée. J\'enseigne la photo argentique et Illustrator avec plaisir.',
      teach: [{ skill: skillPhoto, level: SkillLevel.EXPERT }, { skill: skillIllustrator, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillPython, level: SkillLevel.BEGINNER }, { skill: skillProjMgmt, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 2, startTime: '15:00', endTime: '17:00' },
        { dayOfWeek: 5, startTime: '11:00', endTime: '13:00' },
      ],
    },
    {
      name: 'Kwame Asante', email: 'kwame.asante@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=12',
      bio: 'Anglophone natif et développeur JS en progression. Je propose des échanges langue contre code.',
      teach: [{ skill: skillAnglais, level: SkillLevel.EXPERT }, { skill: skillJS, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillSQL, level: SkillLevel.BEGINNER }, { skill: skillYoga, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' },
        { dayOfWeek: 3, startTime: '18:00', endTime: '20:00' },
        { dayOfWeek: 5, startTime: '08:00', endTime: '10:00' },
      ],
    },
    {
      name: 'Emma Dubois', email: 'emma.dubois@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=11',
      bio: 'Développeuse back-end Node.js et SQL. Je cherche à progresser en design et musique pour m\'épanouir autrement.',
      teach: [{ skill: skillNode, level: SkillLevel.ADVANCED }, { skill: skillSQL, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillFigma, level: SkillLevel.BEGINNER }, { skill: skillMusique, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 2, startTime: '09:00', endTime: '11:00' },
        { dayOfWeek: 4, startTime: '19:00', endTime: '21:00' },
      ],
    },
    {
      name: 'Rayan Boukhari', email: 'rayan.boukhari@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=13',
      bio: 'Développeur système C++/Java, amateur d\'algorithmique. Rigoureux et pédagogue, j\'aime expliquer les concepts bas niveau.',
      teach: [{ skill: skillCpp, level: SkillLevel.EXPERT }, { skill: skillJava, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillUiUx, level: SkillLevel.BEGINNER }, { skill: skillAnglais, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 1, startTime: '17:00', endTime: '19:00' },
        { dayOfWeek: 4, startTime: '09:00', endTime: '11:00' },
      ],
    },
    {
      name: 'Manon Girard', email: 'manon.girard@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=14',
      bio: 'Spécialiste Excel et comptabilité. Je peux t\'aider à automatiser tes tableaux et à comprendre les bases de la finance.',
      teach: [{ skill: skillExcel, level: SkillLevel.EXPERT }, { skill: skillCompta, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillMarketing, level: SkillLevel.BEGINNER }, { skill: skillVideo, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 3, startTime: '12:00', endTime: '14:00' },
        { dayOfWeek: 5, startTime: '17:00', endTime: '19:00' },
      ],
    },
    {
      name: 'Isaac Owusu', email: 'isaac.owusu@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=15',
      bio: 'Analyste de données avec une forte maîtrise d\'Excel et des outils statistiques. Je vulgarise la data pour tous.',
      teach: [{ skill: skillDataAnalysis, level: SkillLevel.ADVANCED }, { skill: skillExcel, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillReact, level: SkillLevel.BEGINNER }, { skill: skillCpp, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 2, startTime: '14:00', endTime: '16:00' },
        { dayOfWeek: 4, startTime: '11:00', endTime: '13:00' },
        { dayOfWeek: 6, startTime: '14:00', endTime: '16:00' },
      ],
    },
    {
      name: 'Léa Fontaine', email: 'lea.fontaine@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=16',
      bio: 'Musicienne et photographe, je donne des cours de piano et de composition. Curieuse de tout, j\'apprends aussi le code.',
      teach: [{ skill: skillMusique, level: SkillLevel.EXPERT }, { skill: skillPhoto, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillPython, level: SkillLevel.BEGINNER }, { skill: skillML, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '16:00', endTime: '18:00' },
        { dayOfWeek: 3, startTime: '10:00', endTime: '12:00' },
      ],
    },
    {
      name: 'Mehdi Haddad', email: 'mehdi.haddad@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=17',
      bio: 'Expert Python et ML, je travaille sur des projets de NLP et de vision par ordinateur. Disponible pour des échanges ciblés.',
      teach: [{ skill: skillML, level: SkillLevel.ADVANCED }, { skill: skillPython, level: SkillLevel.EXPERT }],
      learn: [{ skill: skillEspagnol, level: SkillLevel.BEGINNER }, { skill: skillCompta, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 2, startTime: '20:00', endTime: '22:00' },
        { dayOfWeek: 5, startTime: '14:00', endTime: '16:00' },
      ],
    },
    {
      name: 'Nina Rousseau', email: 'nina.rousseau@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=20',
      bio: 'Trilingue français-anglais-allemand, je propose des cours de langue structurés et adaptés à ton niveau.',
      teach: [{ skill: skillAllemand, level: SkillLevel.EXPERT }, { skill: skillAnglais, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillFigma, level: SkillLevel.INTERMEDIATE }, { skill: skillVideo, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '12:00', endTime: '14:00' },
        { dayOfWeek: 4, startTime: '16:00', endTime: '18:00' },
        { dayOfWeek: 6, startTime: '11:00', endTime: '13:00' },
      ],
    },
    {
      name: 'Tom Gauthier', email: 'tom.gauthier@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=18',
      bio: 'Vidéaste et photographe freelance. J\'enseigne la prise de vue, le montage Premiere Pro et la narration visuelle.',
      teach: [{ skill: skillVideo, level: SkillLevel.EXPERT }, { skill: skillPhoto, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillJS, level: SkillLevel.INTERMEDIATE }, { skill: skillDataAnalysis, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 3, startTime: '15:00', endTime: '17:00' },
        { dayOfWeek: 5, startTime: '09:00', endTime: '11:00' },
      ],
    },
    {
      name: 'Aicha Camara', email: 'aicha.camara@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=21',
      bio: 'Cuisinière passionnée et arabophone. J\'organise des ateliers cuisine et peux t\'initier à la culture et langue arabes.',
      teach: [{ skill: skillCuisine, level: SkillLevel.EXPERT }, { skill: skillArabe, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillPython, level: SkillLevel.BEGINNER }, { skill: skillExcel, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 2, startTime: '11:00', endTime: '13:00' },
        { dayOfWeek: 6, startTime: '15:00', endTime: '17:00' },
      ],
    },
    {
      name: 'Théo Marchand', email: 'theo.marchand@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=19',
      bio: 'Chef de projet certifié PMP. J\'aide les équipes à s\'organiser, prioriser et livrer. Curieux du machine learning.',
      teach: [{ skill: skillProjMgmt, level: SkillLevel.EXPERT }, { skill: skillMarketing, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillCpp, level: SkillLevel.BEGINNER }, { skill: skillML, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 1, startTime: '13:00', endTime: '15:00' },
        { dayOfWeek: 3, startTime: '17:00', endTime: '19:00' },
        { dayOfWeek: 5, startTime: '13:00', endTime: '15:00' },
      ],
    },
    {
      name: 'Jade Renard', email: 'jade.renard@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=22',
      bio: 'Illustratrice et designeuse UI. J\'utilise Illustrator et Figma au quotidien et j\'aime transmettre ma créativité.',
      teach: [{ skill: skillIllustrator, level: SkillLevel.ADVANCED }, { skill: skillUiUx, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillAnglais, level: SkillLevel.INTERMEDIATE }, { skill: skillSQL, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 2, startTime: '16:00', endTime: '18:00' },
        { dayOfWeek: 4, startTime: '10:00', endTime: '12:00' },
      ],
    },
    {
      name: 'Amine Benzara', email: 'amine.benzara@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=23',
      bio: 'Développeur Java/C++ avec une passion pour les algorithmes. Je propose des sessions d\'algorithmique et de programmation orientée objet.',
      teach: [{ skill: skillJava, level: SkillLevel.EXPERT }, { skill: skillCpp, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillReact, level: SkillLevel.INTERMEDIATE }, { skill: skillPhoto, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '19:00', endTime: '21:00' },
        { dayOfWeek: 4, startTime: '13:00', endTime: '15:00' },
      ],
    },
    {
      name: 'Camille Dupont', email: 'camille.dupont@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=24',
      bio: 'Professeure de yoga certifiée et passionnée de cuisine healthy. Je crois au bien-être comme moteur de la réussite.',
      teach: [{ skill: skillYoga, level: SkillLevel.ADVANCED }, { skill: skillCuisine, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillMarketing, level: SkillLevel.BEGINNER }, { skill: skillCompta, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 3, startTime: '07:00', endTime: '09:00' },
        { dayOfWeek: 6, startTime: '08:00', endTime: '10:00' },
      ],
    },
    {
      name: 'Sébastien Morel', email: 'sebastien.morel@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=25',
      bio: 'Fullstack React/Node.js avec 3 ans d\'XP en startup. Je coache les juniors sur l\'architecture et les bonnes pratiques.',
      teach: [{ skill: skillReact, level: SkillLevel.EXPERT }, { skill: skillNode, level: SkillLevel.EXPERT }],
      learn: [{ skill: skillAllemand, level: SkillLevel.BEGINNER }, { skill: skillMusique, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 2, startTime: '08:00', endTime: '10:00' },
        { dayOfWeek: 4, startTime: '20:00', endTime: '22:00' },
        { dayOfWeek: 6, startTime: '09:00', endTime: '11:00' },
      ],
    },
    {
      name: 'Priya Sharma', email: 'priya.sharma@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=26',
      bio: 'Data scientist spécialisée en analyse prédictive et ML. J\'adore rendre la data accessible à tous.',
      teach: [{ skill: skillDataAnalysis, level: SkillLevel.EXPERT }, { skill: skillML, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillFigma, level: SkillLevel.BEGINNER }, { skill: skillEspagnol, level: SkillLevel.INTERMEDIATE }],
      availabilities: [
        { dayOfWeek: 1, startTime: '11:00', endTime: '13:00' },
        { dayOfWeek: 3, startTime: '16:00', endTime: '18:00' },
      ],
    },
    {
      name: 'Noé Lambert', email: 'noe.lambert@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=27',
      bio: 'Spécialiste marketing et gestion de projet. J\'aide les porteurs de projets à structurer leur communication et leur roadmap.',
      teach: [{ skill: skillMarketing, level: SkillLevel.ADVANCED }, { skill: skillProjMgmt, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillPython, level: SkillLevel.INTERMEDIATE }, { skill: skillNode, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 2, startTime: '13:00', endTime: '15:00' },
        { dayOfWeek: 5, startTime: '18:00', endTime: '20:00' },
      ],
    },
    {
      name: 'Imani Okonkwo', email: 'imani.okonkwo@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=28',
      bio: 'Anglophone, photographe confirmée. Je propose des ateliers photo et des échanges langue-photo très enrichissants.',
      teach: [{ skill: skillAnglais, level: SkillLevel.EXPERT }, { skill: skillPhoto, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillSQL, level: SkillLevel.INTERMEDIATE }, { skill: skillYoga, level: SkillLevel.BEGINNER }],
      availabilities: [
        { dayOfWeek: 1, startTime: '15:00', endTime: '17:00' },
        { dayOfWeek: 4, startTime: '08:00', endTime: '10:00' },
        { dayOfWeek: 6, startTime: '13:00', endTime: '15:00' },
      ],
    },
  ]

  // ─── Création des utilisateurs ────────────────────────────────────────────────
  const createdUsers = []
  for (const data of usersData) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        photoUrl: data.photoUrl,
        bio: data.bio,
      },
    })

    for (const t of data.teach) {
      await prisma.userSkill.create({
        data: { userId: user.id, skillId: t.skill.id, level: t.level, type: SkillType.TEACH },
      })
    }
    for (const l of data.learn) {
      await prisma.userSkill.create({
        data: { userId: user.id, skillId: l.skill.id, level: l.level, type: SkillType.LEARN },
      })
    }

    await prisma.availability.createMany({
      data: data.availabilities.map((a) => ({ userId: user.id, ...a })),
    })

    createdUsers.push(user)
  }

  console.log(`✓ ${createdUsers.length} étudiants créés`)

  // ─── Matchs ───────────────────────────────────────────────────────────────────
  // Chaque utilisateur apparaît dans au moins un match (seeker ou helper)
  const matchesData = [
    { seekerId: createdUsers[2].id,  helperId: createdUsers[1].id,  skillId: skillJS.id,        status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[3].id,  helperId: createdUsers[21].id, skillId: skillReact.id,     status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[0].id,  helperId: createdUsers[2].id,  skillId: skillFigma.id,     status: MatchStatus.PENDING },
    { seekerId: createdUsers[1].id,  helperId: createdUsers[22].id, skillId: skillML.id,        status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[9].id,  helperId: createdUsers[2].id,  skillId: skillUiUx.id,      status: MatchStatus.PENDING },
    { seekerId: createdUsers[10].id, helperId: createdUsers[4].id,  skillId: skillMarketing.id, status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[6].id,  helperId: createdUsers[17].id, skillId: skillProjMgmt.id,  status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[8].id,  helperId: createdUsers[12].id, skillId: skillMusique.id,   status: MatchStatus.PENDING },
    { seekerId: createdUsers[5].id,  helperId: createdUsers[7].id,  skillId: skillAnglais.id,   status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[11].id, helperId: createdUsers[0].id,  skillId: skillPython.id,    status: MatchStatus.PENDING },
    { seekerId: createdUsers[14].id, helperId: createdUsers[2].id,  skillId: skillFigma.id,     status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[15].id, helperId: createdUsers[1].id,  skillId: skillJS.id,        status: MatchStatus.PENDING },
    { seekerId: createdUsers[13].id, helperId: createdUsers[4].id,  skillId: skillEspagnol.id,  status: MatchStatus.PENDING },
    { seekerId: createdUsers[16].id, helperId: createdUsers[0].id,  skillId: skillPython.id,    status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[18].id, helperId: createdUsers[7].id,  skillId: skillAnglais.id,   status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[19].id, helperId: createdUsers[21].id, skillId: skillReact.id,     status: MatchStatus.PENDING },
    { seekerId: createdUsers[20].id, helperId: createdUsers[4].id,  skillId: skillMarketing.id, status: MatchStatus.PENDING },
    { seekerId: createdUsers[23].id, helperId: createdUsers[22].id, skillId: skillPython.id,    status: MatchStatus.ACCEPTED },
    { seekerId: createdUsers[24].id, helperId: createdUsers[11].id, skillId: skillSQL.id,       status: MatchStatus.PENDING },
  ]

  for (const m of matchesData) {
    await prisma.match.create({ data: m })
  }

  console.log(`✓ ${matchesData.length} matchs créés`)

  // ─── Sessions ─────────────────────────────────────────────────────────────────
  const session1 = await prisma.session.create({
    data: { title: 'Atelier React pour débutants', type: SessionType.WORKSHOP, status: SessionStatus.DONE, scheduledAt: new Date('2026-05-10T10:00:00Z'), skillId: skillReact.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session1.id, userId: createdUsers[1].id },  // Lucas
      { sessionId: session1.id, userId: createdUsers[3].id },  // Hugo
      { sessionId: session1.id, userId: createdUsers[9].id },  // Rayan
      { sessionId: session1.id, userId: createdUsers[19].id }, // Amine
    ],
  })

  const session2 = await prisma.session.create({
    data: { title: 'Cours rapide Python & Data', type: SessionType.QUICK_COURSE, status: SessionStatus.DONE, scheduledAt: new Date('2026-05-15T14:00:00Z'), skillId: skillPython.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session2.id, userId: createdUsers[0].id },  // Amara
      { sessionId: session2.id, userId: createdUsers[12].id }, // Léa
      { sessionId: session2.id, userId: createdUsers[16].id }, // Aicha
      { sessionId: session2.id, userId: createdUsers[23].id }, // Noé
    ],
  })

  const session3 = await prisma.session.create({
    data: { title: 'Club Design — Figma & UI/UX', type: SessionType.CLUB, status: SessionStatus.PLANNED, scheduledAt: new Date('2026-06-10T09:00:00Z'), skillId: skillFigma.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session3.id, userId: createdUsers[2].id },  // Fatou
      { sessionId: session3.id, userId: createdUsers[0].id },  // Amara
      { sessionId: session3.id, userId: createdUsers[8].id },  // Emma
      { sessionId: session3.id, userId: createdUsers[18].id }, // Jade
    ],
  })

  const session4 = await prisma.session.create({
    data: { title: 'Atelier Marketing Digital', type: SessionType.WORKSHOP, status: SessionStatus.ONGOING, scheduledAt: new Date('2026-06-04T10:00:00Z'), skillId: skillMarketing.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session4.id, userId: createdUsers[4].id },  // Sofia
      { sessionId: session4.id, userId: createdUsers[10].id }, // Manon
      { sessionId: session4.id, userId: createdUsers[17].id }, // Théo
      { sessionId: session4.id, userId: createdUsers[23].id }, // Noé
      { sessionId: session4.id, userId: createdUsers[24].id }, // Imani
    ],
  })

  const session5 = await prisma.session.create({
    data: { title: 'Cours SQL & bases de données', type: SessionType.QUICK_COURSE, status: SessionStatus.PLANNED, scheduledAt: new Date('2026-06-12T14:00:00Z'), skillId: skillSQL.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session5.id, userId: createdUsers[3].id },  // Hugo
      { sessionId: session5.id, userId: createdUsers[6].id },  // Chloé
      { sessionId: session5.id, userId: createdUsers[19].id }, // Amine
    ],
  })

  const session6 = await prisma.session.create({
    data: { title: 'Club Machine Learning avancé', type: SessionType.CLUB, status: SessionStatus.PLANNED, scheduledAt: new Date('2026-06-18T18:00:00Z'), skillId: skillML.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session6.id, userId: createdUsers[13].id }, // Mehdi
      { sessionId: session6.id, userId: createdUsers[0].id },  // Amara
      { sessionId: session6.id, userId: createdUsers[1].id },  // Lucas
      { sessionId: session6.id, userId: createdUsers[22].id }, // Priya
      { sessionId: session6.id, userId: createdUsers[12].id }, // Léa
      { sessionId: session6.id, userId: createdUsers[16].id }, // Aicha
    ],
  })

  const session7 = await prisma.session.create({
    data: { title: 'Session Anglais — conversation', type: SessionType.WORKSHOP, status: SessionStatus.ONGOING, scheduledAt: new Date('2026-06-04T15:00:00Z'), skillId: skillAnglais.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session7.id, userId: createdUsers[7].id },  // Kwame
      { sessionId: session7.id, userId: createdUsers[9].id },  // Rayan
      { sessionId: session7.id, userId: createdUsers[14].id }, // Nina
      { sessionId: session7.id, userId: createdUsers[21].id }, // Sébastien
    ],
  })

  // Sessions supplémentaires (DONE) pour couvrir les utilisateurs sans session
  const session8 = await prisma.session.create({
    data: { title: 'Atelier Arabe pour voyageurs', type: SessionType.WORKSHOP, status: SessionStatus.DONE, scheduledAt: new Date('2026-05-20T10:00:00Z'), skillId: skillArabe.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session8.id, userId: createdUsers[5].id },  // Youssef
      { sessionId: session8.id, userId: createdUsers[8].id },  // Emma
      { sessionId: session8.id, userId: createdUsers[9].id },  // Rayan
      { sessionId: session8.id, userId: createdUsers[20].id }, // Camille
    ],
  })

  const session9 = await prisma.session.create({
    data: { title: 'Photographie argentique — initiation', type: SessionType.WORKSHOP, status: SessionStatus.DONE, scheduledAt: new Date('2026-05-22T14:00:00Z'), skillId: skillPhoto.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session9.id, userId: createdUsers[6].id },  // Chloé
      { sessionId: session9.id, userId: createdUsers[10].id }, // Manon
      { sessionId: session9.id, userId: createdUsers[15].id }, // Tom
      { sessionId: session9.id, userId: createdUsers[24].id }, // Imani
    ],
  })

  const session10 = await prisma.session.create({
    data: { title: 'Data Analysis avec Python', type: SessionType.QUICK_COURSE, status: SessionStatus.DONE, scheduledAt: new Date('2026-05-25T16:00:00Z'), skillId: skillDataAnalysis.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session10.id, userId: createdUsers[11].id }, // Isaac
      { sessionId: session10.id, userId: createdUsers[14].id }, // Nina
      { sessionId: session10.id, userId: createdUsers[18].id }, // Jade
      { sessionId: session10.id, userId: createdUsers[23].id }, // Noé
    ],
  })

  const session11 = await prisma.session.create({
    data: { title: 'Atelier Yoga & bien-être étudiant', type: SessionType.CLUB, status: SessionStatus.DONE, scheduledAt: new Date('2026-05-28T09:00:00Z'), skillId: skillYoga.id },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session11.id, userId: createdUsers[20].id }, // Camille
      { sessionId: session11.id, userId: createdUsers[11].id }, // Isaac
      { sessionId: session11.id, userId: createdUsers[17].id }, // Théo
      { sessionId: session11.id, userId: createdUsers[19].id }, // Amine
    ],
  })

  console.log('✓ 11 sessions créées')

  // ─── Feedbacks — au moins 1 reçu par chacun des 25 utilisateurs ──────────────
  await prisma.feedback.createMany({
    data: [
      // Lucas [1] ← session1
      { giverId: createdUsers[3].id,  receiverId: createdUsers[1].id,  sessionId: session1.id, rating: 5, comment: 'Excellent cours, très clair !' },
      { giverId: createdUsers[9].id,  receiverId: createdUsers[1].id,  sessionId: session1.id, rating: 4, comment: "Bien expliqué, j'ai tout compris." },
      { giverId: createdUsers[19].id, receiverId: createdUsers[1].id,  sessionId: session1.id, rating: 5, comment: 'Lucas explique avec beaucoup de patience.' },
      // Amara [0] ← session2
      { giverId: createdUsers[12].id, receiverId: createdUsers[0].id,  sessionId: session2.id, rating: 5, comment: 'Amara est une vraie pédagogue.' },
      { giverId: createdUsers[16].id, receiverId: createdUsers[0].id,  sessionId: session2.id, rating: 4, comment: 'Très utile pour débuter en Python.' },
      { giverId: createdUsers[23].id, receiverId: createdUsers[0].id,  sessionId: session2.id, rating: 5, comment: 'Session super bien structurée, merci Amara !' },
      // Fatou [2] ← session3
      { giverId: createdUsers[0].id,  receiverId: createdUsers[2].id,  sessionId: session3.id, rating: 5, comment: 'Fatou maîtrise Figma à la perfection !' },
      { giverId: createdUsers[8].id,  receiverId: createdUsers[2].id,  sessionId: session3.id, rating: 4, comment: 'Bonne session, astuces très pratiques.' },
      { giverId: createdUsers[18].id, receiverId: createdUsers[2].id,  sessionId: session3.id, rating: 5, comment: "J'ai appris plus en 1h qu'en 1 semaine seule !" },
      // Hugo [3] ← session1
      { giverId: createdUsers[1].id,  receiverId: createdUsers[3].id,  sessionId: session1.id, rating: 4, comment: 'Hugo pose de très bonnes questions, bon niveau.' },
      { giverId: createdUsers[9].id,  receiverId: createdUsers[3].id,  sessionId: session1.id, rating: 4, comment: 'Sérieux et impliqué dans les exercices.' },
      // Sofia [4] ← session4
      { giverId: createdUsers[10].id, receiverId: createdUsers[4].id,  sessionId: session4.id, rating: 5, comment: "Sofia est passionnante, j'ai adoré cet atelier !" },
      { giverId: createdUsers[17].id, receiverId: createdUsers[4].id,  sessionId: session4.id, rating: 4, comment: "Plein d'outils concrets et actionnables." },
      { giverId: createdUsers[24].id, receiverId: createdUsers[4].id,  sessionId: session4.id, rating: 5, comment: "La meilleure intro au marketing que j'ai eue." },
      // Youssef [5] ← session8
      { giverId: createdUsers[8].id,  receiverId: createdUsers[5].id,  sessionId: session8.id, rating: 5, comment: 'Youssef enseigne l\'arabe avec beaucoup de bienveillance.' },
      { giverId: createdUsers[9].id,  receiverId: createdUsers[5].id,  sessionId: session8.id, rating: 4, comment: 'Pédagogie claire, exercices bien choisis.' },
      { giverId: createdUsers[20].id, receiverId: createdUsers[5].id,  sessionId: session8.id, rating: 5, comment: 'J\'ai appris les bases en une seule session !' },
      // Chloé [6] ← session9
      { giverId: createdUsers[10].id, receiverId: createdUsers[6].id,  sessionId: session9.id, rating: 5, comment: 'Chloé a un regard artistique incroyable, très inspirant.' },
      { giverId: createdUsers[15].id, receiverId: createdUsers[6].id,  sessionId: session9.id, rating: 4, comment: 'Excellente intro à la photo argentique.' },
      { giverId: createdUsers[24].id, receiverId: createdUsers[6].id,  sessionId: session9.id, rating: 5, comment: 'J\'ai adoré apprendre la technique argentique !' },
      // Kwame [7] ← session7
      { giverId: createdUsers[9].id,  receiverId: createdUsers[7].id,  sessionId: session7.id, rating: 5, comment: 'Kwame met vraiment à l\'aise pour parler anglais.' },
      { giverId: createdUsers[14].id, receiverId: createdUsers[7].id,  sessionId: session7.id, rating: 5, comment: 'Excellent accent, beaucoup de vocabulaire appris !' },
      { giverId: createdUsers[21].id, receiverId: createdUsers[7].id,  sessionId: session7.id, rating: 4, comment: 'Session dynamique et bienveillante.' },
      // Emma [8] ← session8
      { giverId: createdUsers[5].id,  receiverId: createdUsers[8].id,  sessionId: session8.id, rating: 4, comment: 'Emma est très attentive et progresse vite.' },
      { giverId: createdUsers[20].id, receiverId: createdUsers[8].id,  sessionId: session8.id, rating: 5, comment: 'Bonne énergie et vraiment motivée, super participante.' },
      // Rayan [9] ← session8
      { giverId: createdUsers[5].id,  receiverId: createdUsers[9].id,  sessionId: session8.id, rating: 5, comment: 'Rayan est rigoureux et appliqué, excellent.' },
      { giverId: createdUsers[8].id,  receiverId: createdUsers[9].id,  sessionId: session8.id, rating: 4, comment: 'Très bon niveau, questions pertinentes.' },
      // Manon [10] ← session9
      { giverId: createdUsers[6].id,  receiverId: createdUsers[10].id, sessionId: session9.id, rating: 4, comment: 'Manon a un bel œil pour la composition.' },
      { giverId: createdUsers[15].id, receiverId: createdUsers[10].id, sessionId: session9.id, rating: 5, comment: 'Très créative, j\'ai adoré travailler avec elle.' },
      // Isaac [11] ← session10
      { giverId: createdUsers[14].id, receiverId: createdUsers[11].id, sessionId: session10.id, rating: 5, comment: 'Isaac vulgarise la data de façon brillante.' },
      { giverId: createdUsers[18].id, receiverId: createdUsers[11].id, sessionId: session10.id, rating: 4, comment: 'Contenu dense mais très bien expliqué.' },
      { giverId: createdUsers[23].id, receiverId: createdUsers[11].id, sessionId: session10.id, rating: 5, comment: 'Enfin je comprends les statistiques descriptives !' },
      // Léa [12] ← session2
      { giverId: createdUsers[0].id,  receiverId: createdUsers[12].id, sessionId: session2.id, rating: 5, comment: 'Léa est très sérieuse et assimile vite.' },
      { giverId: createdUsers[16].id, receiverId: createdUsers[12].id, sessionId: session2.id, rating: 4, comment: 'Bonne participation, questions de qualité.' },
      // Mehdi [13] ← session6
      { giverId: createdUsers[0].id,  receiverId: createdUsers[13].id, sessionId: session6.id, rating: 5, comment: 'Mehdi explique le ML avec une clarté remarquable.' },
      { giverId: createdUsers[1].id,  receiverId: createdUsers[13].id, sessionId: session6.id, rating: 5, comment: 'Contenu dense mais très bien structuré.' },
      { giverId: createdUsers[22].id, receiverId: createdUsers[13].id, sessionId: session6.id, rating: 4, comment: 'Des exemples concrets, j\'ai vraiment progressé.' },
      // Nina [14] ← session10
      { giverId: createdUsers[11].id, receiverId: createdUsers[14].id, sessionId: session10.id, rating: 5, comment: 'Nina apporte une rigueur analytique appréciable.' },
      { giverId: createdUsers[18].id, receiverId: createdUsers[14].id, sessionId: session10.id, rating: 4, comment: 'Très bonne participante, analyse fine des données.' },
      // Tom [15] ← session9
      { giverId: createdUsers[6].id,  receiverId: createdUsers[15].id, sessionId: session9.id, rating: 5, comment: 'Tom a un œil de vidéaste, ses conseils photo sont top !' },
      { giverId: createdUsers[10].id, receiverId: createdUsers[15].id, sessionId: session9.id, rating: 4, comment: 'Très expérimenté, apporte beaucoup au groupe.' },
      // Aicha [16] ← session2
      { giverId: createdUsers[12].id, receiverId: createdUsers[16].id, sessionId: session2.id, rating: 4, comment: 'Aicha est curieuse et avance rapidement.' },
      { giverId: createdUsers[23].id, receiverId: createdUsers[16].id, sessionId: session2.id, rating: 5, comment: 'Très agréable en session, toujours souriante et motivée.' },
      // Théo [17] ← session11
      { giverId: createdUsers[11].id, receiverId: createdUsers[17].id, sessionId: session11.id, rating: 5, comment: 'Théo structure ses idées de façon remarquable.' },
      { giverId: createdUsers[19].id, receiverId: createdUsers[17].id, sessionId: session11.id, rating: 4, comment: 'Vision projet très claire, bon leader.' },
      { giverId: createdUsers[20].id, receiverId: createdUsers[17].id, sessionId: session11.id, rating: 5, comment: 'Théo sait motiver et organiser le groupe.' },
      // Jade [18] ← session10
      { giverId: createdUsers[11].id, receiverId: createdUsers[18].id, sessionId: session10.id, rating: 4, comment: 'Jade a un regard artistique qui enrichit les échanges.' },
      { giverId: createdUsers[23].id, receiverId: createdUsers[18].id, sessionId: session10.id, rating: 5, comment: 'Créative et précise, j\'ai adoré ses retours visuels.' },
      // Amine [19] ← session11
      { giverId: createdUsers[17].id, receiverId: createdUsers[19].id, sessionId: session11.id, rating: 5, comment: 'Amine maîtrise les algos avec une facilité impressionnante.' },
      { giverId: createdUsers[20].id, receiverId: createdUsers[19].id, sessionId: session11.id, rating: 4, comment: 'Très pédagogue pour expliquer les concepts bas niveau.' },
      // Camille [20] ← session8
      { giverId: createdUsers[5].id,  receiverId: createdUsers[20].id, sessionId: session8.id, rating: 5, comment: 'Camille apporte une énergie positive incroyable.' },
      { giverId: createdUsers[9].id,  receiverId: createdUsers[20].id, sessionId: session8.id, rating: 4, comment: 'Sa vision bien-être est vraiment inspirante.' },
      // Sébastien [21] ← session6
      { giverId: createdUsers[0].id,  receiverId: createdUsers[21].id, sessionId: session6.id, rating: 5, comment: 'Sébastien est un mentor incroyable, toujours disponible.' },
      { giverId: createdUsers[12].id, receiverId: createdUsers[21].id, sessionId: session6.id, rating: 5, comment: "Fullstack king ! J'ai tout appris avec lui." },
      { giverId: createdUsers[1].id,  receiverId: createdUsers[21].id, sessionId: session6.id, rating: 5, comment: 'Le meilleur expert React/Node que j\'aie rencontré.' },
      // Priya [22] ← session6
      { giverId: createdUsers[1].id,  receiverId: createdUsers[22].id, sessionId: session6.id, rating: 4, comment: 'Priya apporte une rigueur scientifique appréciable.' },
      { giverId: createdUsers[16].id, receiverId: createdUsers[22].id, sessionId: session6.id, rating: 5, comment: 'Super présentation des concepts data !' },
      { giverId: createdUsers[13].id, receiverId: createdUsers[22].id, sessionId: session6.id, rating: 5, comment: 'Priya est vraiment à la pointe sur la data science.' },
      // Noé [23] ← session10
      { giverId: createdUsers[11].id, receiverId: createdUsers[23].id, sessionId: session10.id, rating: 4, comment: 'Noé pose les bonnes questions, bon esprit d\'analyse.' },
      { giverId: createdUsers[14].id, receiverId: createdUsers[23].id, sessionId: session10.id, rating: 5, comment: 'Très investi, vrai sens de la communication.' },
      // Imani [24] ← session9
      { giverId: createdUsers[6].id,  receiverId: createdUsers[24].id, sessionId: session9.id, rating: 5, comment: 'Imani a un talent naturel pour la photo, bluffant !' },
      { giverId: createdUsers[15].id, receiverId: createdUsers[24].id, sessionId: session9.id, rating: 4, comment: 'Bon œil, beaucoup de sensibilité dans ses clichés.' },
    ],
  })

  console.log('✓ 60 feedbacks créés — tous les 25 utilisateurs ont au moins 1 avis reçu')

  // ─── Points — 1 entrée minimum par utilisateur ────────────────────────────────
  await prisma.point.createMany({
    data: [
      { userId: createdUsers[0].id,  amount: 120, description: 'Animation cours Python' },
      { userId: createdUsers[1].id,  amount: 150, description: 'Animation atelier React' },
      { userId: createdUsers[2].id,  amount: 90,  description: 'Partage compétences Figma' },
      { userId: createdUsers[3].id,  amount: 60,  description: 'Participation session SQL' },
      { userId: createdUsers[4].id,  amount: 80,  description: 'Aide en Marketing' },
      { userId: createdUsers[5].id,  amount: 70,  description: 'Atelier Arabe animé' },
      { userId: createdUsers[6].id,  amount: 65,  description: 'Cours Photo argentique' },
      { userId: createdUsers[7].id,  amount: 75,  description: 'Session Anglais animée' },
      { userId: createdUsers[8].id,  amount: 50,  description: 'Participation active sessions' },
      { userId: createdUsers[9].id,  amount: 55,  description: 'Participation sessions React & Anglais' },
      { userId: createdUsers[10].id, amount: 45,  description: 'Participation sessions Marketing & Photo' },
      { userId: createdUsers[11].id, amount: 85,  description: 'Animation Data Analysis' },
      { userId: createdUsers[12].id, amount: 40,  description: 'Participation sessions Python & ML' },
      { userId: createdUsers[13].id, amount: 110, description: 'Animation club ML' },
      { userId: createdUsers[14].id, amount: 60,  description: 'Participation sessions Anglais & Data' },
      { userId: createdUsers[15].id, amount: 50,  description: 'Partage expertise vidéo' },
      { userId: createdUsers[16].id, amount: 45,  description: 'Atelier Cuisine animé' },
      { userId: createdUsers[17].id, amount: 55,  description: 'Participation sessions Marketing & Yoga' },
      { userId: createdUsers[18].id, amount: 40,  description: 'Participation sessions Design & Data' },
      { userId: createdUsers[19].id, amount: 60,  description: 'Participation sessions React & Yoga' },
      { userId: createdUsers[20].id, amount: 75,  description: 'Animation atelier Yoga' },
      { userId: createdUsers[21].id, amount: 200, description: 'Expert React & Node.js' },
      { userId: createdUsers[22].id, amount: 170, description: 'Expert Data Analysis & ML' },
      { userId: createdUsers[23].id, amount: 50,  description: 'Participation sessions Python & Data' },
      { userId: createdUsers[24].id, amount: 55,  description: 'Partage expertise photo' },
    ],
  })

  // ─── Badges — 1 badge minimum par utilisateur ────────────────────────────────
  await prisma.userBadge.createMany({
    data: [
      { userId: createdUsers[0].id,  badgeId: badgeExpert.id },
      { userId: createdUsers[0].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[0].id,  badgeId: badgeEtoile.id },
      { userId: createdUsers[1].id,  badgeId: badgeMentor.id },
      { userId: createdUsers[1].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[1].id,  badgeId: badgeEtoile.id },
      { userId: createdUsers[1].id,  badgeId: badgeAssidu.id },
      { userId: createdUsers[2].id,  badgeId: badgeExpert.id },
      { userId: createdUsers[2].id,  badgeId: badgeMentor.id },
      { userId: createdUsers[2].id,  badgeId: badgeEtoile.id },
      { userId: createdUsers[3].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[4].id,  badgeId: badgeEtoile.id },
      { userId: createdUsers[4].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[5].id,  badgeId: badgePolyglotte.id },
      { userId: createdUsers[5].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[6].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[6].id,  badgeId: badgeCurieux.id },
      { userId: createdUsers[7].id,  badgeId: badgePolyglotte.id },
      { userId: createdUsers[7].id,  badgeId: badgeCurieux.id },
      { userId: createdUsers[8].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[9].id,  badgeId: badgeExpert.id },
      { userId: createdUsers[9].id,  badgeId: badgePremierPas.id },
      { userId: createdUsers[10].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[10].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[11].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[11].id, badgeId: badgeAssidu.id },
      { userId: createdUsers[12].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[12].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[13].id, badgeId: badgeExpert.id },
      { userId: createdUsers[13].id, badgeId: badgeAssidu.id },
      { userId: createdUsers[14].id, badgeId: badgePolyglotte.id },
      { userId: createdUsers[14].id, badgeId: badgeExpert.id },
      { userId: createdUsers[15].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[15].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[16].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[17].id, badgeId: badgeSociable.id },
      { userId: createdUsers[17].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[18].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[18].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[19].id, badgeId: badgeExpert.id },
      { userId: createdUsers[19].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[20].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[20].id, badgeId: badgeAssidu.id },
      { userId: createdUsers[21].id, badgeId: badgeExpert.id },
      { userId: createdUsers[21].id, badgeId: badgeMentor.id },
      { userId: createdUsers[21].id, badgeId: badgeAssidu.id },
      { userId: createdUsers[22].id, badgeId: badgeCurieux.id },
      { userId: createdUsers[22].id, badgeId: badgeExpert.id },
      { userId: createdUsers[23].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[23].id, badgeId: badgeSociable.id },
      { userId: createdUsers[24].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[24].id, badgeId: badgeSociable.id },
    ],
  })

  console.log('✓ Points et badges attribués — tous les 25 utilisateurs couverts')

  // ─── Défis — 1 défi minimum par utilisateur (challenger ou challenged) ────────
  await prisma.challenge.createMany({
    data: [
      { challengerId: createdUsers[1].id,  challengedId: createdUsers[21].id, description: 'Crée une app React complète en 48h',              status: ChallengeStatus.ACCEPTED },
      { challengerId: createdUsers[0].id,  challengedId: createdUsers[13].id, description: 'Développe un modèle ML avec 90% de précision',    status: ChallengeStatus.OPEN },
      { challengerId: createdUsers[4].id,  challengedId: createdUsers[23].id, description: 'Lance une campagne marketing en 1 semaine',       status: ChallengeStatus.COMPLETED },
      { challengerId: createdUsers[2].id,  challengedId: createdUsers[18].id, description: 'Crée un prototype Figma complet en 3 jours',      status: ChallengeStatus.ACCEPTED },
      { challengerId: createdUsers[5].id,  challengedId: createdUsers[14].id, description: 'Apprends 50 mots d\'arabe en 1 semaine',          status: ChallengeStatus.OPEN },
      { challengerId: createdUsers[7].id,  challengedId: createdUsers[9].id,  description: 'Passe le niveau B2 en anglais ce mois-ci',        status: ChallengeStatus.ACCEPTED },
      { challengerId: createdUsers[3].id,  challengedId: createdUsers[11].id, description: 'Optimise une requête SQL complexe en moins d\'1h', status: ChallengeStatus.COMPLETED },
      { challengerId: createdUsers[22].id, challengedId: createdUsers[16].id, description: 'Analyse un dataset de 10k lignes en 2h',          status: ChallengeStatus.OPEN },
      { challengerId: createdUsers[12].id, challengedId: createdUsers[8].id,  description: 'Compose une mélodie originale en 48h',            status: ChallengeStatus.ACCEPTED },
      { challengerId: createdUsers[17].id, challengedId: createdUsers[20].id, description: 'Crée un plan de projet complet pour un événement', status: ChallengeStatus.OPEN },
      { challengerId: createdUsers[6].id,  challengedId: createdUsers[15].id, description: 'Réalise un court-métrage photo en noir & blanc',   status: ChallengeStatus.COMPLETED },
      { challengerId: createdUsers[19].id, challengedId: createdUsers[10].id, description: 'Implémente un algorithme de tri en Java',          status: ChallengeStatus.OPEN },
      { challengerId: createdUsers[24].id, challengedId: createdUsers[7].id,  description: 'Fais une séance photo de portrait en 1h',          status: ChallengeStatus.ACCEPTED },
    ],
  })

  console.log('✓ 13 défis créés — tous les 25 utilisateurs impliqués')

  // ─── Posts Feed — 1 post minimum par utilisateur ─────────────────────────────
  await prisma.feedPost.createMany({
    data: [
      { authorId: createdUsers[0].id,  content: "Nouveau cours Python & Data Science disponible ! On voit les bases de pandas et matplotlib.",                   createdAt: new Date('2026-05-12T14:00:00Z') },
      { authorId: createdUsers[1].id,  content: "Je donne un atelier React ce samedi ! Rejoignez-moi si vous voulez débuter.",                                   createdAt: new Date('2026-05-08T10:00:00Z') },
      { authorId: createdUsers[2].id,  content: "Cherche quelqu'un pour m'apprendre le JS en échange de cours Figma. DM bienvenu !",                             createdAt: new Date('2026-05-18T09:00:00Z') },
      { authorId: createdUsers[3].id,  content: "Progresser en React c'est possible même en partant de zéro. Merci Lucas pour ce super atelier !",               createdAt: new Date('2026-05-11T15:00:00Z') },
      { authorId: createdUsers[4].id,  content: "Le marketing digital c'est pas sorcier. Je peux vous montrer comment créer votre première campagne.",            createdAt: new Date('2026-05-20T11:00:00Z') },
      { authorId: createdUsers[5].id,  content: "L'arabe est une langue magnifique. Je propose des initiations gratuites le week-end, venez nombreux !",          createdAt: new Date('2026-05-21T09:30:00Z') },
      { authorId: createdUsers[6].id,  content: "La photo argentique revient en force ! J'organise un atelier pratique très bientôt.",                            createdAt: new Date('2026-05-22T16:00:00Z') },
      { authorId: createdUsers[7].id,  content: "Speak English every day — même 10 minutes suffisent. Je peux vous aider à progresser en conversation !",         createdAt: new Date('2026-05-19T08:00:00Z') },
      { authorId: createdUsers[8].id,  content: "Node.js + Express = une API en 30 minutes. Je cherche quelqu'un pour m'enseigner le design en échange.",         createdAt: new Date('2026-05-23T12:00:00Z') },
      { authorId: createdUsers[9].id,  content: "Le C++ c'est dur mais tellement gratifiant quand ça compile enfin ! Dispo pour des échanges algorithmique.",     createdAt: new Date('2026-05-17T18:00:00Z') },
      { authorId: createdUsers[10].id, content: "Excel peut vraiment changer votre vie étudiante. Je cherche quelqu'un pour m'apprendre le montage vidéo.",       createdAt: new Date('2026-05-24T14:30:00Z') },
      { authorId: createdUsers[11].id, content: "Nouvelle session Data Analysis ce mercredi ! On plonge dans les stats descriptives avec des cas réels.",          createdAt: new Date('2026-05-25T10:00:00Z') },
      { authorId: createdUsers[12].id, content: "La musique est un langage universel. Je donne des cours de piano pour tous niveaux, n'hésitez pas !",             createdAt: new Date('2026-05-26T17:00:00Z') },
      { authorId: createdUsers[13].id, content: "Le NLP avance à grande vitesse. Mon nouveau projet de classification de texte tourne à 94% de précision !",      createdAt: new Date('2026-05-27T20:00:00Z') },
      { authorId: createdUsers[14].id, content: "Je cherche quelqu'un pour m'aider en Figma. En échange je peux enseigner l'allemand ou l'anglais.",               createdAt: new Date('2026-05-28T08:30:00Z') },
      { authorId: createdUsers[15].id, content: "La lumière naturelle est le meilleur outil du photographe. Atelier outdoor ce dimanche, places limitées !",      createdAt: new Date('2026-05-29T11:00:00Z') },
      { authorId: createdUsers[16].id, content: "Atelier cuisine du monde ce samedi ! Au menu : tajine marocain et baklawa. Tout le monde est le bienvenu.",       createdAt: new Date('2026-05-30T09:00:00Z') },
      { authorId: createdUsers[17].id, content: "La gestion de projet, c'est avant tout de la communication. Je partage mes méthodes agile cette semaine.",        createdAt: new Date('2026-05-31T13:00:00Z') },
      { authorId: createdUsers[18].id, content: "Nouveau projet Illustrator terminé ! Disponible pour des échanges créatifs — je cherche à progresser en SQL.",    createdAt: new Date('2026-06-01T15:00:00Z') },
      { authorId: createdUsers[19].id, content: "Algorithmique avancée en Java : j'organise des sessions de practice pour interviews techniques. Intéressés ?",   createdAt: new Date('2026-06-01T19:00:00Z') },
      { authorId: createdUsers[20].id, content: "Le yoga du matin change tout ! Je propose une session découverte gratuite mercredi à 7h. Qui est partant ?",      createdAt: new Date('2026-06-02T07:30:00Z') },
      { authorId: createdUsers[21].id, content: "React + Node.js = stack parfaite pour débuter en fullstack. N'hésitez pas à me contacter !",                     createdAt: new Date('2026-05-25T16:00:00Z') },
      { authorId: createdUsers[22].id, content: "Fini mon projet de Data Analysis sur les tendances étudiantes. Très satisfaite des résultats !",                  createdAt: new Date('2026-05-30T17:00:00Z') },
      { authorId: createdUsers[23].id, content: "Le marketing de contenu, c'est ma passion. Je partage mes meilleurs tips cette semaine sur le feed !",            createdAt: new Date('2026-06-02T10:00:00Z') },
      { authorId: createdUsers[24].id, content: "Shooting photo portrait demain au campus ! Je cherche des volontaires pour des portraits étudiants authentiques.", createdAt: new Date('2026-06-03T14:00:00Z') },
    ],
  })

  console.log('✓ 25 posts feed créés — 1 par utilisateur')

  // ─── Recommandations — 1 reçue minimum par utilisateur ───────────────────────
  await prisma.recommendation.createMany({
    data: [
      { recommenderId: createdUsers[12].id, recommendedId: createdUsers[0].id,  content: "Amara maîtrise parfaitement Python. J'ai tout appris grâce à elle.",                    createdAt: new Date('2026-05-16T10:00:00Z') },
      { recommenderId: createdUsers[3].id,  recommendedId: createdUsers[1].id,  content: "Lucas est un excellent prof de React, patient et très pédagogue !",                      createdAt: new Date('2026-05-11T12:00:00Z') },
      { recommenderId: createdUsers[17].id, recommendedId: createdUsers[2].id,  content: "Fatou a un vrai talent pour expliquer le design. Je recommande vivement !",              createdAt: new Date('2026-05-22T15:00:00Z') },
      { recommenderId: createdUsers[1].id,  recommendedId: createdUsers[3].id,  content: "Hugo est rigoureux et progresse très vite, c'est un plaisir de travailler avec lui.",    createdAt: new Date('2026-05-12T09:00:00Z') },
      { recommenderId: createdUsers[10].id, recommendedId: createdUsers[4].id,  content: "Sofia rend le marketing accessible à tous, une vraie qualité pédagogique !",             createdAt: new Date('2026-05-21T11:00:00Z') },
      { recommenderId: createdUsers[9].id,  recommendedId: createdUsers[5].id,  content: "Youssef m'a ouvert les portes de la langue arabe. Cours structurés et bienveillants.",   createdAt: new Date('2026-05-21T14:00:00Z') },
      { recommenderId: createdUsers[15].id, recommendedId: createdUsers[6].id,  content: "Chloé est une photographe talentueuse et une super formatrice !",                        createdAt: new Date('2026-05-23T10:00:00Z') },
      { recommenderId: createdUsers[14].id, recommendedId: createdUsers[7].id,  content: "Avec Kwame on progresse en anglais naturellement, sans stress. Top !",                  createdAt: new Date('2026-05-20T08:00:00Z') },
      { recommenderId: createdUsers[2].id,  recommendedId: createdUsers[8].id,  content: "Emma est une développeuse back-end solide et très pédagogue sur Node.js.",               createdAt: new Date('2026-05-24T13:00:00Z') },
      { recommenderId: createdUsers[7].id,  recommendedId: createdUsers[9].id,  content: "Rayan est passionné par l'algorithmique, ses explications C++ sont cristallines.",       createdAt: new Date('2026-05-18T17:00:00Z') },
      { recommenderId: createdUsers[6].id,  recommendedId: createdUsers[10].id, content: "Manon maîtrise Excel comme personne, elle simplifie des problèmes complexes.",           createdAt: new Date('2026-05-24T16:00:00Z') },
      { recommenderId: createdUsers[14].id, recommendedId: createdUsers[11].id, content: "Isaac rend la data accessible à tous, un vrai don de pédagogie !",                       createdAt: new Date('2026-05-26T11:00:00Z') },
      { recommenderId: createdUsers[8].id,  recommendedId: createdUsers[12].id, content: "Léa joue de la musique avec une sensibilité rare et enseigne avec passion.",             createdAt: new Date('2026-05-27T15:00:00Z') },
      { recommenderId: createdUsers[22].id, recommendedId: createdUsers[13].id, content: "Mehdi est l'un des meilleurs experts ML que j'aie rencontrés, indispensable !",          createdAt: new Date('2026-05-28T10:00:00Z') },
      { recommenderId: createdUsers[5].id,  recommendedId: createdUsers[14].id, content: "Nina parle trois langues couramment et enseigne avec méthode et douceur.",               createdAt: new Date('2026-05-29T09:00:00Z') },
      { recommenderId: createdUsers[10].id, recommendedId: createdUsers[15].id, content: "Tom a un œil de pro pour la vidéo et la photo, ses conseils sont précieux.",             createdAt: new Date('2026-05-30T10:00:00Z') },
      { recommenderId: createdUsers[23].id, recommendedId: createdUsers[16].id, content: "Aicha cuisine avec le cœur et partage sa culture avec une générosité touchante.",        createdAt: new Date('2026-05-31T11:00:00Z') },
      { recommenderId: createdUsers[20].id, recommendedId: createdUsers[17].id, content: "Théo est un chef de projet né, il structure tout avec clarté et efficacité.",            createdAt: new Date('2026-06-01T09:00:00Z') },
      { recommenderId: createdUsers[11].id, recommendedId: createdUsers[18].id, content: "Jade est une illustratrice talentueuse, ses retours sur le design sont toujours justes.", createdAt: new Date('2026-06-01T14:00:00Z') },
      { recommenderId: createdUsers[17].id, recommendedId: createdUsers[19].id, content: "Amine a une maîtrise de Java et C++ impressionnante pour son niveau.",                   createdAt: new Date('2026-06-02T08:00:00Z') },
      { recommenderId: createdUsers[11].id, recommendedId: createdUsers[20].id, content: "Camille apporte une énergie positive et ses cours de yoga sont vraiment efficaces.",     createdAt: new Date('2026-06-02T12:00:00Z') },
      { recommenderId: createdUsers[0].id,  recommendedId: createdUsers[21].id, content: "Sébastien est le mentor fullstack idéal, disponible et toujours pertinent.",             createdAt: new Date('2026-06-02T15:00:00Z') },
      { recommenderId: createdUsers[13].id, recommendedId: createdUsers[22].id, content: "Priya est une data scientist brillante, ses analyses sont toujours rigoureuses.",        createdAt: new Date('2026-06-02T18:00:00Z') },
      { recommenderId: createdUsers[4].id,  recommendedId: createdUsers[23].id, content: "Noé a un vrai sens du marketing, il pense toujours à l'utilisateur final.",              createdAt: new Date('2026-06-03T09:00:00Z') },
      { recommenderId: createdUsers[15].id, recommendedId: createdUsers[24].id, content: "Imani capture des instants avec une sensibilité artistique hors du commun.",             createdAt: new Date('2026-06-03T12:00:00Z') },
    ],
  })

  console.log('✓ 25 recommandations créées — 1 reçue par utilisateur')
  console.log('\n✅ Seed terminé avec succès !')
  console.log(`   └─ 25 étudiants | ${skills.length} compétences | ${badges.length} badges`)
  console.log(`   └─ ${matchesData.length} matchs | 11 sessions | 60 feedbacks`)
  console.log(`   └─ 25 posts feed | 13 défis | 25 recommandations`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
