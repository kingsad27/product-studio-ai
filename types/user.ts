/**
 * Types liés aux utilisateurs
 */

export type User = {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  phoneNumber?: string;           // Utile pour Mobile Money
  role: UserRole;
  plan: UserPlan;
  creditBalance: number;          // Crédits disponibles
  locale: "fr" | "en";
  country?: string;               // Ex: "SN", "CI", "ML"...
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
};

export type UserRole =
  | "user"                        // Utilisateur standard
  | "admin"                       // Administrateur
  | "support";                    // Support client

export type UserPlan =
  | "free"                        // Gratuit (crédits épuisés)
  | "active";                     // A des crédits disponibles

export type UserProfile = Pick<
  User,
  "id" | "email" | "displayName" | "avatarUrl" | "phoneNumber" | "locale" | "country"
>;

export type UserStats = {
  userId: string;
  totalImagesGenerated: number;
  totalCreditsSpent: number;
  totalCreditsPurchased: number;
  lastGenerationAt?: Date;
};

export type AuthSession = {
  user: User;
  accessToken: string;
  expiresAt: Date;
};
