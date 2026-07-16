import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata: Metadata = {
  title: "Bienvenue | ProductStudio AI",
  description: "Personnalisez votre expérience",
};

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  // On vérifie si l'utilisateur est déjà onboardé
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { isOnboarded: true },
  });

  if (user?.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#FFFCF8]">
      <OnboardingFlow />
    </main>
  );
}
