"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Est-ce que j'ai besoin d'un photographe ?",
    a: "Non. Vous prenez simplement une photo de votre produit avec votre téléphone, puis ProductStudio crée des photos plus propres et professionnelles."
  },
  {
    q: "Est-ce que je dois savoir utiliser l'IA ?",
    a: "Non. Vous n'avez aucun prompt à écrire. ProductStudio analyse automatiquement votre produit et propose les meilleures images."
  },
  {
    q: "Quel type de photo dois-je importer ?",
    a: "Une photo claire de votre produit suffit. Pour un meilleur résultat, prenez la photo dans un endroit lumineux, avec le produit bien visible."
  },
  {
    q: "Je peux utiliser les photos pour ma boutique ?",
    a: "Oui. Les images sont pensées pour votre boutique en ligne, vos réseaux sociaux, WhatsApp, Facebook, Instagram et vos publicités."
  },
  {
    q: "Quels types de produits sont acceptés ?",
    a: "ProductStudio peut être utilisé pour les cosmétiques, vêtements, accessoires, produits alimentaires, objets de décoration, produits artisanaux et bien plus."
  },
  {
    q: "Combien de temps cela prend ?",
    a: "Le but est d'obtenir un résultat rapidement, sans organiser un shooting photo."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Questions fréquentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                openIndex === idx ? "border-violet-200 shadow-sm" : "border-slate-200"
              }`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                      <div className="pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
