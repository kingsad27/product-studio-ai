import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireProjectOwnership } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// API : Récupérer le statut/résultats d'une session
// GET /api/projects/[projectId]
// ============================================================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const userId = await requireAuth();

    // Vérifier les droits du propriétaire
    const project = await requireProjectOwnership(projectId, userId);

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
      }
      if (error.message === "FORBIDDEN") {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
      }
    }
    console.error("[PROJECTS_GET_ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
