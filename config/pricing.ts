export type CreditPack = {
  id: string;
  name: string;
  credits: number;
  priceFCFA: number;
  priceUSD: number;
  pricePerCreditFCFA: number;
  popular?: boolean;
  badge?: string;
  description: string;
};

export const creditPacks: CreditPack[] = [
  {
    id: "decouverte",
    name: "Découverte",
    credits: 5,
    priceFCFA: 1000,
    priceUSD: 1.6,
    pricePerCreditFCFA: 200,
    description: "Parfait pour tester le service et découvrir ses possibilités.",
  },
  {
    id: "starter",
    name: "Starter",
    credits: 15,
    priceFCFA: 2500,
    priceUSD: 4,
    pricePerCreditFCFA: 167,
    description: "Idéal pour les petits vendeurs et créateurs débutants.",
  },
  {
    id: "business",
    name: "Business",
    credits: 40,
    priceFCFA: 6000,
    priceUSD: 9.5,
    pricePerCreditFCFA: 150,
    popular: true,
    badge: "Populaire",
    description: "Le choix des boutiques actives et agences en croissance.",
  },
  {
    id: "pro",
    name: "Pro",
    credits: 100,
    priceFCFA: 12000,
    priceUSD: 19,
    pricePerCreditFCFA: 120,
    badge: "Meilleure valeur",
    description: "Pour les professionnels et agences avec un fort volume.",
  },
];

export const creditRules = {
  creditsPerImage: 1,
  creditsExpire: false,
  expiryDays: null,
  refundPolicy: "Remboursement possible en cas d'erreur technique confirmée.",
  minimumPurchase: 1000, // FCFA
};

export type CreditRules = typeof creditRules;
