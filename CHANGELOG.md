# Journal des modifications (Changelog)

## [Non publié] - 2026-07-11
### Ajouté
- Initialisation du projet Next.js (product-studio-ai).
- Création de la structure de base (Tailwind CSS, TypeScript).
- Développement complet de la bibliothèque de composants UI pour la page d'atterrissage (Landing Page) dans `components/landing/` (13 composants).
- Assemblage de la page principale (`app/page.tsx`) avec la version épurée et efficace (Navigation, Hero, Generated Pack, Testimonials, FAQ, Footer).

### Prochaines étapes techniques prioritaires (À implémenter)
1. **Authentification** : Mettre en place le système de connexion / inscription pour les utilisateurs (ex: Clerk ou NextAuth).
2. **Base de données** : Configurer une base de données pour sauvegarder les utilisateurs, les crédits restants, et l'historique de leurs images générées (ex: Prisma/Drizzle avec Vercel Postgres/Supabase).
3. **Intégration API IA** : Connecter l'application à un service de génération d'images (Replicate, OpenAI, ou autre) pour le cœur de l'application.
4. **Création du Dashboard (Tableau de bord)** : Développer la zone privée où l'utilisateur télécharge ses photos et récupère les résultats générés.
