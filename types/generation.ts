/**
 * Types liés aux générations d'images IA
 */

export type Generation = {
  id: string;
  userId: string;
  productId: string;
  style: GenerationStyle;
  status: GenerationStatus;
  creditsUsed: number;          // Toujours 1 pour MVP
  prompt?: string;              // Prompt auto-généré (non visible utilisateur)
  resultImageUrl?: string;      // URL de l'image générée
  thumbnailUrl?: string;
  errorMessage?: string;
  createdAt: Date;
  completedAt?: Date;
};

export type GenerationStyle =
  | "studio"                    // Fond studio neutre, éclairage professionnel
  | "lifestyle"                 // Mise en situation lifestyle
  | "mannequin"                 // Avec mannequin (vêtements)
  | "real_context"              // Mise en situation réelle (cuisine, bureau...)
  | "flat_lay"                  // Vue de dessus, fond plat
  | "outdoor";                  // En extérieur

export type GenerationStatus =
  | "pending"                   // En attente de traitement
  | "processing"                // IA en cours de génération
  | "completed"                 // Image générée avec succès
  | "failed";                   // Échec de la génération

export type GenerationRequest = {
  productId: string;
  styles: GenerationStyle[];    // L'utilisateur peut demander plusieurs styles
};

export type GenerationResult = {
  generationId: string;
  imageUrl: string;
  style: GenerationStyle;
  creditsUsed: number;
};

// Labels affichés en français pour chaque style
export const GENERATION_STYLE_LABELS: Record<GenerationStyle, string> = {
  studio: "Fond studio",
  lifestyle: "Lifestyle",
  mannequin: "Avec mannequin",
  real_context: "Mise en situation",
  flat_lay: "Vue de dessus",
  outdoor: "En extérieur",
};
