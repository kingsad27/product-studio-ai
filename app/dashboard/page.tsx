import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import UploadForm from "@/components/dashboard/UploadForm";
import WelcomeGiftModal from "@/components/dashboard/WelcomeGiftModal";
import Link from "next/link";
import { Sparkles, History, ShoppingBag, Bell, TrendingUp, Camera } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Mon Espace | ProductStudio AI",
  description: "Générez vos photos produit professionnelles.",
};

interface DashboardPageProps {
  searchParams: Promise<{ welcome?: string }>;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { userId } = await auth();
  const resolvedParams = await searchParams;

  if (!userId) redirect("/sign-in");

  const [currentUser_, dbUser] = await Promise.all([
    currentUser(),
    db.user.findUnique({
      where: { id: userId },
      include: {
        projects: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    }),
  ]);

  if (!dbUser) redirect("/onboarding");
  if (!dbUser.isOnboarded) redirect("/onboarding");

  const isNewUser = resolvedParams.welcome === "1";
  const firstName = dbUser.firstName ?? currentUser_?.firstName ?? "toi";
  const credits = dbUser.credits;
  const recentProjects = dbUser.projects ?? [];
  const totalGenerated = recentProjects.reduce((s, p) => s + (p.outputImageCount ?? 0), 0);

  return (
    <>
      <WelcomeGiftModal showOnMount={isNewUser} />

      <div className="min-h-full p-6 lg:p-8">
        {/* ── Top bar ─────────────────────────────────────── */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">{getGreeting()},</p>
            <h1 className="text-2xl font-extrabold text-slate-800">
              {firstName} <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">Votre espace créatif personnel</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Cloche notifs (décorative pour l'instant) */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-white text-slate-400 shadow-sm hover:border-orange-300 hover:text-orange-500 transition-all">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
            </button>
            {/* Badge crédits */}
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm hover:bg-orange-50 transition-all"
            >
              <span className="text-lg">💎</span>
              {credits} crédit{credits > 1 ? "s" : ""}
            </Link>
          </div>
        </div>

        {/* ── Bannière CTA principale ───────────────────── */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 p-6 shadow-xl shadow-orange-500/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-100">
                ✨ Shooting IA
              </p>
              <h2 className="mt-1 text-xl font-extrabold leading-snug">
                Créer mes premières images pro
              </h2>
              <p className="mt-1 text-sm text-orange-100">
                Upload 1 à 3 photos → obtenez 5 visuels HD en 10s
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-orange-100">
                <span className="flex items-center gap-1"><Camera size={12} /> Sans studio</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Sparkles size={12} /> Rendu professionnel</span>
                <span>·</span>
                <span>1 crédit</span>
              </div>
            </div>
            <div className="shrink-0">
              <div className="text-right text-xs font-semibold text-orange-100 mb-2">
                Solde : {credits} crédit{credits > 1 ? "s" : ""}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-1 py-1 text-white text-sm font-bold border border-white/30">
                <span className="rounded-full bg-white px-4 py-2 text-orange-600 font-black text-sm shadow">
                  Commencer ↓
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* ── Upload (prioritaire) ─────────────────────── */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Nouveau shooting</h3>
                  <p className="text-xs text-slate-400">Jusqu&apos;à 3 photos → 5 visuels pro</p>
                </div>
                <span className="ml-auto rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 border border-orange-100">
                  1 crédit
                </span>
              </div>
              <UploadForm />
            </div>
          </div>

          {/* ── Colonne latérale ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Stats rapides */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Photos générées", value: totalGenerated, icon: "🖼️", color: "from-violet-50 to-purple-50 border-violet-100" },
                { label: "Sessions", value: recentProjects.length, icon: "📸", color: "from-blue-50 to-indigo-50 border-blue-100" },
              ].map((stat, i) => (
                <div key={i} className={`rounded-2xl border bg-gradient-to-br ${stat.color} p-4`}>
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="mt-2 text-2xl font-black text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tendance / Astuce */}
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Astuce du jour</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Combinez jusqu&apos;à 3 produits</strong> dans une même session pour maximiser vos crédits et obtenir des visuels variés.
              </p>
            </div>

            {/* Historique récent */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <History size={14} className="text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-700">Sessions récentes</h3>
                </div>
                <Link href="/dashboard/history" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                  Tout voir →
                </Link>
              </div>

              {recentProjects.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center text-slate-400">
                  <span className="text-3xl mb-2">📷</span>
                  <p className="text-sm font-medium">Aucune session encore</p>
                  <p className="text-xs mt-1">Votre historique apparaîtra ici</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/dashboard/results/${project.id}`}
                      className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        project.status === "COMPLETED" ? "bg-emerald-400" :
                        project.status === "PROCESSING" ? "bg-amber-400 animate-pulse" :
                        project.status === "FAILED" ? "bg-red-400" : "bg-slate-300"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate">
                          Session du {new Date(project.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        </p>
                        <p className="text-xs text-slate-400">
                          {project.inputImageCount} photo{project.inputImageCount > 1 ? "s" : ""} → {project.outputImageCount} générée{project.outputImageCount > 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className="text-xs text-slate-300 group-hover:text-orange-400 transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recharger */}
            <Link
              href="/pricing"
              className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 p-4 hover:shadow-md transition-all group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Acheter des crédits</p>
                <p className="text-xs text-slate-500">À partir de 2 250 FCFA</p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}
