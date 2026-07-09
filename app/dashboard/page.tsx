import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Gérez vos générations d'images et vos crédits.",
};

export default function DashboardPage() {
  // Données mock pour le MVP
  const mockStats = [
    { label: "Crédits disponibles", value: "0", icon: "💎" },
    { label: "Images générées", value: "0", icon: "🖼️" },
    { label: "Produits uploadés", value: "0", icon: "📦" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* En-tête */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-2">
              Tableau de bord
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Bienvenue ! Gérez vos crédits et vos générations d&apos;images ici.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {mockStats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]"
              >
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-black text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={ROUTES.UPLOAD}
              className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-[var(--brand-300)] bg-[var(--brand-50)] hover:border-[var(--brand-500)] hover:bg-[var(--brand-100)] transition-all duration-200 text-center group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">📸</span>
              <div>
                <p className="font-bold text-[var(--brand-700)]">Uploader un produit</p>
                <p className="text-sm text-[var(--brand-600)]">Commencer une nouvelle génération</p>
              </div>
            </Link>

            <Link
              href={ROUTES.PRICING}
              className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-400)] hover:shadow-md transition-all duration-200 text-center group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">💳</span>
              <div>
                <p className="font-bold text-[var(--foreground)]">Acheter des crédits</p>
                <p className="text-sm text-[var(--muted-foreground)]">À partir de 1 000 FCFA</p>
              </div>
            </Link>
          </div>

          {/* Notice MVP */}
          <div className="mt-8 p-4 rounded-xl border border-amber-200 bg-amber-50">
            <p className="text-sm text-amber-700 font-medium">
              🚧 <strong>Version MVP</strong> — Les fonctionnalités de génération IA seront disponibles prochainement.
              Créez votre compte pour être parmi les premiers à y accéder.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
