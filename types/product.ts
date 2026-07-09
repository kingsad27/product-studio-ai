/**
 * Types liés aux produits uploadés par l'utilisateur
 */

export type Product = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  category?: ProductCategory;
  originalImageUrl: string;    // URL de la photo brute uploadée
  thumbnailUrl?: string;       // Miniature générée
  metadata?: ProductMetadata;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductCategory =
  | "vetements"              // Vêtements & mode
  | "electronique"           // Électronique & accessoires
  | "alimentaire"            // Alimentation & boissons
  | "cosmetique"             // Cosmétiques & beauté
  | "maison"                 // Maison & décoration
  | "bijoux"                 // Bijoux & accessoires
  | "sport"                  // Sport & fitness
  | "autre";                 // Autre

export type ProductStatus =
  | "uploaded"               // Photo uploadée, analyse en attente
  | "analyzing"              // Analyse IA en cours
  | "ready"                  // Prêt pour génération
  | "generating"             // Génération en cours
  | "done"                   // Générations terminées
  | "error";                 // Erreur

export type ProductMetadata = {
  originalFileName: string;
  fileSizeBytes: number;
  mimeType: string;
  width?: number;
  height?: number;
  aiAnalysis?: {
    detectedCategory?: string;
    detectedColors?: string[];
    detectedObjects?: string[];
    confidence?: number;
    analyzedAt?: Date;
  };
};

export type ProductUploadInput = {
  name?: string;
  category?: ProductCategory;
  file: File;
};
