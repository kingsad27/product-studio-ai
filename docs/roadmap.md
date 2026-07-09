# Roadmap — Product Studio AI

> Statut : 🟢 Phase 1 en cours · Mise à jour : Juillet 2025

---

## ✅ Phase 1 — Base MVP (actuelle)

**Objectif** : Créer une base technique propre et scalable.

- [x] Initialisation du projet Next.js 15 (App Router, TypeScript, Tailwind CSS)
- [x] Structure de dossiers claire et maintenable
- [x] Design system : couleurs, typographie, composants UI (Button, Badge)
- [x] Composants layout : Header, Footer
- [x] Pages : accueil, dashboard, upload, galerie, tarifs, connexion
- [x] Configuration : `site.ts`, `pricing.ts`
- [x] Types TypeScript : `credit.ts`, `product.ts`, `generation.ts`, `user.ts`
- [x] Constants et routes centralisés
- [x] Utilitaires : `lib/utils.ts`
- [x] Documentation : PRD, roadmap, système de crédits
- [x] `.env.example`, `.gitignore`, `README.md`

---

## 🔜 Phase 2 — Authentification & Upload

**Objectif** : Permettre aux utilisateurs de créer un compte et uploader des photos.

- [ ] Intégration Supabase (base de données + auth)
- [ ] Authentification : inscription, connexion, déconnexion
- [ ] Gestion de session utilisateur côté client
- [ ] Upload de photos produit vers Supabase Storage
- [ ] Validation des images (format, taille, qualité)
- [ ] Dashboard avec données réelles (crédits, images, produits)
- [ ] Galerie d'images téléchargeables
- [ ] Middleware de protection des routes

**Estimation** : 2–3 semaines

---

## 🔜 Phase 3 — Génération IA

**Objectif** : Connecter l'IA et générer les premiers visuels.

- [ ] Intégration API de génération d'images (Replicate, Fal.ai, ou autre)
- [ ] Analyse automatique du produit uploadé
- [ ] Auto-génération du prompt (invisible pour l'utilisateur)
- [ ] Styles disponibles : studio, lifestyle, mannequin, mise en situation
- [ ] File d'attente de génération (queue)
- [ ] Notifications de progression (temps réel)
- [ ] Gestion des erreurs et remboursement de crédits
- [ ] Preview et téléchargement en haute résolution

**Estimation** : 3–4 semaines

---

## 🔜 Phase 4 — Paiement & Monétisation

**Objectif** : Permettre l'achat de crédits et commencer à générer des revenus.

- [ ] Intégration Mobile Money (Wave, Orange Money, MTN Money)
- [ ] Paiement par carte bancaire (Stripe ou Paystack)
- [ ] Gestion des transactions et historique
- [ ] Système de facturation / reçus
- [ ] Packs de crédits actifs dans le dashboard
- [ ] Webhooks de confirmation de paiement
- [ ] E-mails transactionnels (achat, confirmation, facture)

**Estimation** : 2–3 semaines

---

## 🔜 Phase 5 — Croissance & Optimisation

**Objectif** : Améliorer l'expérience, acquérir des utilisateurs et itérer.

- [ ] Analytics (Posthog ou Plausible)
- [ ] A/B testing sur la page d'accueil
- [ ] Internationalisation (i18n) — Anglais
- [ ] PWA (Progressive Web App) pour mobile
- [ ] Partage des images sur WhatsApp / Instagram depuis l'app
- [ ] Crédits de parrainage (referral)
- [ ] Programme affilié pour agences
- [ ] API publique pour intégrations partenaires

**Estimation** : ongoing

---

## 📊 KPIs à suivre dès Phase 2

| Métrique                        | Cible Phase 2 |
|---------------------------------|---------------|
| Utilisateurs inscrits           | 100+          |
| Photos uploadées                | 500+          |
| Taux d'inscription post-visite  | > 15%         |
| Temps moyen avant premier upload| < 2 min       |

---

## 🛠 Stack technique consolidée

| Composant       | Technologie choisie              |
|-----------------|----------------------------------|
| Frontend        | Next.js 15, TypeScript, Tailwind |
| Backend/BDD     | Supabase (Phase 2)               |
| Storage         | Supabase Storage (Phase 2)       |
| Auth            | Supabase Auth (Phase 2)          |
| IA génération   | Replicate / Fal.ai (Phase 3)     |
| Paiement        | Wave API + Orange Money (Phase 4)|
| Déploiement     | Vercel                           |
| Analytics       | Posthog (Phase 5)                |
