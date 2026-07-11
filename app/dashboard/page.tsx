import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import UploadForm from "@/components/dashboard/UploadForm";
import CreditsBadge from "@/components/dashboard/CreditsBadge";
import Link from "next/link";
import { Sparkles, History, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Mon Espace | ProductStudio AI",
  description: "Générez vos photos produit professionnelles.",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  // Protection server-side (double avec le middleware)
  if (!userId) redirect("/sign-in");

  // Récupérer l'utilisateur et ses projets récents
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      projects: {
        orderBy: { createdAt: "desc" },
        take: 6,
      },
    },
  });

  // Si le user n'est pas encore en DB (webhook pas encore déclenché), on crée à la volée
  const currentUser = user ?? await db.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email: "", credits: 1 },
  });

  const credits = currentUser.credits;
  const recentProjects = currentUser.projects ?? [];
  const totalGenerated = recentProjects.reduce(
    (sum, p) => sum + (p.outputImageCount ?? 0), 0
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20 px-4">
        <div className="mx-auto max-w-5xl">

          {/* En-tête */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Mon Espace</h1>
              <p className="text-slate-500 text-sm">Transformez vos photos en visuels professionnels</p>
            </div>
            <CreditsBadge credits={credits} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Crédits", value: credits, icon: "💎", color: "bg-violet-50 border-violet-100" },
              { label: "Sessions", value: recentProjects.length, icon: "📸", color: "bg-blue-50 border-blue-100" },
              { label: "Photos générées", value: totalGenerated, icon: "🖼️", color: "bg-emerald-50 border-emerald-100" },
              { label: "Retouches gratuites", value: `${recentProjects.filter(p => p.regenerationsUsed < p.regenerationsMax).length}`, icon: "✨", color: "bg-orange-50 border-orange-100" },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-3 p-5 rounded-2xl border ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Section upload (prioritaire) */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Nouveau shooting</h2>
                    <p className="text-xs text-slate-500">Jusqu&apos;à 3 photos → 5 visuels pro</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                    1 crédit
                  </span>
                </div>
                <UploadForm />
              </div>
            </div>

            {/* Colonne latérale */}
            <div className="lg:col-span-2 space-y-4">

              {/* Raccourci recharger */}
              <Link
                href="/pricing"
                className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-5 hover:shadow-md transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white group-hover:scale-110 transition-transform">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Acheter des crédits</p>
                  <p className="text-xs text-slate-500">À partir de 2 250 FCFA</p>
                </div>
              </Link>

              {/* Historique récent */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-4">
                  <History size={16} className="text-slate-400" />
                  <h3 className="font-bold text-slate-800 text-sm">Dernières sessions</h3>
                </div>

                {recentProjects.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-3xl mb-2">📷</p>
                    <p className="text-sm">Aucune session encore</p>
                    <p className="text-xs">Votre historique apparaîtra ici</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/dashboard/results/${project.id}`}
                        className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className={`h-2 w-2 rounded-full ${
                          project.status === "COMPLETED" ? "bg-green-400" :
                          project.status === "PROCESSING" ? "bg-yellow-400 animate-pulse" :
                          project.status === "FAILED" ? "bg-red-400" : "bg-slate-300"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">
                            Session du {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                          <p className="text-xs text-slate-400">
                            {project.inputImageCount} photo{project.inputImageCount > 1 ? "s" : ""} → {project.outputImageCount} générée{project.outputImageCount > 1 ? "s" : ""}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Conseil */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs text-blue-700 font-medium">
                  💡 <strong>Astuce :</strong> Combinez jusqu&apos;à 3 articles (haut + bas + chaussures) dans une même session pour maximiser vos crédits !
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
