/**
 * Types liés au système de crédits
 */

export type CreditTransaction = {
  id: string;
  userId: string;
  amount: number;          // positif = achat, négatif = consommation
  type: CreditTransactionType;
  description: string;
  packId?: string;
  generationId?: string;
  createdAt: Date;
};

export type CreditTransactionType =
  | "purchase"             // Achat de pack
  | "consumption"          // Utilisation pour générer une image
  | "refund"               // Remboursement technique
  | "bonus"                // Crédits offerts
  | "admin_adjustment";    // Ajustement manuel par admin

export type CreditBalance = {
  userId: string;
  total: number;           // Total crédits disponibles
  used: number;            // Crédits consommés (historique)
  updatedAt: Date;
};

export type CreditPurchase = {
  id: string;
  userId: string;
  packId: string;
  packName: string;
  creditsAdded: number;
  amountPaidFCFA: number;
  paymentMethod: PaymentMethod;
  status: PurchaseStatus;
  createdAt: Date;
};

export type PaymentMethod =
  | "mobile_money"         // Orange Money, Wave, MTN Money...
  | "card"                 // Carte bancaire
  | "bank_transfer";       // Virement

export type PurchaseStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded";
