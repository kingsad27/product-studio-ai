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
  - Étape 1 — Collecte du prénom et du numéro de téléphone avec sélection d'indicatif pays (CI, SN, TG, BF, ML, CM, FR, US).
  - Étape 2 — Sélection de l'objectif d'utilisation (E-commerce, Réseaux sociaux, Agence, Test).
  - Étape 3 — Sélection du canal d'acquisition (TikTok, Instagram, Facebook, WhatsApp, Bouche-à-oreille, Google) avec soumission automatique au clic.
- **Modale Cadeau de Bienvenue** : `WelcomeGiftModal` affichée 1,5 s après l'arrivée sur le dashboard post-onboarding, avec animation rebond, double vague de confettis au clic, et révélation du crédit gratuit.

### Corrigé
- **API `/api/user/onboarding`** : Remplacement de `update` par `upsert` pour éviter un crash si le webhook Clerk n'a pas encore créé l'utilisateur en base au moment de la soumission. Ajout de la validation des champs obligatoires et récupération de l'email via `currentUser()` en fallback.
- **Dashboard (`/dashboard`)** : Suppression de l'upsert inline avec email vide (anti-pattern dangereux). Le dashboard redirige désormais proprement vers `/onboarding` si l'utilisateur n'est pas en base. Transmission du prop `showOnMount` à la `WelcomeGiftModal` via le paramètre d'URL `?welcome=1`.
- **Middleware** : Ajout de `/sign-in(.*)` et `/sign-up(.*)` comme routes publiques pour éviter les boucles de redirection Clerk.
- **Indicatif téléphone** : L'indicatif pays est désormais correctement concaténé au numéro (`+225 0707020304`) avant sauvegarde en base.
- **UX Onboarding** : Ajout d'un état de chargement dédié à l'étape 3, gestion d'erreur API avec bouton « Réessayer », et désactivation du bouton « Continuer » si les champs obligatoires sont vides.

### Prochaines étapes techniques (Étape 5 - Paiement)
1. **Intégration Stripe / Mobile Money** : Configurer Stripe pour permettre l'achat sécurisé de recharges de crédits selon la devise locale.
2. **Codes Promo & Influenceurs** : Implémenter le système de codes de promotion pour attribuer des bonus de crédits ou réductions sur les achats.

