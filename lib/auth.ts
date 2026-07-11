import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextResponse } from "next/server";

// ============================================================
// Récupère l'utilisateur Clerk authentifié ou lève une erreur
// À utiliser dans TOUTES les routes API protégées
// ============================================================
export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  return userId;
}

// ============================================================
// Récupère le profil complet depuis la DB (crédits, etc.)
// Crée l'utilisateur en DB s'il n'existe pas encore
// ============================================================
export async function getCurrentUser(clerkUserId: string) {
  const user = await db.user.findUnique({
    where: { id: clerkUserId },
  });
  return user;
}

// ============================================================
// Vérifie que l'utilisateur a assez de crédits
// ============================================================
export async function checkCredits(userId: string, required: number = 1) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user || user.credits < required) {
    return false;
  }
  return true;
}

// ============================================================
// Déduit des crédits de façon atomique (transaction Prisma)
// Empêche les déductions concurrentes (race conditions)
// ============================================================
export async function deductCredit(userId: string, projectId: string) {
  return await db.$transaction(async (tx) => {
    // Vérifier et déduire en une seule opération atomique
    const user = await tx.user.update({
      where: {
        id: userId,
        credits: { gte: 1 }, // Guard: seulement si crédits >= 1
      },
      data: {
        credits: { decrement: 1 },
      },
    });

    return user;
  });
}

// ============================================================
// Vérifie que le projet appartient bien à l'utilisateur
// CRITIQUE : évite qu'un user accède aux projets d'un autre
// ============================================================
export async function requireProjectOwnership(projectId: string, userId: string) {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      userId: userId, // Double vérification propriétaire
    },
  });

  if (!project) {
    throw new Error("FORBIDDEN");
  }

  return project;
}

// ============================================================
// Helper pour les routes API — retourne une réponse d'erreur formatée
// ============================================================
export function handleAuthError(error: unknown): NextResponse {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    if (error.message === "INSUFFICIENT_CREDITS") {
      return NextResponse.json({ error: "Crédits insuffisants" }, { status: 402 });
    }
  }
  console.error("[AUTH_ERROR]", error);
  return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
}
