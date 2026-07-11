import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

// ============================================================
// WEBHOOK CLERK → Supabase
// Crée automatiquement un profil en DB à chaque inscription
// Route : POST /api/webhook/clerk
// ============================================================
export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET manquant");
    return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
  }

  // Vérification de la signature Svix (sécurité webhook)
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Headers manquants" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Vérification cryptographique de l'origine Clerk
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: { type: string; data: Record<string, unknown> };

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as { type: string; data: Record<string, unknown> };
  } catch {
    console.error("Signature webhook invalide");
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  // Traitement des événements Clerk
  const { type, data } = evt;

  // ── Nouvel utilisateur créé ──
  if (type === "user.created") {
    const email =
      (data.email_addresses as Array<{ email_address: string }>)?.[0]?.email_address ?? "";
    const userId = data.id as string;

    try {
      await db.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email,
          credits: 1, // 1 crédit gratuit à l'inscription
          currency: "XOF", // Devise par défaut, mise à jour lors de la première visite
        },
      });
      console.log(`[WEBHOOK] Utilisateur créé en DB: ${userId}`);
    } catch (error) {
      console.error("[WEBHOOK] Erreur création utilisateur:", error);
      return NextResponse.json({ error: "Erreur DB" }, { status: 500 });
    }
  }

  // ── Email mis à jour ──
  if (type === "user.updated") {
    const email =
      (data.email_addresses as Array<{ email_address: string }>)?.[0]?.email_address ?? "";
    const userId = data.id as string;

    await db.user.updateMany({
      where: { id: userId },
      data: { email },
    });
  }

  // ── Utilisateur supprimé ──
  if (type === "user.deleted") {
    const userId = data.id as string;
    // Les projets et achats sont supprimés en cascade (onDelete: Cascade dans le schéma)
    await db.user.deleteMany({ where: { id: userId } });
    console.log(`[WEBHOOK] Utilisateur supprimé: ${userId}`);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
