# SkillSwap

> Le site qui connecte les étudiants par leurs compétences.

Plateforme web permettant aux étudiants d'un même établissement de s'échanger des compétences, de s'organiser en sessions d'apprentissage entre pairs et de valoriser leurs expertises au sein d'un réseau de confiance.

Le site est conçu dès l'origine avec une **architecture découplée** pour permettre une évolution future vers une **application mobile**.

---

## 📑 Sommaire

- [Périmètre fonctionnel](#-périmètre-fonctionnel)
- [User stories](#-user-stories)
- [Arborescence du site (front)](#-arborescence-du-site-front)
- [Architecture back-end](#-architecture-back-end)
- [Stack technique](#-stack-technique)
- [Équipe projet](#-équipe-projet)

---

## 🎯 Périmètre fonctionnel

SkillSwap repose sur **5 fonctionnalités principales** :

| # | Fonctionnalité | Description |
|---|---|---|
| 1 | **Profil étudiant** | Liste de compétences, niveaux déclarés, disponibilités |
| 2 | **Système de matching** | Trouver un étudiant pour apprendre ou enseigner une compétence |
| 3 | **Gestion des sessions** | Planification d'ateliers, de cours rapides, de clubs thématiques |
| 4 | **Gamification** | Badges, points, défis entre utilisateurs, niveaux de progression |
| 5 | **Feed social** | Partage de réalisations, recommandations, feedbacks entre pairs |

### Parcours utilisateurs prioritaires

Le prototype couvre 4 parcours principaux :

1. **Inscription**
2. **Recherche de compétence**
3. **Prise de contact**
4. **Gestion de profil**

---

## 📋 User stories

### 👤 1. Profil étudiant

1. En tant qu'étudiant, je peux créer mon profil afin d'être identifié sur la plateforme.
2. En tant qu'étudiant, je peux ajouter des compétences à mon profil afin de me présenter aux autres étudiants.
3. En tant qu'étudiant, je peux déclarer mon niveau pour chaque compétence afin que les autres connaissent mon expertise.
4. En tant qu'étudiant, je peux indiquer mes disponibilités afin que les autres sachent quand me solliciter.
5. En tant qu'étudiant, je peux modifier mon profil afin de le garder à jour.

### 🔍 2. Système de matching

6. En tant qu'étudiant, je peux rechercher un autre étudiant en fonction d'une compétence afin de trouver le bon interlocuteur.
7. En tant qu'étudiant, je peux trouver un pair pour **apprendre** une compétence afin de progresser.
8. En tant qu'étudiant, je peux trouver un pair pour **enseigner** une compétence afin de transmettre mon savoir-faire.

### 📚 3. Gestion des sessions

9. En tant qu'étudiant, je peux planifier une session avec un autre étudiant afin d'organiser notre échange.
10. En tant qu'étudiant, je peux organiser un **atelier** afin de transmettre une compétence à plusieurs pairs.
11. En tant qu'étudiant, je peux organiser un **cours rapide** afin de partager une compétence sur un format court.
12. En tant qu'étudiant, je peux créer ou rejoindre un **club thématique** afin d'échanger régulièrement autour d'un sujet.

### 🏆 4. Gamification

13. En tant qu'étudiant, je peux gagner des **points** au fil de mes contributions afin d'être valorisé.
14. En tant qu'étudiant, je peux débloquer des **badges** afin de marquer mes accomplissements.
15. En tant qu'étudiant, je peux relever des **défis** lancés par d'autres utilisateurs afin de me challenger.
16. En tant qu'étudiant, je peux voir mon **niveau de progression** afin de mesurer mon évolution.

### 📰 5. Feed social

17. En tant qu'étudiant, je peux partager mes **réalisations** sur le feed afin de valoriser ce que j'ai accompli.
18. En tant qu'étudiant, je peux donner des **recommandations** à mes pairs afin de souligner leur expertise.
19. En tant qu'étudiant, je peux laisser des **feedbacks** à mes pairs afin de partager mon retour d'expérience.

---

## 🌳 Arborescence du site (front)

```
SkillSwap
│
├── 🌐 Espace public (avant connexion)
│   ├── Accueil
│   ├── Inscription
│   └── Connexion
│
├── 🎓 Espace étudiant (connecté)
│   ├── Mon profil
│   │   ├── Compétences
│   │   ├── Niveaux
│   │   └── Disponibilités
│   │
│   ├── Recherche & matching
│   │   ├── Recherche par compétence
│   │   ├── Recherche pour apprendre
│   │   └── Recherche pour enseigner
│   │
│   ├── Mes sessions
│   │   ├── Ateliers
│   │   ├── Cours rapides
│   │   └── Clubs thématiques
│   │
│   ├── Gamification
│   │   ├── Points
│   │   ├── Badges
│   │   ├── Défis
│   │   └── Niveau de progression
│   │
│   └── Feed social
│       ├── Réalisations
│       ├── Recommandations
│       └── Feedbacks
```

### Pages principales

| Page | Rôle | User stories couvertes |
|---|---|---|
| **Accueil** | Présentation de SkillSwap, CTA inscription/connexion | — |
| **Inscription** | Création de compte + profil initial | 1 |
| **Connexion** | Accès à l'espace étudiant | — |
| **Mon profil** | Gestion des compétences, niveaux, disponibilités | 1, 2, 3, 4, 5 |
| **Recherche & matching** | Trouver un pair pour apprendre/enseigner | 6, 7, 8 |
| **Mes sessions** | Planification ateliers / cours / clubs | 9, 10, 11, 12 |
| **Gamification** | Points, badges, défis, progression | 13, 14, 15, 16 |
| **Feed social** | Partage de réalisations, recommandations, feedbacks | 17, 18, 19 |

---

## 🏗️ Architecture back-end

### Schéma global

```
┌─────────────────────────────────────────────────┐
│  FRONT-END (HTML/CSS/JS responsive)             │
│  Site web → futur mobile                        │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS / JSON
                       ▼
┌─────────────────────────────────────────────────┐
│  API REST découplée                             │
│  Endpoints /api/v1/...                          │
│  Authentification JWT                           │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  Base de données relationnelle                  │
└─────────────────────────────────────────────────┘
```

L'architecture est **découplée dès le départ** : le front communique avec le back via une API REST, ce qui permettra à une future application mobile de réutiliser exactement les mêmes endpoints.

### Modèle de données

Entités principales déduites du périmètre fonctionnel :

| Entité | Liée à la fonctionnalité | Description |
|---|---|---|
| **User** | Profil étudiant | Étudiant inscrit (nom, email institutionnel, photo) |
| **Skill** | Profil étudiant | Compétence (nom, catégorie) |
| **UserSkill** | Profil étudiant + Matching | Lien étudiant ↔ compétence avec niveau et type (apprend / enseigne) |
| **Availability** | Profil étudiant | Créneaux de disponibilité d'un étudiant |
| **Match** | Système de matching | Mise en relation entre deux étudiants pour une compétence |
| **Session** | Gestion des sessions | Atelier, cours rapide ou club thématique planifié |
| **Point** | Gamification | Points gagnés par un étudiant |
| **Badge** | Gamification | Badge débloqué par un étudiant |
| **Challenge** | Gamification | Défi lancé entre étudiants |
| **FeedPost** | Feed social | Publication d'une réalisation |
| **Recommendation** | Feed social | Recommandation laissée à un pair |
| **Feedback** | Feed social | Retour laissé après une session |

### Endpoints API REST (structure)

| Domaine | Endpoints principaux |
|---|---|
| **Authentification** | `POST /api/v1/auth/register`, `POST /api/v1/auth/login` |
| **Profil étudiant** | `GET/PATCH /api/v1/users/me`, `GET/POST/DELETE /api/v1/users/me/skills`, `GET/POST /api/v1/users/me/availabilities` |
| **Matching** | `GET /api/v1/matching/search`, `POST /api/v1/matches` |
| **Sessions** | `GET/POST /api/v1/sessions` (avec filtre par type : atelier, cours rapide, club) |
| **Gamification** | `GET /api/v1/users/me/points`, `GET /api/v1/users/me/badges`, `GET /api/v1/challenges` |
| **Feed social** | `GET/POST /api/v1/feed`, `POST /api/v1/recommendations`, `POST /api/v1/feedbacks` |

---

## 🛠️ Stack technique

### Choix retenus et justifications

| Couche | Technologie | Justification |
|---|---|---|
| **Front-end** | Next.js 16 (App Router) + TypeScript + Tailwind CSS | Framework React full-stack, rendu hybride SSR/SSG, styling utilitaire rapide |
| **Back-end** | Next.js API Routes | API REST intégrée au projet, endpoints `/api/v1/...` sans serveur séparé |
| **ORM** | Prisma | Typage fort, migrations versionnées, compatible PostgreSQL |
| **Base de données** | PostgreSQL | SGBD relationnel robuste, adapté aux relations entre étudiants, compétences et sessions |
| **Authentification** | JWT | Stateless, indispensable pour préparer l'évolution mobile |
| **Architecture** | API REST découplée | Le front web actuel et la future app mobile consomment la même API |
| **Versioning** | Git | Standard collaboration équipe |
| **Gestion projet** | Trello (imposé par le brief) | Pilotage Agile/Scrum |
| **Design** | Figma | Maquettes interactives et prototype |

### Justification de la contrainte d'évolutivité mobile

Le brief impose une **architecture découplée pour permettre une évolution future vers une application mobile**. Les choix techniques répondent à cette contrainte :

- ✅ **API REST stateless** : consommable par n'importe quel client (web aujourd'hui, mobile demain)
- ✅ **JWT** : authentification compatible mobile (pas de dépendance aux cookies)
- ✅ **API versionnée** (`/api/v1/`) : permet d'évoluer sans casser les anciens clients
- ✅ **Réponses JSON** : format universel, lisible par tout client mobile (iOS, Android)
- ✅ **Front responsive + PWA** : étape intermédiaire avant l'app native

---

## 👥 Équipe projet

Équipe de 5 personnes en profil mixte e-business / développement web :

| Rôle | Responsabilités |
|---|---|
| **Scrum Master / Lead technique** (Dev) | Animation Trello, coordination équipe, choix techniques |
| **Développeur front-end** (Dev) | Intégration HTML/CSS responsive, prototype |
| **Développeur back-end** (Dev) | API REST, base de données, authentification |
| **Product Owner / MOA** (Marketing) | Backlog produit, specs fonctionnelles, RDV client |
| **UX / Communication** (Marketing) | Maquettes Figma, kit d'onboarding, support de soutenance |

---

## 📅 Planning workshop

| Jour | Activité | Production attendue |
|---|---|---|
| **J1** | Lancement, cadrage, organisation équipe, Trello | Trello configuré, organisation documentée, CR n°1 |
| **J2** | Conception, specs, prototype, budget | Budget, RACI, tableau de charge, CR n°2 |
| **J3** | Finalisation, revue, préparation soutenance | Livrables finalisés, CR n°3, support de présentation |
| **J4** | Soutenance orale (pitch 15 min + entretien individuel ~10 min/étudiant) | Dossier complet remis la veille |

---

## 📦 Livrables

- Organisation MOA / MOE + RACI
- Tableau de charge de travail
- Rétroplanning et découpage en sprints
- Board Trello en mode Scrum
- Budget estimatif (RH + technique)
- Maquettes Figma + prototype interactif
- Intégration HTML/CSS responsive
- Documentation technique
- Kit d'onboarding utilisateur
- Comptes-rendus des 3 RDV client simulés
- Support de présentation pour la soutenance

---

*Projet réalisé dans le cadre du Workshop Agile/Scrum — Institut F2i / École DSP*
