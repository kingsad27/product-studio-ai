export const siteConfig = {
  name: "Product Studio AI",
  shortName: "ProductStudio",
  description:
    "Transformez une simple photo produit en visuels professionnels grâce à l'intelligence artificielle. Sans prompt. Sans compétences techniques.",
  tagline: "Des visuels pro en quelques secondes",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://productstudio.ai",
  locale: "fr",
  defaultLanguage: "fr" as const,
  supportedLanguages: ["fr", "en"] as const,
  targetMarket: {
    primary: "Afrique de l'Ouest",
    regions: ["Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Togo", "Bénin"],
    currencies: ["FCFA", "USD"],
    defaultCurrency: "FCFA" as const,
  },
  social: {
    whatsapp: "",
    instagram: "",
    twitter: "",
  },
  contact: {
    email: "support@productstudio.ai",
  },
  features: {
    aiGeneration: false,     // Activé en Phase 2
    auth: false,             // Activé en Phase 2
    payments: false,         // Activé en Phase 3
    mobileMoney: false,      // Activé en Phase 3
    analytics: false,        // Activé plus tard
  },
  seo: {
    defaultTitle: "ProductStudio — Photos produit professionnelles avec une simple photo téléphone",
    titleTemplate: "%s | ProductStudio",
    defaultDescription:
      "Transformez une photo téléphone en photos produit professionnelles prêtes pour votre boutique, vos réseaux sociaux et vos publicités.",
    keywords: [
      "génération image produit",
      "photo produit IA",
      "visuels e-commerce",
      "boutique en ligne",
      "Afrique de l'Ouest",
      "WhatsApp vendeur",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
