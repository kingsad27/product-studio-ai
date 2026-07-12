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

### Prochaines étapes techniques (Étape 5 - Paiement)
1. **Intégration Stripe / Mobile Money** : Configurer Stripe pour permettre l'achat sécurisé de recharges de crédits selon la devise locale.
2. **Codes Promo & Influenceurs** : Implémenter le système de codes de promotion pour attribuer des bonus de crédits ou réductions sur les achats.

