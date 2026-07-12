import { NextRequest, NextResponse } from "next/server";
import { requireAuth, checkCredits, deductCredit } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadProductImage } from "@/lib/storage";
import Replicate from "replicate";

const replicate = process.env.REPLICATE_API_TOKEN
  ? new Replicate({ auth: process.env.REPLICATE_API_TOKEN })
  : null;

// ============================================================
// API : Générer des photos produit (Déduction crédit + Init projet)
// POST /api/generate
// ============================================================
export async function POST(req: NextRequest) {
  try {
    // 1. Authentification
    const userId = await requireAuth();

    // 2. Récupérer les fichiers du formulaire
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Aucune image fournie" }, { status: 400 });
    }

    if (files.length > 3) {
      return NextResponse.json({ error: "Maximum 3 images autorisées" }, { status: 400 });
    }

    // 3. Vérification des crédits
    const hasEnoughCredits = await checkCredits(userId, 1);
    if (!hasEnoughCredits) {
      return NextResponse.json(
        { error: "Crédits insuffisants. Veuillez recharger votre compte." },
        { status: 402 } // Payment Required
      );
    }

    // 4. Uploader les images sources vers Supabase Storage
    const inputImageUrls: string[] = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const publicUrl = await uploadProductImage(
        buffer,
        file.name,
        file.type,
        userId
      );
      inputImageUrls.push(publicUrl);
    }

    // 5. Créer le projet en DB (Statut PENDING)
    const project = await db.project.create({
      data: {
        userId,
        inputImageUrls,
        inputImageCount: inputImageUrls.length,
        status: "PROCESSING", // On commence le traitement
        creditsUsed: 1,
      },
    });

    // 6. Déduire 1 crédit de l'utilisateur (opération transactionnelle)
    await deductCredit(userId, project.id);

    // 7. Lancer la génération IA (Replicate) en arrière-plan
    if (!replicate) {
      console.warn("[WARNING] REPLICATE_API_TOKEN non configuré. Mode simulation activé.");
      // Mode simulation pour développement si pas de token Replicate
      simulateGeneration(project.id);
    } else {
      // Déclencher le processus d'in-painting / génération d'arrière-plan
      await triggerAIGeneration(project.id, inputImageUrls);
    }

    return NextResponse.json({
      success: true,
      projectId: project.id,
      message: "Génération lancée avec succès",
    });
  } catch (error) {
    console.error("[GENERATE_API_ERROR]", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}

// ============================================================
// FONCTION : Appel API Replicate avec Webhook
// ============================================================
async function triggerAIGeneration(projectId: string, inputImageUrls: string[]) {
  if (!replicate) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
  const webhookUrl = `${appUrl}/api/webhook/replicate?projectId=${projectId}`;

  try {
    // Utilisation d'un modèle populaire pour la mise en scène produit (ex: Flux Inpaint ou ControlNet)
    // Ici, on utilise un modèle standard de modification d'arrière-plan produit
    const prediction = await replicate.predictions.create({
      // Modèle : Black Forest Labs - Flux Dev (ou autre modèle adapté au produit)
      version: "black-forest-labs/flux-dev",
      input: {
        image: inputImageUrls[0], // Première image comme produit principal
        prompt: "A professional studio product photograph of the item, clean background, soft lighting, 8k resolution, commercial advertising quality",
        num_outputs: 5, // On demande 5 variations
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 90,
      },
      webhook: webhookUrl,
      webhook_events_filter: ["completed"],
    });

    // Sauvegarder l'ID de prédiction Replicate en base
    await db.project.update({
      where: { id: projectId },
      data: {
        aiPrompt: prediction.id, // On stocke l'ID de prédiction pour le webhook
        aiModel: "flux-dev",
      },
    });
  } catch (error) {
    console.error(`[REPLICATE_TRIGGER_ERROR] Projet ${projectId}:`, error);
    await db.project.update({
      where: { id: projectId },
      data: {
        status: "FAILED",
        errorMessage: "Échec de l'initialisation de l'IA",
      },
    });
  }
}

// ============================================================
// FONCTION DE SIMULATION (Pour tests sans clé API)
// ============================================================
async function simulateGeneration(projectId: string) {
  setTimeout(async () => {
    try {
      // Liste d'exemples d'images produit magnifiques pour la démo
      const demoOutputs = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      ];

      await db.project.update({
        where: { id: projectId },
        data: {
          status: "COMPLETED",
          outputImageUrls: demoOutputs,
          outputImageCount: demoOutputs.length,
          aiModel: "simulation-mode",
        },
      });
      console.log(`[SIMULATION] Projet ${projectId} terminé avec succès.`);
    } catch (error) {
      console.error("[SIMULATION_ERROR]", error);
    }
  }, 10000); // 10 secondes de simulation
}
