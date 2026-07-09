# Product Studio AI 🎨

> **Transformez une simple photo produit en visuels professionnels grâce à l'IA.**
> Sans prompt. Sans compétences techniques. En quelques secondes.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## 🌍 À propos

**Product Studio AI** est un SaaS conçu pour les commerçants, vendeurs WhatsApp, boutiques en ligne
et entrepreneurs — principalement en **Afrique de l'Ouest**.

L'objectif : permettre à n'importe qui de créer des images produit professionnelles sans avoir
besoin d'un studio photo, d'un photographe ou de compétences en IA.

### Marché cible
Sénégal 🇸🇳 · Côte d'Ivoire 🇨🇮 · Mali 🇲🇱 · Burkina Faso 🇧🇫 · Guinée 🇬🇳 · Togo 🇹🇬 · Bénin 🇧🇯

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js ≥ 18.17
- npm ≥ 9

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/product-studio-ai.git
cd product-studio-ai

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📁 Structure du projet

```
product-studio-ai/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Layout racine (SEO, métadonnées)
│   ├── page.tsx              # Page d'accueil
│   ├── globals.css           # Styles globaux & design tokens
│   ├── dashboard/page.tsx    # Tableau de bord utilisateur
│   ├── upload/page.tsx       # Upload de photo produit
│   ├── gallery/page.tsx      # Galerie des images générées
│   ├── pricing/page.tsx      # Page tarifs et packs de crédits
│   └── login/page.tsx        # Page de connexion
│
├── components/
│   ├── layout/               # Header, Footer
│   ├── ui/                   # Button, Badge (composants réutilisables)
│   └── shared/               # Composants partagés (à venir)
│
├── config/
│   ├── site.ts               # Configuration globale du site
│   └── pricing.ts            # Packs de crédits et règles tarifaires
│
├── constants/
│   └── routes.ts             # Routes centralisées de l'application
│
├── types/
│   ├── credit.ts             # Types du système de crédits
│   ├── product.ts            # Types des produits uploadés
│   ├── generation.ts         # Types des générations IA
│   └── user.ts               # Types utilisateurs
│
├── lib/
│   └── utils.ts              # Fonctions utilitaires (cn, formatPriceFCFA...)
│
├── docs/
│   ├── product-requirements.md  # PRD — problème, solution, public cible
│   ├── roadmap.md               # Roadmap en 5 phases
│   └── credits-system.md        # Documentation du système de crédits
│
└── public/
    ├── images/               # Images statiques
    └── placeholders/         # Images placeholder
```

---

## 🛠 Stack technique

| Couche          | Technologie                          |
|-----------------|--------------------------------------|
| Framework       | Next.js 15 (App Router)              |
| Langage         | TypeScript                           |
| Styles          | Tailwind CSS 4                       |
| Utilitaires CSS | clsx + tailwind-merge                |
| Déploiement     | Vercel                               |
| BDD (à venir)   | Supabase (Phase 2)                   |
| Auth (à venir)  | Supabase Auth (Phase 2)              |
| IA (à venir)    | Replicate / Fal.ai (Phase 3)         |
| Paiement        | Mobile Money Wave/Orange (Phase 4)   |

---

## 📋 Commandes disponibles

```bash
npm run dev          # Serveur de développement (http://localhost:3000)
npm run build        # Build production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

---

## 💎 Modèle de crédits

| Pack        | Crédits | Prix        |
|-------------|---------|-------------|
| Découverte  | 5       | 1 000 FCFA  |
| Starter     | 15      | 2 500 FCFA  |
| Business ⭐  | 40      | 6 000 FCFA  |
| Pro         | 100     | 12 000 FCFA |

**Règle clé** : Les crédits **n'expirent jamais**.

---

## 📍 Roadmap

- **Phase 1** ✅ Base MVP (actuelle)
- **Phase 2** 🔜 Authentification & Upload (Supabase)
- **Phase 3** 🔜 Génération IA d'images
- **Phase 4** 🔜 Paiement Mobile Money
- **Phase 5** 🔜 Croissance & internationalisation

Voir [docs/roadmap.md](./docs/roadmap.md) pour les détails.

---

## 📄 Licence

Propriétaire — Tous droits réservés © 2025 Product Studio AI

---

*Fait avec ❤️ pour l'Afrique de l'Ouest*
