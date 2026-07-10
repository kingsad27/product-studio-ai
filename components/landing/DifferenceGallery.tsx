"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { ArrowRight } from "lucide-react";

const examples = [
  {
    category: "Beauté",
    before: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop&sat=100&bri=15",
  },
  {
    category: "Mode",
    before: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop&sat=80",
  },
  {
    category: "Accessoire",
    before: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop&sat=100&con=50",
  }
];

export default function DifferenceGallery() {
  return (
    <section id="exemples" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Voyez la différence en quelques secondes
          </h2>
          <p className="text-lg text-slate-600">
            Une photo simple devient une image propre, claire et professionnelle pour présenter votre produit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {examples.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all group"
            >
              <div className="text-center mb-3">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden flex">
                {/* Image Avant (Gauche) */}
                <div className="relative w-1/2 h-full overflow-hidden border-r-2 border-white group-hover:w-[10%] transition-all duration-500 ease-in-out">
                  <img src={item.before} alt="Avant" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: "200%" }} />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    Avant
                  </div>
                </div>
                {/* Image Après (Droite) */}
                <div className="relative flex-1 h-full overflow-hidden transition-all duration-500 ease-in-out">
                  <img src={item.after} alt="Après" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ left: "-100%", width: "200%" }} />
                  <div className="absolute top-3 right-3 bg-violet-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    Après
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={ROUTES.UPLOAD}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 hover:-translate-y-0.5 transition-all"
          >
            Essayez avec votre produit
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
