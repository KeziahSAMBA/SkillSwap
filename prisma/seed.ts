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
  ])
  const [badgePremierPas, badgeMentor, badgeCurieux, badgeExpert, badgeSociable] = badges

  // ─── Étudiants ────────────────────────────────────────────────────────────────
  const usersData = [
    {
      name: 'Amara Diallo', email: 'amara.diallo@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=1',
      teach: [{ skill: skillPython, level: SkillLevel.EXPERT }, { skill: skillML, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillFigma, level: SkillLevel.BEGINNER }, { skill: skillAnglais, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Lucas Martin', email: 'lucas.martin@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=2',
      teach: [{ skill: skillReact, level: SkillLevel.ADVANCED }, { skill: skillJS, level: SkillLevel.EXPERT }],
      learn: [{ skill: skillML, level: SkillLevel.BEGINNER }, { skill: skillEspagnol, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Fatou Ndiaye', email: 'fatou.ndiaye@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=5',
      teach: [{ skill: skillFigma, level: SkillLevel.EXPERT }, { skill: skillUiUx, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillJS, level: SkillLevel.BEGINNER }, { skill: skillSQL, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Hugo Lefebvre', email: 'hugo.lefebvre@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=3',
      teach: [{ skill: skillSQL, level: SkillLevel.ADVANCED }, { skill: skillJava, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillReact, level: SkillLevel.BEGINNER }, { skill: skillMarketing, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Sofia Perez', email: 'sofia.perez@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=9',
      teach: [{ skill: skillEspagnol, level: SkillLevel.EXPERT }, { skill: skillMarketing, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillPython, level: SkillLevel.INTERMEDIATE }, { skill: skillFigma, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Youssef El Amrani', email: 'youssef.elamrani@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=7',
      teach: [{ skill: skillArabe, level: SkillLevel.EXPERT }, { skill: skillCompta, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillJS, level: SkillLevel.INTERMEDIATE }, { skill: skillNode, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Chloé Bernard', email: 'chloe.bernard@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=10',
      teach: [{ skill: skillPhoto, level: SkillLevel.EXPERT }, { skill: skillIllustrator, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillPython, level: SkillLevel.BEGINNER }, { skill: skillProjMgmt, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Kwame Asante', email: 'kwame.asante@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=12',
      teach: [{ skill: skillAnglais, level: SkillLevel.EXPERT }, { skill: skillJS, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillSQL, level: SkillLevel.BEGINNER }, { skill: skillYoga, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Emma Dubois', email: 'emma.dubois@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=11',
      teach: [{ skill: skillNode, level: SkillLevel.ADVANCED }, { skill: skillSQL, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillFigma, level: SkillLevel.BEGINNER }, { skill: skillMusique, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Rayan Boukhari', email: 'rayan.boukhari@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=13',
      teach: [{ skill: skillCpp, level: SkillLevel.EXPERT }, { skill: skillJava, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillUiUx, level: SkillLevel.BEGINNER }, { skill: skillAnglais, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Manon Girard', email: 'manon.girard@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=14',
      teach: [{ skill: skillExcel, level: SkillLevel.EXPERT }, { skill: skillCompta, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillMarketing, level: SkillLevel.BEGINNER }, { skill: skillVideo, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Isaac Owusu', email: 'isaac.owusu@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=15',
      teach: [{ skill: skillDataAnalysis, level: SkillLevel.ADVANCED }, { skill: skillExcel, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillReact, level: SkillLevel.BEGINNER }, { skill: skillCpp, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Léa Fontaine', email: 'lea.fontaine@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=16',
      teach: [{ skill: skillMusique, level: SkillLevel.EXPERT }, { skill: skillPhoto, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillPython, level: SkillLevel.BEGINNER }, { skill: skillML, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Mehdi Haddad', email: 'mehdi.haddad@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=17',
      teach: [{ skill: skillML, level: SkillLevel.ADVANCED }, { skill: skillPython, level: SkillLevel.EXPERT }],
      learn: [{ skill: skillEspagnol, level: SkillLevel.BEGINNER }, { skill: skillCompta, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Nina Rousseau', email: 'nina.rousseau@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=20',
      teach: [{ skill: skillAllemand, level: SkillLevel.EXPERT }, { skill: skillAnglais, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillFigma, level: SkillLevel.INTERMEDIATE }, { skill: skillVideo, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Tom Gauthier', email: 'tom.gauthier@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=18',
      teach: [{ skill: skillVideo, level: SkillLevel.EXPERT }, { skill: skillPhoto, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillJS, level: SkillLevel.INTERMEDIATE }, { skill: skillDataAnalysis, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Aicha Camara', email: 'aicha.camara@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=21',
      teach: [{ skill: skillCuisine, level: SkillLevel.EXPERT }, { skill: skillArabe, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillPython, level: SkillLevel.BEGINNER }, { skill: skillExcel, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Théo Marchand', email: 'theo.marchand@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=19',
      teach: [{ skill: skillProjMgmt, level: SkillLevel.EXPERT }, { skill: skillMarketing, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillCpp, level: SkillLevel.BEGINNER }, { skill: skillML, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Jade Renard', email: 'jade.renard@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=22',
      teach: [{ skill: skillIllustrator, level: SkillLevel.ADVANCED }, { skill: skillUiUx, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillAnglais, level: SkillLevel.INTERMEDIATE }, { skill: skillSQL, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Amine Benzara', email: 'amine.benzara@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=23',
      teach: [{ skill: skillJava, level: SkillLevel.EXPERT }, { skill: skillCpp, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillReact, level: SkillLevel.INTERMEDIATE }, { skill: skillPhoto, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Camille Dupont', email: 'camille.dupont@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=24',
      teach: [{ skill: skillYoga, level: SkillLevel.ADVANCED }, { skill: skillCuisine, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillMarketing, level: SkillLevel.BEGINNER }, { skill: skillCompta, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Sébastien Morel', email: 'sebastien.morel@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=25',
      teach: [{ skill: skillReact, level: SkillLevel.EXPERT }, { skill: skillNode, level: SkillLevel.EXPERT }],
      learn: [{ skill: skillAllemand, level: SkillLevel.BEGINNER }, { skill: skillMusique, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Priya Sharma', email: 'priya.sharma@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=26',
      teach: [{ skill: skillDataAnalysis, level: SkillLevel.EXPERT }, { skill: skillML, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillFigma, level: SkillLevel.BEGINNER }, { skill: skillEspagnol, level: SkillLevel.INTERMEDIATE }],
    },
    {
      name: 'Noé Lambert', email: 'noe.lambert@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=27',
      teach: [{ skill: skillMarketing, level: SkillLevel.ADVANCED }, { skill: skillProjMgmt, level: SkillLevel.INTERMEDIATE }],
      learn: [{ skill: skillPython, level: SkillLevel.INTERMEDIATE }, { skill: skillNode, level: SkillLevel.BEGINNER }],
    },
    {
      name: 'Imani Okonkwo', email: 'imani.okonkwo@skillswap.dev',
      photoUrl: 'https://i.pravatar.cc/150?img=28',
      teach: [{ skill: skillAnglais, level: SkillLevel.EXPERT }, { skill: skillPhoto, level: SkillLevel.ADVANCED }],
      learn: [{ skill: skillSQL, level: SkillLevel.INTERMEDIATE }, { skill: skillYoga, level: SkillLevel.BEGINNER }],
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

    // Disponibilités (2 créneaux par étudiant)
    await prisma.availability.createMany({
      data: [
        { userId: user.id, dayOfWeek: 1, startTime: '09:00', endTime: '11:00' },
        { userId: user.id, dayOfWeek: 4, startTime: '14:00', endTime: '16:00' },
      ],
    })

    createdUsers.push(user)
  }

  console.log(`✓ ${createdUsers.length} étudiants créés`)

  // ─── Matchs ───────────────────────────────────────────────────────────────────
  const matchesData = [
    // Fatou veut apprendre JS → Lucas enseigne JS
    { seekerId: createdUsers[2].id, helperId: createdUsers[1].id, skillId: skillJS.id, status: MatchStatus.ACCEPTED },
    // Hugo veut apprendre React → Sébastien enseigne React
    { seekerId: createdUsers[3].id, helperId: createdUsers[21].id, skillId: skillReact.id, status: MatchStatus.ACCEPTED },
    // Amara veut apprendre Figma → Fatou enseigne Figma
    { seekerId: createdUsers[0].id, helperId: createdUsers[2].id, skillId: skillFigma.id, status: MatchStatus.PENDING },
    // Lucas veut apprendre ML → Priya enseigne ML
    { seekerId: createdUsers[1].id, helperId: createdUsers[22].id, skillId: skillML.id, status: MatchStatus.ACCEPTED },
    // Rayan veut apprendre UI/UX → Fatou enseigne UI/UX
    { seekerId: createdUsers[9].id, helperId: createdUsers[2].id, skillId: skillUiUx.id, status: MatchStatus.PENDING },
    // Manon veut apprendre Marketing → Sofia enseigne Marketing
    { seekerId: createdUsers[10].id, helperId: createdUsers[4].id, skillId: skillMarketing.id, status: MatchStatus.ACCEPTED },
    // Chloé veut apprendre Gestion de projet → Théo enseigne Gestion de projet
    { seekerId: createdUsers[6].id, helperId: createdUsers[17].id, skillId: skillProjMgmt.id, status: MatchStatus.ACCEPTED },
    // Emma veut apprendre Musique → Léa enseigne Musique
    { seekerId: createdUsers[8].id, helperId: createdUsers[12].id, skillId: skillMusique.id, status: MatchStatus.PENDING },
  ]

  for (const m of matchesData) {
    await prisma.match.create({ data: m })
  }

  console.log(`✓ ${matchesData.length} matchs créés`)

  // ─── Sessions ─────────────────────────────────────────────────────────────────
  const session1 = await prisma.session.create({
    data: {
      title: 'Atelier React pour débutants',
      type: SessionType.WORKSHOP,
      status: SessionStatus.DONE,
      scheduledAt: new Date('2026-05-10T10:00:00Z'),
      skillId: skillReact.id,
    },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session1.id, userId: createdUsers[1].id },  // Lucas (enseigne)
      { sessionId: session1.id, userId: createdUsers[3].id },  // Hugo
      { sessionId: session1.id, userId: createdUsers[9].id },  // Rayan
      { sessionId: session1.id, userId: createdUsers[19].id }, // Amine
    ],
  })

  const session2 = await prisma.session.create({
    data: {
      title: 'Cours rapide Python & Data',
      type: SessionType.QUICK_COURSE,
      status: SessionStatus.DONE,
      scheduledAt: new Date('2026-05-15T14:00:00Z'),
      skillId: skillPython.id,
    },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session2.id, userId: createdUsers[0].id },  // Amara (enseigne)
      { sessionId: session2.id, userId: createdUsers[12].id }, // Léa
      { sessionId: session2.id, userId: createdUsers[16].id }, // Aicha
      { sessionId: session2.id, userId: createdUsers[23].id }, // Noé
    ],
  })

  const session3 = await prisma.session.create({
    data: {
      title: 'Club Design — Figma & UI/UX',
      type: SessionType.CLUB,
      status: SessionStatus.PLANNED,
      scheduledAt: new Date('2026-06-10T09:00:00Z'),
      skillId: skillFigma.id,
    },
  })
  await prisma.sessionParticipant.createMany({
    data: [
      { sessionId: session3.id, userId: createdUsers[2].id },  // Fatou (enseigne)
      { sessionId: session3.id, userId: createdUsers[0].id },  // Amara
      { sessionId: session3.id, userId: createdUsers[8].id },  // Emma
      { sessionId: session3.id, userId: createdUsers[18].id }, // Jade
    ],
  })

  console.log('✓ 3 sessions créées')

  // ─── Feedbacks (sessions terminées) ──────────────────────────────────────────
  await prisma.feedback.createMany({
    data: [
      { giverId: createdUsers[3].id, receiverId: createdUsers[1].id, sessionId: session1.id, rating: 5, comment: 'Excellent cours, très clair !' },
      { giverId: createdUsers[9].id, receiverId: createdUsers[1].id, sessionId: session1.id, rating: 4, comment: 'Bien expliqué, j\'ai tout compris.' },
      { giverId: createdUsers[12].id, receiverId: createdUsers[0].id, sessionId: session2.id, rating: 5, comment: 'Amara est une vraie pédagogue.' },
      { giverId: createdUsers[16].id, receiverId: createdUsers[0].id, sessionId: session2.id, rating: 4, comment: 'Très utile pour débuter en Python.' },
    ],
  })

  console.log('✓ 4 feedbacks créés')

  // ─── Points ───────────────────────────────────────────────────────────────────
  await prisma.point.createMany({
    data: [
      { userId: createdUsers[1].id, amount: 150, description: 'Animation atelier React' },
      { userId: createdUsers[0].id, amount: 120, description: 'Animation cours Python' },
      { userId: createdUsers[2].id, amount: 90, description: 'Partage compétences Figma' },
      { userId: createdUsers[4].id, amount: 80, description: 'Aide en Marketing' },
      { userId: createdUsers[21].id, amount: 200, description: 'Expert React & Node.js' },
      { userId: createdUsers[22].id, amount: 170, description: 'Expert Data Analysis' },
    ],
  })

  // ─── Badges ───────────────────────────────────────────────────────────────────
  await prisma.userBadge.createMany({
    data: [
      { userId: createdUsers[1].id, badgeId: badgeMentor.id },
      { userId: createdUsers[1].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[0].id, badgeId: badgeExpert.id },
      { userId: createdUsers[0].id, badgeId: badgePremierPas.id },
      { userId: createdUsers[2].id, badgeId: badgeExpert.id },
      { userId: createdUsers[21].id, badgeId: badgeExpert.id },
      { userId: createdUsers[21].id, badgeId: badgeMentor.id },
      { userId: createdUsers[22].id, badgeId: badgeCurieux.id },
    ],
  })

  console.log('✓ Points et badges attribués')

  // ─── Défis ────────────────────────────────────────────────────────────────────
  await prisma.challenge.createMany({
    data: [
      { challengerId: createdUsers[1].id, challengedId: createdUsers[21].id, description: 'Crée une app React complète en 48h', status: ChallengeStatus.ACCEPTED },
      { challengerId: createdUsers[0].id, challengedId: createdUsers[13].id, description: 'Développe un modèle ML avec 90% de précision', status: ChallengeStatus.OPEN },
      { challengerId: createdUsers[4].id, challengedId: createdUsers[23].id, description: 'Lance une campagne marketing en 1 semaine', status: ChallengeStatus.COMPLETED },
    ],
  })

  console.log('✓ 3 défis créés')

  // ─── Posts Feed ───────────────────────────────────────────────────────────────
  await prisma.feedPost.createMany({
    data: [
      { authorId: createdUsers[1].id, content: "Je donne un atelier React ce samedi ! Rejoignez-moi si vous voulez débuter. 🚀", createdAt: new Date('2026-05-08T10:00:00Z') },
      { authorId: createdUsers[0].id, content: "Nouveau cours Python & Data Science disponible. On voit les bases de pandas et matplotlib !", createdAt: new Date('2026-05-12T14:00:00Z') },
      { authorId: createdUsers[2].id, content: "Cherche quelqu'un pour m'apprendre le JS en échange de cours Figma. DM bienvenu !", createdAt: new Date('2026-05-18T09:00:00Z') },
      { authorId: createdUsers[4].id, content: "Le marketing digital c'est pas sorcier. Je peux vous montrer comment créer votre première campagne.", createdAt: new Date('2026-05-20T11:00:00Z') },
      { authorId: createdUsers[21].id, content: "React + Node.js = stack parfaite pour débuter en fullstack. N'hésitez pas à me contacter !", createdAt: new Date('2026-05-25T16:00:00Z') },
      { authorId: createdUsers[14].id, content: "Je cherche quelqu'un qui peut m'aider à progresser en Figma. Je peux enseigner l'allemand en échange.", createdAt: new Date('2026-05-28T08:30:00Z') },
      { authorId: createdUsers[22].id, content: "Fini mon projet de Data Analysis sur les tendances étudiantes. Très satisfaite des résultats !", createdAt: new Date('2026-05-30T17:00:00Z') },
    ],
  })

  console.log('✓ 7 posts feed créés')

  // ─── Recommandations ─────────────────────────────────────────────────────────
  await prisma.recommendation.createMany({
    data: [
      { recommenderId: createdUsers[3].id, recommendedId: createdUsers[1].id, content: "Lucas est un excellent prof de React, patient et très pédagogue !", createdAt: new Date('2026-05-11T12:00:00Z') },
      { recommenderId: createdUsers[12].id, recommendedId: createdUsers[0].id, content: "Amara maîtrise parfaitement Python. J'ai tout appris grâce à elle.", createdAt: new Date('2026-05-16T10:00:00Z') },
      { recommenderId: createdUsers[17].id, recommendedId: createdUsers[2].id, content: "Fatou a un vrai talent pour expliquer le design. Je recommande vivement !", createdAt: new Date('2026-05-22T15:00:00Z') },
    ],
  })

  console.log('✓ 3 recommandations créées')
  console.log('\n✅ Seed terminé avec succès !')
  console.log(`   └─ 25 étudiants | ${skills.length} compétences | ${badges.length} badges`)
  console.log(`   └─ ${matchesData.length} matchs | 3 sessions | 4 feedbacks | 7 posts`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
