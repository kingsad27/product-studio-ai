import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { creditPacks, creditRules } from "@/config/pricing";
import { formatPriceFCFA } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Packs de crédits pour générer des images professionnelles de vos produits. À partir de 1 000 FCFA.",
};

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--brand-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

const included = [
  "Images en haute résolution",
  "Styles : studio, lifestyle, mannequin, mise en situation",
  "Téléchargement illimité",
  "Crédits valables à vie",
  "Support par WhatsApp",
];

const faq = [
  {
    q: "C'est quoi un crédit ?",
    a: "1 crédit = 1 image générée. Chaque fois que vous créez une nouvelle image à partir d'une photo produit, 1 crédit est utilisé.",
  },
  {
    q: "Les crédits expirent-ils ?",
    a: "Non. Vos crédits sont valables à vie. Achetez aujourd'hui, utilisez quand vous voulez.",
  },
  {
    q: "Quels moyens de paiement sont acceptés ?",
    a: "Le paiement par Mobile Money (Wave, Orange Money, MTN…) sera disponible prochainement. D'autres méthodes suivront.",
  },
  {
    q: "Puis-je être remboursé ?",
    a: "En cas d'erreur technique confirmée de notre côté (image non générée, erreur serveur), nous remboursons les crédits utilisés.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* En-tête */}
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] mb-4">
              Tarifs simples,{" "}
              <span className="gradient-brand-text">sans surprise</span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
              Achetez des crédits une seule fois. Pas d&apos;abonnement, pas d&apos;expiration.
              1 crédit = 1 image professionnelle.
            </p>
          </div>

          {/* Packs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {creditPacks.map((pack) => (
              <div
                key={pack.id}
                className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pack.popular
                    ? "border-[var(--brand-500)] bg-[var(--brand-50)] shadow-lg shadow-[var(--brand-100)]"
                    : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-400)]"
                }`}
              >
                {/* Badge */}
                {pack.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full gradient-brand px-4 py-1 text-xs font-bold text-white shadow">
                    {pack.badge}
                  </span>
                )}

                {/* Nom */}
                <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-2">
                  {pack.name}
                </p>

                {/* Crédits */}
                <div className="mb-3">
                  <span className="text-5xl font-black text-[var(--foreground)]">
                    {pack.credits}
                  </span>
                  <span className="ml-1 text-sm font-medium text-[var(--muted-foreground)]">
                    crédits
                  </span>
                </div>

                {/* Prix */}
                <p className="text-xl font-bold text-[var(--brand-600)] mb-1">
                  {formatPriceFCFA(pack.priceFCFA)}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mb-5">
                  {formatPriceFCFA(pack.pricePerCreditFCFA)} / image
                </p>

                {/* Description */}
                <p className="text-xs text-[var(--muted-foreground)] mb-6 leading-relaxed flex-1">
                  {pack.description}
                </p>

                {/* CTA */}
                <Link
                  href={ROUTES.LOGIN}
                  id={`pack-${pack.id}`}
                  className={`inline-flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                    pack.popular
                      ? "gradient-brand text-white shadow-md hover:opacity-90"
                      : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }`}
                >
                  Choisir ce pack
                </Link>
              </div>
            ))}
          </div>

          {/* Inclus dans tous les packs */}
          <div className="mb-14 rounded-3xl border border-[var(--border)] bg-[var(--muted)]/30 p-8">
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-5 text-center">
              ✅ Inclus dans tous les packs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm text-[var(--foreground)]">{item}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-sm text-[var(--foreground)]">
                  {creditRules.creditsExpire ? "Crédits avec expiration" : "Crédits sans expiration"}
                </span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--foreground)] mb-8 text-center">
              Questions fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]"
                >
                  <h3 className="font-bold text-[var(--foreground)] mb-2">{item.q}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
