# Journal des modifications (Changelog)

## [Non publié] - 2026-07-11
### Ajouté
- Initialisation du projet Next.js (product-studio-ai).
- Création de la structure de base (Tailwind CSS, TypeScript).
- Développement complet de la bibliothèque de composants UI pour la page d'atterrissage (Landing Page) dans `components/landing/` (13 composants).
- Assemblage de la page principale (`app/page.tsx`) avec la version épurée et efficace (Navigation, Hero, Generated Pack, Testimonials, FAQ, Footer).

## [Publié] - 2026-07-12
### Ajouté
- **Authentification** : Intégration complète de Clerk (`ClerkProvider`, `clerkMiddleware`, authentification utilisateur requise pour l'espace privé, gestion de l'état d'authentification par `useAuth`).
- **Base de données** : Intégration de Prisma ORM configuré pour Prisma 7 et Supabase (Transaction Pooler pour le runtime, Session Pooler pour les migrations DDL, types client synchronisés).
- **Modèle économique & Prix** : Structure en 3 plans (Starter, Studio, Business) avec détection automatique de devise (FCFA/XOF, EUR, USD) basée sur la géolocalisation d'IP client.
- **Webhook Clerk** : Route `/api/webhook/clerk` sécurisée via Svix pour synchroniser les créations/mises à jour/suppressions d'utilisateurs en base avec attribution d'1 crédit d'essai gratuit.
- **Stockage de fichiers** : Intégration avec Supabase Storage (`lib/storage.ts`) avec client admin sécurisé pour héberger les images sources et générées.
- **API Génération** : API `/api/generate` pour gérer les uploads multiples (jusqu'à 3 images), valider et déduire de façon atomique 1 crédit, et lancer la requête Replicate asynchrone par webhook.
- **Webhook Replicate** : Route `/api/webhook/replicate` publique gérant le téléchargement et la sauvegarde persistante des variations produites par l'IA et effectuant les remboursements en cas d'erreur.
- **Espace Personnel (Dashboard)** : Espace `/dashboard` premium avec statistiques réelles, badge de solde de crédits (avec raccourci recharge), formulaire d'upload interactif drag-and-drop, et liste d'historique de sessions.
- **Page de Résultats & Galerie** : Espace `/dashboard/results/[projectId]` montrant le statut en direct de la génération (avec animations et messages d'étapes d'IA) et fournissant une galerie interactive des visuels produits avec bouton de téléchargement HD.

## [Non publié] - 2026-07-16
### Ajouté
- **Flux d'Onboarding** : Implémentation complète du parcours de bienvenue en 3 étapes (`/onboarding`) :
  - Étape 1 — Collecte du prénom et du numéro de téléphone avec sélection d'indicatif pays.
  - Étape 2 — Sélection de l'objectif d'utilisation.
  - Étape 3 — Sélection du canal d'acquisition avec soumission automatique au clic.
- **Modale Cadeau de Bienvenue** : `WelcomeGiftModal` affichée 1,5 s après l'arrivée sur le dashboard post-onboarding, avec animation de confettis.
- **Pages d'Authentification Custom** : Création des pages `app/sign-in` et `app/sign-up` utilisant le SDK Clerk, configurées avec `forceRedirectUrl="/dashboard"` pour supprimer l'écran intermédiaire "Accéder à l'application" de Clerk et fluidifier l'expérience.
- **Refonte UI Dashboard** : Intégration du nouveau design (style izimelo) pour le tableau de bord :
  - Layout (`app/dashboard/layout.tsx`) avec Sidebar fixe et collapsible.
  - Page d'accueil Dashboard avec bannière CTA dégradée, salutation personnalisée, compteur de statistiques (photos générées, sessions), astuce du jour et liste d'historique optimisée.
- **Pages Dashboard Secondaires** : Création des pages de contenu et placeholders (`/dashboard/new`, `/dashboard/stats`, `/dashboard/history`) pour rendre la navigation de la nouvelle Sidebar totalement fonctionnelle.

### Corrigé
- **API Onboarding & Dashboard** : Remplacement de la méthode `update` par `upsert` pour la création utilisateur lors de l'onboarding. Suppression de la création "fantôme" (email vide) sur le dashboard.
- **Base de données** : Nettoyage de la table `users` et création de scripts SQL directs (`check.js`, `reset.js`) pour diagnostiquer et supprimer manuellement les utilisateurs tests corrompus via l'adaptateur Prisma `pg`.
- **Middleware Clerk** : Remplacement de l'API dépréciée `createRouteMatcher` par une fonction manuelle de vérification des routes `isPublicPath` afin d'éviter les avertissements Clerk et les problèmes de routing Next.js.
- **Configuration Next.js (`next/image`)** : Ajout du domaine `img.clerk.com` aux `remotePatterns` dans `next.config.ts` pour corriger l'erreur de rendu (`Invalid src prop`) de l'avatar utilisateur dans la Sidebar.
- **Style CSS (Server Components)** : Résolution de l'erreur `client-only` sur le dashboard en déplaçant les animations clés (`@keyframes wave`) du bloc `<style jsx global>` vers le fichier global `app/globals.css`.
- **Cohérence Visuelle** : Uniformisation de la couleur de fond (`bg-slate-50`) sur les pages d'authentification, d'onboarding et du dashboard pour correspondre exactement à celle de la landing page.

### Prochaines étapes techniques (Étape 5 - Déploiement & Paiement)
1. **Déploiement Vercel** : Déployer l'application et lier les Webhooks de production (Clerk, Replicate).
2. **Intégration Stripe / Mobile Money** : Permettre l'achat de recharges de crédits selon la devise locale (Wave, Orange Money via intégrateurs).
3. **Codes Promo & Influenceurs** : Implémenter la logique de codes de promotion pour l'acquisition client.

