"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function FinalCTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-violet-600 via-brand-700 to-blue-700 py-20 px-6 sm:px-12 text-center shadow-2xl">
          {/* Formes décoratives animées */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-3xl animate-float"></div>
            <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Prêt à transformer vos photos produit ?
            </h2>
            <p className="text-lg md:text-xl text-violet-100 mb-10">
              Importez une simple photo téléphone et créez des photos professionnelles pour vendre vos produits.
            </p>

            <Link
              href={ROUTES.UPLOAD}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-violet-700 shadow-xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
            >
              Essayez maintenant
              <ArrowRight size={20} />
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-violet-200">
              <span>Aucun prompt à écrire</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-violet-400"></span>
              <span>Pas besoin de studio</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-violet-400"></span>
              <span>Résultat rapide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
