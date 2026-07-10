"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function PricingCTASection() {
  const features = [
    "1 produit à tester",
    "Photos sur fond blanc",
    "Photos en situation",
    "Formats réseaux sociaux",
    "Aucun prompt à écrire",
  ];

  return (
    <section id="tarifs" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Essayez avec votre premier produit
        </h2>
        <p className="text-lg text-slate-600 mb-12">
          Importez une photo et voyez ce que ProductStudio peut créer pour vous.
        </p>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-violet-100 relative overflow-hidden">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-violet-500 to-blue-500" />
          
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Essai gratuit</h3>
          <p className="text-slate-500 mb-8">Testez la magie de l&apos;IA sans engagement.</p>
          
          <div className="flex flex-col items-center gap-3 mb-10 text-left w-full max-w-sm mx-auto">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 w-full">
                <CheckCircle2 size={20} className="text-violet-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{feat}</span>
              </div>
            ))}
          </div>

          <Link
            href={ROUTES.UPLOAD}
            className="w-full md:w-auto inline-flex justify-center items-center rounded-full bg-violet-600 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 hover:-translate-y-0.5 transition-all"
          >
            Essayez maintenant
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Aucune compétence technique nécessaire.
          </p>
        </div>
      </div>
    </section>
  );
}
