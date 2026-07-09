# Product Requirements Document — Product Studio AI

## 1. Le problème

Les commerçants, vendeurs WhatsApp, boutiques en ligne et entrepreneurs d'Afrique de l'Ouest
font face à un défi majeur : **leurs photos produit manquent de professionnalisme**.

Ils n'ont pas accès à :
- Un studio photo
- Un photographe professionnel
- Des compétences en retouche photo ou IA (Photoshop, Midjourney, etc.)
- Un budget pour externaliser la création de visuels

Le résultat : des photos floues, mal éclairées, sur fond encombré, qui réduisent la confiance
des acheteurs et impactent négativement les ventes.

---

## 2. La solution

**Product Studio AI** est un SaaS qui permet à n'importe qui de transformer une photo prise
avec un téléphone en visuels professionnels prêts à l'emploi, grâce à l'intelligence artificielle.

### Principes fondamentaux :
- **Zéro prompt** : l'utilisateur n'a pas à décrire quoi que ce soit
- **Simple** : upload → résultats. Pas plus de 3 clics
- **Accessible** : interface mobile-friendly, textes en français
- **Abordable** : prix adaptés au marché local (FCFA)

### Types de visuels générés (Phase 2) :
| Style        | Description                                      |
|--------------|--------------------------------------------------|
| Studio       | Fond neutre, éclairage professionnel             |
| Lifestyle    | Mise en ambiance inspirante                       |
| Mannequin    | Avec mannequin IA (mode, bijoux)                 |
| Mise en situation | Contexte réel (cuisine, bureau, extérieur)  |
| Flat lay     | Vue de dessus                                    |
| Extérieur    | Environnement outdoor                            |

---

## 3. Public cible

### Marché primaire : Afrique de l'Ouest
- 🇸🇳 Sénégal, 🇨🇮 Côte d'Ivoire, 🇲🇱 Mali, 🇧🇫 Burkina Faso, 🇬🇳 Guinée, 🇹🇬 Togo, 🇧🇯 Bénin

### Segments d'utilisateurs :
1. **Vendeurs WhatsApp** — catalogues, stories, statuts
2. **Instagram Sellers** — posts, reels, publicités
3. **Boutiques en ligne** — fiches produits professionnelles
4. **Commerçants physiques** — visuels pour leurs réseaux sociaux
5. **Agences digitales** — production de contenu en volume
6. **Entrepreneurs solo** — image professionnelle dès le départ

### Profil type de l'utilisateur MVP :
- Non-technique
- Utilise un smartphone Android
- Vend via WhatsApp ou Instagram
- Budget limité (< 10 000 FCFA/mois pour les outils)
- Parle français (et parfois une langue locale)

---

## 4. Le MVP (Phase 1 — actuelle)

### Objectif MVP :
Valider l'intérêt du produit et préparer une base technique propre avant d'intégrer l'IA.

### Ce que le MVP contient :
- [x] Structure du projet Next.js (App Router, TypeScript, Tailwind CSS)
- [x] Pages principales : accueil, dashboard, upload, galerie, tarifs, connexion
- [x] Design system complet (couleurs, typographie, composants UI)
- [x] Configuration produit (site.ts, pricing.ts)
- [x] Types TypeScript (credit, product, generation, user)
- [x] Constants et routes centralisées
- [x] Documentation produit (ce fichier, roadmap, credits-system)

### Ce que le MVP ne contient pas encore :
- [ ] Authentification réelle (Supabase Auth)
- [ ] Upload de fichiers (Supabase Storage)
- [ ] Génération IA (API d'image AI)
- [ ] Paiement (Mobile Money, Stripe)
- [ ] Base de données (Supabase)
- [ ] Emails transactionnels

---

## 5. Modèle crédit

### Principe :
- **1 crédit = 1 image générée**
- Les crédits sont achetés en packs
- Les crédits **n'expirent jamais**
- Pas d'abonnement mensuel

### Packs disponibles :
| Pack        | Crédits | Prix FCFA | Prix / image |
|-------------|---------|-----------|--------------|
| Découverte  | 5       | 1 000     | 200 FCFA     |
| Starter     | 15      | 2 500     | 167 FCFA     |
| Business    | 40      | 6 000     | 150 FCFA     |
| Pro         | 100     | 12 000    | 120 FCFA     |

### Règles :
- Remboursement possible en cas d'erreur technique confirmée
- Pas de remboursement pour les images déjà générées
- Les crédits bonus offerts ne sont pas remboursables

---

## 6. Métriques de succès (Phase 2)

- Taux de conversion upload → génération
- Taux de rétention après premier achat de crédits
- NPS (satisfaction utilisateur)
- Nombre d'images générées par utilisateur actif
- Churn rate
