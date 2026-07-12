"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { PRICING_PLANS, COUNTRY_CURRENCY_MAP, DEFAULT_CURRENCY, Currency, formatPrice } from "@/config/pricing";
import { ROUTES } from "@/constants/routes";
import { Sparkles, Check, ChevronRight, MessageSquare, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("XOF");
  const [loadingGeo, setLoadingGeo] = useState(true);

  // Détection automatique de la devise via IP
  useEffect(() => {
    async function detectGeo() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Échec de la géolocalisation");
        const data = await res.json();
        const countryCode = data.country_code as string;
        
        const detectedCurrency = COUNTRY_CURRENCY_MAP[countryCode] ?? DEFAULT_CURRENCY;
        setCurrency(detectedCurrency);
      } catch (err) {
        console.warn("Erreur de détection de devise, utilisation de USD par défaut:", err);
        setCurrency(DEFAULT_CURRENCY);
      } finally {
        setLoadingGeo(false);
      }
    }

    detectGeo();
  }, []);

  const plans = [
    PRICING_PLANS.STARTER,
    PRICING_PLANS.STUDIO,
    PRICING_PLANS.BUSINESS,
  ];

  const included = [
    "Images en haute résolution",
    "Jusqu'à 3 produits par composition",
    "5 photos pro générées par crédit",
    "1 retouche gratuite par session",
    "Téléchargements illimités",
    "Crédits valables à vie",
    "Support prioritaire WhatsApp",
  ];

  const faq = [
    {
      q: "Comment fonctionne le système de crédits ?",
      a: "1 crédit = 1 session de shooting complète. Vous uploadez 1, 2 ou 3 produits (ex: un t-shirt, un jean et des baskets) et l'IA génère automatiquement un pack de 5 photos professionnelles dans le décor de votre choix.",
    },
    {
      q: "Est-ce que mes crédits expirent ?",
      a: "Non. Vos crédits n'expirent jamais. Vous pouvez les acheter aujourd'hui et les utiliser au fur et à mesure des arrivages de vos stocks.",
    },
    {
      q: "Quels moyens de paiement acceptez-vous ?",
      a: "Nous acceptons les cartes bancaires internationales (Visa, Mastercard) et le Mobile Money (Wave, Orange Money, MTN) via Stripe et nos passerelles locales pour l'Afrique de l'Ouest.",
    },
    {
      q: "Offrez-vous des retouches ?",
      a: "Oui ! Chaque crédit inclut 1 retouche gratuite. Si le fond généré ne vous convient pas, vous pouvez relancer une génération sur le même produit sans dépenser de nouveau crédit.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* En-tête */}
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Des tarifs simples,{" "}
              <span className="text-violet-600">sans abonnement</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto mb-6">
              Achetez des packs de crédits selon vos besoins. Pas de mensualité. Pas de mauvaise surprise.
            </p>

            {/* Selecteur de devise */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full p-1 border border-slate-200 shadow-sm">
              {[
                { code: "XOF" as const, label: "FCFA" },
                { code: "EUR" as const, label: "Euro (€)" },
                { code: "USD" as const, label: "Dollar ($)" },
              ].map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    currency === c.code
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille des Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 items-stretch">
            {plans.map((plan) => {
              const price = plan.prices[currency];
              const totalPhotos = plan.totalPhotos;
              const pricePerPhoto = (price / totalPhotos).toFixed(0);

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 bg-white
                    ${plan.highlight
                      ? "border-violet-600 shadow-xl shadow-violet-100 md:scale-[1.03] z-10"
                      : "border-slate-200 hover:border-violet-300 hover:shadow-lg"
                    }`}
                >
                  {/* Badge Exclusif */}
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold text-white shadow">
                      {plan.badge}
                    </span>
                  )}

                  {/* Nom & Description */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                  </div>

                  {/* Crédits */}
                  <div className="mb-4">
                    <span className="text-5xl font-black text-slate-900">{plan.credits}</span>
                    <span className="ml-1 text-sm font-semibold text-slate-500">crédit{plan.credits > 1 ? "s" : ""}</span>
                  </div>

                  {/* Photos correspondantes */}
                  <p className="text-sm font-bold text-violet-600 bg-violet-50 rounded-xl px-3 py-2 inline-block self-start mb-6">
                    📸 Soit {totalPhotos} photos produit HD
                  </p>

                  {/* Prix */}
                  <div className="mb-6">
                    <p className="text-3xl font-black text-slate-950">
                      {formatPrice(price, currency)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Revient à environ {currency === "XOF" ? `${pricePerPhoto} FCFA` : `${(price / totalPhotos).toFixed(2)} ${currency === "EUR" ? "€" : "$"}`} par photo
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={ROUTES.DASHBOARD}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all mt-auto
                      ${plan.highlight
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
                        : "border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                  >
                    {plan.cta}
                    <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Inclus dans tous les plans */}
          <div className="mb-14 rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6 text-center">
              ✅ Ce qui est inclus dans chaque formule
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-14">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">
              Questions fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <h3 className="font-bold text-slate-800 mb-2">{item.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Support CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-700 p-8 text-white text-center shadow-lg shadow-violet-100">
            <h3 className="text-xl font-bold mb-2">Besoin d&apos;une offre sur mesure pour votre boutique ?</h3>
            <p className="text-violet-100 text-sm max-w-lg mx-auto mb-6">
              Vous avez un catalogue de plus de 100 produits ? Nous pouvons vous créer un pack personnalisé avec tarifs dégressifs.
            </p>
            <a
              href="https://wa.me/221770000000" // Remplacer par le numéro WhatsApp officiel
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-violet-700 font-bold px-6 py-3.5 hover:bg-violet-50 transition-all shadow-md"
            >
              <MessageSquare size={18} />
              Nous contacter sur WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
