import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { firstName, phone, goal, acquisitionChannel } = body;

    // Validation basique
    if (!firstName?.trim() || !phone?.trim() || !goal || !acquisitionChannel) {
      return new NextResponse("Données manquantes", { status: 400 });
    }

    // Récupérer l'email depuis Clerk si l'user n'est pas encore en DB
    // (cas où le webhook Clerk est en retard)
    let email = "";
    try {
      const clerkUser = await currentUser();
      email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
    } catch {
      // Non bloquant — l'email peut être vide temporairement
    }

    // Upsert : crée l'user s'il n'existe pas encore, met à jour sinon
    const user = await db.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email,
        credits: 1, // Crédit d'essai offert
        firstName: firstName.trim(),
        phone,
        goal,
        acquisitionChannel,
        isOnboarded: true,
      },
      update: {
        firstName: firstName.trim(),
        phone,
        goal,
        acquisitionChannel,
        isOnboarded: true,
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("[ONBOARDING_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
