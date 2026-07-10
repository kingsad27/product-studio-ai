"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const comparisons = [
  { bad: "Besoin d'un photographe", good: "Vous créez vos photos vous-même" },
  { bad: "Studio ou matériel nécessaire", good: "Une simple photo téléphone suffit" },
  { bad: "Résultat lent et coûteux", good: "Résultat rapide" },
  { bad: "Une seule photo utilisable", good: "Plusieurs photos pour plusieurs usages" },
  { bad: "Difficile pour les publicités", good: "Formats prêts pour publicités et réseaux sociaux" },
  { bad: "Besoin de connaître l'IA", good: "Aucun prompt à écrire" },
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Avant, c&apos;était compliqué. Maintenant, c&apos;est simple.
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-2 border-b border-slate-100">
            <div className="p-6 text-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-600">Sans ProductStudio</h3>
            </div>
            <div className="p-6 text-center bg-violet-50">
              <h3 className="text-xl font-bold text-violet-700">Avec ProductStudio</h3>
            </div>
          </div>
          
          <div className="divide-y divide-slate-100">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-2">
                <div className="p-5 flex items-center justify-center gap-3 text-slate-500 bg-white">
                  <XCircle size={20} className="text-slate-300 flex-shrink-0" />
                  <span>{item.bad}</span>
                </div>
                <div className="p-5 flex items-center justify-center gap-3 text-slate-900 font-medium bg-violet-50/30">
                  <CheckCircle2 size={20} className="text-violet-600 flex-shrink-0" />
                  <span>{item.good}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {comparisons.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-start gap-3">
                <XCircle size={20} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 text-sm">{item.bad}</span>
              </div>
              <div className="p-4 bg-violet-50/50 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-violet-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-900 font-semibold text-sm">{item.good}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
