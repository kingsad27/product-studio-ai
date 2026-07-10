import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ma galerie",
  description: "Retrouvez toutes vos images générées par l'IA.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-2">
                Ma galerie
              </h1>
              <p className="text-[var(--muted-foreground)]">
                Toutes vos images générées, disponibles pour téléchargement.
              </p>
            </div>
            <Link
              href={ROUTES.UPLOAD}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white gradient-brand shadow-md hover:opacity-90 transition-all duration-200"
            >
              + Nouveau produit
            </Link>
          </div>

          {/* État vide */}
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--muted)]">
              <span className="text-5xl">🖼️</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">
              Votre galerie est vide
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-sm mb-8">
              Uploadez votre première photo produit pour commencer à générer des visuels professionnels.
            </p>
            <Link
              href={ROUTES.UPLOAD}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white gradient-brand shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200"
            >
              📸 Uploader mon premier produit
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
