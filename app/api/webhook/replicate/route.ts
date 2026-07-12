import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadProductImage } from "@/lib/storage";

// ============================================================
// WEBHOOK REPLICATE → Supabase
// Récupère les photos générées et les télécharge sur notre stockage
// Route : POST /api/webhook/replicate?projectId=xxx
// ============================================================
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "ID de projet manquant" }, { status: 400 });
  }

  try {
    const payload = await req.json();
    const { status, output, error } = payload;

    // Récupérer le projet concerné
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { userId: true, status: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    }

    // Si le projet a déjà été traité (sécurité contre les requêtes dupliquées)
    if (project.status === "COMPLETED" || project.status === "FAILED") {
      return NextResponse.json({ message: "Projet déjà traité" }, { status: 200 });
    }

    // ── Échec de la génération IA ──
    if (status === "failed" || status === "canceled" || error) {
      console.error(`[REPLICATE_WEBHOOK] Échec projet ${projectId}:`, error);

      // On rembourse le crédit à l'utilisateur (règle commerciale équitable)
      await db.$transaction([
        db.project.update({
          where: { id: projectId },
          data: {
            status: "FAILED",
            errorMessage: error || "Annulé par l'IA",
          },
        }),
        db.user.update({
          where: { id: project.userId },
          data: {
            credits: { increment: 1 }, // Remboursement
          },
        }),
      ]);

      return NextResponse.json({ message: "Échec enregistré et crédit remboursé" }, { status: 200 });
    }

    // ── Succès de la génération IA ──
    if (status === "succeeded" && Array.isArray(output)) {
      console.log(`[REPLICATE_WEBHOOK] Succès projet ${projectId}. Téléchargement des images...`);

      const uploadedImageUrls: string[] = [];

      // Télécharger chaque image générée pour l'héberger nous-mêmes sur Supabase
      // Évite que les liens Replicate expirent après quelques jours
      for (let i = 0; i < output.length; i++) {
        const imageUrl = output[i];
        try {
          const response = await fetch(imageUrl);
          if (!response.ok) throw new Error("Échec du téléchargement");

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Upload dans notre propre bucket
          const localUrl = await uploadProductImage(
            buffer,
            `result-${i + 1}.webp`,
            "image/webp",
            project.userId
          );
          uploadedImageUrls.push(localUrl);
        } catch (downloadError) {
          console.error(`Impossible de sauvegarder localement l'image ${imageUrl}:`, downloadError);
          // Si l'upload échoue, on garde l'URL temporaire de Replicate en secours
          uploadedImageUrls.push(imageUrl);
        }
      }

      // Mettre à jour le projet avec les liens définitifs
      await db.project.update({
        where: { id: projectId },
        data: {
          status: "COMPLETED",
          outputImageUrls: uploadedImageUrls,
          outputImageCount: uploadedImageUrls.length,
        },
      });

      console.log(`[REPLICATE_WEBHOOK] Projet ${projectId} mis à jour avec succès.`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ message: "Statut non géré" }, { status: 200 });
  } catch (err) {
    console.error("[REPLICATE_WEBHOOK_ERROR]", err);
    return NextResponse.json({ error: "Erreur interne du webhook" }, { status: 500 });
  }
}
