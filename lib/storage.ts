import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Crée un client Supabase avec la clé de service pour contourner le RLS côté serveur
export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

const BUCKET_NAME = "products";

/**
 * Uploade un fichier (Buffer) sur Supabase Storage dans le dossier de l'utilisateur
 * @param fileBuffer Le buffer du fichier
 * @param fileName Le nom unique du fichier
 * @param mimeType Le type MIME (ex: image/jpeg)
 * @param userId L'ID de l'utilisateur (pour organiser les dossiers)
 * @returns L'URL publique de l'image
 */
export async function uploadProductImage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  userId: string
): Promise<string> {
  if (!supabaseAdmin) {
    throw new Error("Supabase Admin client non configuré.");
  }

  const filePath = `${userId}/${Date.now()}-${fileName}`;

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Erreur d'upload Supabase Storage:", error);
    throw new Error(`Échec de l'upload: ${error.message}`);
  }

  // Obtenir l'URL publique de l'image
  const { data: publicUrlData } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
