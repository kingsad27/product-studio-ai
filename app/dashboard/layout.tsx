import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { credits: true, isOnboarded: true },
  });

  if (!user) redirect("/onboarding");
  if (!user.isOnboarded) redirect("/onboarding");

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFFCF8]">
      {/* Sidebar fixe */}
      <Sidebar credits={user.credits} />

      {/* Contenu scrollable */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
