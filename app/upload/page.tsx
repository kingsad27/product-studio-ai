import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uploader un produit",
  description: "Uploadez la photo de votre produit pour générer des visuels professionnels.",
};

export default function UploadPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl">
          {/* En-tête */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-3">
              Uploader votre produit
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Prenez une simple photo de votre produit et laissez l&apos;IA faire le reste.
            </p>
          </div>

          {/* Zone d'upload */}
          <div className="rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--muted)]/30 p-12 text-center hover:border-[var(--brand-400)] transition-all duration-300 cursor-pointer group">
            <div className="flex justify-center mb-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-brand text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
              Glissez votre photo ici
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm mb-4">
              ou cliquez pour sélectionner depuis votre galerie
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              JPG, PNG, WebP · Max 10 Mo
            </p>
          </div>

          {/* Conseils */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: "☀️", tip: "Bonne luminosité" },
              { emoji: "📦", tip: "Produit bien cadré" },
              { emoji: "🪟", tip: "Fond simple de préférence" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-sm font-medium text-[var(--foreground)]">{item.tip}</p>
              </div>
            ))}
          </div>

          {/* Notice MVP */}
          <div className="mt-8 p-4 rounded-xl border border-[var(--brand-200)] bg-[var(--brand-50)]">
            <p className="text-sm text-[var(--brand-700)] font-medium text-center">
              ✨ <strong>Bientôt disponible</strong> — La génération d&apos;images IA sera activée dans la prochaine version.
              En attendant, explorez l&apos;interface !
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
