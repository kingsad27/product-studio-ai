import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ROUTES } from "@/constants/routes";
import { creditPacks } from "@/config/pricing";
import { formatPriceFCFA } from "@/lib/utils";

// ─── Icônes SVG inline ───────────────────────────────────────────────────────

function IconCamera() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

// ─── Composants de section ────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden gradient-hero">
      {/* Orbes décoratifs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--brand-500)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--accent-500)" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)] px-4 py-1.5 text-sm font-medium text-[var(--brand-700)] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-500)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-500)]" />
          </span>
          Lancement MVP — Bêta gratuite
        </div>

        {/* Titre principal */}
        <h1 className="animate-fade-in-up animation-delay-100 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mb-6">
          Des visuels{" "}
          <span className="gradient-brand-text">professionnels</span>
          <br />
          pour vos produits
        </h1>

        {/* Sous-titre */}
        <p className="animate-fade-in-up animation-delay-200 text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-4">
          Transformez une simple photo prise avec votre téléphone en visuels professionnels
          grâce à l&apos;intelligence artificielle.
        </p>

        {/* Argument clé */}
        <p className="animate-fade-in-up animation-delay-300 inline-flex items-center gap-2 text-base font-semibold text-[var(--brand-600)] mb-10">
          <IconSparkles />
          Aucun prompt à écrire — Résultats en quelques secondes
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            id="cta-commencer"
            href={ROUTES.UPLOAD}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white gradient-brand shadow-xl hover:opacity-90 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <IconCamera />
            Commencer gratuitement
          </Link>
          <Link
            id="cta-tarifs"
            href={ROUTES.PRICING}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-8 py-4 text-base font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Voir les tarifs
          </Link>
        </div>

        {/* Social proof */}
        <p className="animate-fade-in-up animation-delay-500 mt-6 text-sm text-[var(--muted-foreground)]">
          🌍 Conçu pour les commerçants d&apos;Afrique de l&apos;Ouest · Paiement en FCFA prévu
        </p>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: <IconCamera />,
      title: "Photographiez votre produit",
      description:
        "Prenez une simple photo avec votre téléphone. Pas besoin de studio, d'équipement ou de compétences en photo.",
    },
    {
      number: "02",
      icon: <IconSparkles />,
      title: "L'IA analyse et génère",
      description:
        "Notre intelligence artificielle analyse votre produit automatiquement et génère plusieurs visuels professionnels.",
    },
    {
      number: "03",
      icon: <IconDownload />,
      title: "Téléchargez et utilisez",
      description:
        "Récupérez vos images en haute résolution, prêtes pour WhatsApp, Instagram, votre boutique en ligne ou vos catalogues.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            3 étapes simples, et vos produits ont un look professionnel.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-400)] hover:shadow-lg transition-all duration-300 group"
            >
              {/* Numéro */}
              <span className="absolute -top-3 left-6 text-6xl font-black text-[var(--brand-100)] select-none">
                {step.number}
              </span>

              {/* Icône */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              <h3 className="relative z-10 text-lg font-bold text-[var(--foreground)] mb-3">
                {step.title}
              </h3>
              <p className="relative z-10 text-[var(--muted-foreground)] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Photo studio",
      description: "Fond neutre, éclairage professionnel. Idéal pour les fiches produit.",
      emoji: "🎨",
    },
    {
      title: "Lifestyle",
      description: "Votre produit dans une ambiance de vie réelle et inspirante.",
      emoji: "✨",
    },
    {
      title: "Avec mannequin",
      description: "Parfait pour les vêtements, accessoires et bijoux.",
      emoji: "👗",
    },
    {
      title: "Mise en situation",
      description: "Cuisine, bureau, extérieur — contexte adapté à chaque produit.",
      emoji: "🏠",
    },
    {
      title: "Aucun prompt",
      description: "Vous uploadez, l'IA comprend et génère. Zéro technicité requise.",
      emoji: "🚀",
    },
    {
      title: "Crédits à vie",
      description: "Vos crédits n'expirent jamais. Utilisez-les à votre rythme.",
      emoji: "♾️",
    },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--muted)]/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            Tout ce qu&apos;il vous faut pour vendre mieux
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            Des visuels adaptés à chaque type de produit et chaque canal de vente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-400)] hover:shadow-md transition-all duration-300"
            >
              <span className="text-3xl flex-shrink-0">{feat.emoji}</span>
              <div>
                <h3 className="font-bold text-[var(--foreground)] mb-1">{feat.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreviewSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          Tarifs simples et transparents
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg mb-12">
          Achetez des crédits une fois, utilisez-les quand vous voulez. Ils n&apos;expirent jamais.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {creditPacks.map((pack) => (
            <div
              key={pack.id}
              className={`relative flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                pack.popular
                  ? "border-[var(--brand-500)] bg-[var(--brand-50)] shadow-lg"
                  : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-400)]"
              }`}
            >
              {pack.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full gradient-brand px-3 py-0.5 text-xs font-bold text-white shadow">
                  {pack.badge}
                </span>
              )}
              <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-1">
                {pack.name}
              </p>
              <p className="text-3xl font-black text-[var(--foreground)]">{pack.credits}</p>
              <p className="text-xs text-[var(--muted-foreground)] mb-3">crédits</p>
              <p className="text-sm font-bold text-[var(--brand-600)]">
                {formatPriceFCFA(pack.priceFCFA)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ROUTES.PRICING}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold gradient-brand text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200"
          >
            Voir tous les détails →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TargetAudienceSection() {
  const audiences = [
    { emoji: "💼", title: "Commerçants", desc: "Boutiques physiques qui vendent aussi en ligne" },
    { emoji: "📱", title: "Vendeurs WhatsApp", desc: "Catalogues et stories qui convertissent" },
    { emoji: "📸", title: "Instagram Sellers", desc: "Posts et reels avec des visuels cohérents" },
    { emoji: "🛍️", title: "Boutiques en ligne", desc: "Fiches produits qui inspirent confiance" },
    { emoji: "🏢", title: "Agences", desc: "Contenu pour plusieurs clients en moins de temps" },
    { emoji: "🌱", title: "Entrepreneurs", desc: "Démarrez avec un look pro dès le premier jour" },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--muted)]/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            Fait pour vous
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            Que vous soyez vendeur WhatsApp ou gérant d&apos;une boutique en ligne, Product Studio AI s&apos;adapte à votre réalité.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {audiences.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-400)] hover:shadow-md transition-all duration-300"
            >
              <span className="text-3xl mb-3">{item.emoji}</span>
              <h3 className="font-bold text-[var(--foreground)] text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBannerSection() {
  const benefits = [
    "Aucun prompt à écrire",
    "Résultats en quelques secondes",
    "Crédits valables à vie",
    "Mobile-friendly",
  ];

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-1 shadow-2xl glow-brand">
          <div className="rounded-[calc(1.5rem-4px)] bg-[var(--gray-950)] px-8 py-14 sm:px-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Prêt à transformer vos photos ?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Rejoignez les commerçants qui donnent un look professionnel à leurs produits, sans se ruiner.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {benefits.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                >
                  <IconCheck />
                  {b}
                </span>
              ))}
            </div>

            <Link
              id="cta-final-commencer"
              href={ROUTES.UPLOAD}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[var(--brand-700)] shadow-xl hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200"
            >
              <IconCamera />
              Commencer maintenant — C&apos;est gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingPreviewSection />
        <TargetAudienceSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </>
  );
}
