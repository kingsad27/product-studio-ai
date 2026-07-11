// ============================================================
// CONFIGURATION COMPLÈTE DES PRIX — ProductStudio AI
// 1 crédit = 1 session (jusqu'à 3 photos en entrée → 5 photos générées)
// ============================================================

export const PRICING_PLANS = {
  FREE: {
    id: "free",
    name: "Gratuit",
    credits: 1,
    photosPerCredit: 5,
    totalPhotos: 5,
    prices: { XOF: 0, EUR: 0, USD: 0 },
    highlight: false,
    badge: null,
    description: "Pour découvrir la magie",
    cta: "Essayer gratuitement",
    stripePriceIds: { XOF: "", EUR: "", USD: "" },
  },
  STARTER: {
    id: "starter",
    name: "Starter",
    credits: 3,
    photosPerCredit: 5,
    totalPhotos: 15,
    prices: { XOF: 2250, EUR: 3.49, USD: 3.99 },
    highlight: false,
    badge: null,
    description: "Idéal pour tester à grande échelle",
    cta: "Choisir Starter",
    stripePriceIds: {
      XOF: process.env.STRIPE_STARTER_XOF ?? "",
      EUR: process.env.STRIPE_STARTER_EUR ?? "",
      USD: process.env.STRIPE_STARTER_USD ?? "",
    },
  },
  STUDIO: {
    id: "studio",
    name: "Studio",
    credits: 7,
    photosPerCredit: 5,
    totalPhotos: 35,
    prices: { XOF: 4950, EUR: 7.49, USD: 8.99 },
    highlight: true, // ⭐ Plan mis en avant
    badge: "Meilleure valeur",
    description: "Le choix des vendeurs sérieux",
    cta: "Choisir Studio",
    stripePriceIds: {
      XOF: process.env.STRIPE_STUDIO_XOF ?? "",
      EUR: process.env.STRIPE_STUDIO_EUR ?? "",
      USD: process.env.STRIPE_STUDIO_USD ?? "",
    },
  },
  BUSINESS: {
    id: "business",
    name: "Business",
    credits: 15,
    photosPerCredit: 5,
    totalPhotos: 75,
    prices: { XOF: 10950, EUR: 16.99, USD: 19.99 },
    highlight: false,
    badge: "Pour les pros",
    description: "Catalogue complet, volume élevé",
    cta: "Choisir Business",
    stripePriceIds: {
      XOF: process.env.STRIPE_BUSINESS_XOF ?? "",
      EUR: process.env.STRIPE_BUSINESS_EUR ?? "",
      USD: process.env.STRIPE_BUSINESS_USD ?? "",
    },
  },
} as const;

export type PlanId = keyof typeof PRICING_PLANS;
export type Currency = "XOF" | "EUR" | "USD";

// ============================================================
// RÈGLES MÉTIER
// ============================================================
export const CREDIT_RULES = {
  maxInputImages: 3,        // max 3 photos en entrée par session
  outputImagesPerCredit: 5, // 5 photos générées en sortie
  freeRegenerations: 1,     // 1 retouche gratuite par session
  creditsExpire: false,     // les crédits n'expirent pas
} as const;

// ============================================================
// CARTOGRAPHIE PAYS → DEVISE (détection automatique par IP)
// ============================================================
export const COUNTRY_CURRENCY_MAP: Record<string, Currency> = {
  // Zone BCEAO (CFA Ouest)
  SN: "XOF", CI: "XOF", ML: "XOF", BF: "XOF",
  GN: "XOF", TG: "XOF", BJ: "XOF", NE: "XOF", GW: "XOF",
  // Zone BEAC (CFA Central)
  CM: "XOF", CG: "XOF", GA: "XOF", CF: "XOF", TD: "XOF", GQ: "XOF",
  // Europe
  FR: "EUR", BE: "EUR", LU: "EUR", CH: "EUR",
  DE: "EUR", ES: "EUR", IT: "EUR", PT: "EUR",
  NL: "EUR", AT: "EUR", GR: "EUR", FI: "EUR",
  // Afrique du Nord (diaspora)
  MA: "EUR", DZ: "EUR", TN: "EUR",
};

export const DEFAULT_CURRENCY: Currency = "USD";

// ============================================================
// AFFICHAGE DES PRIX
// ============================================================
export const CURRENCY_CONFIG: Record<Currency, { symbol: string; locale: string; decimals: boolean }> = {
  XOF: { symbol: "FCFA", locale: "fr-SN", decimals: false },
  EUR: { symbol: "€",    locale: "fr-FR", decimals: true  },
  USD: { symbol: "$",    locale: "en-US", decimals: true  },
};

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === "XOF") {
    return `${amount.toLocaleString("fr-SN")} FCFA`;
  }
  return new Intl.NumberFormat(CURRENCY_CONFIG[currency].locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// ============================================================
// COMPATIBILITÉ LEGACY (ancienne structure conservée)
// ============================================================
export type CreditPack = {
  id: string; name: string; credits: number;
  priceFCFA: number; priceUSD: number;
  pricePerCreditFCFA: number; popular?: boolean;
  badge?: string; description: string;
};

export const creditRules = {
  creditsPerImage: 1, creditsExpire: false, expiryDays: null,
  refundPolicy: "Remboursement possible en cas d'erreur technique confirmée.",
  minimumPurchase: 2250,
};

export type CreditRules = typeof creditRules;
