"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Camera, Store, Brush, Megaphone } from "lucide-react";

const useCases = [
  {
    title: "Boutiques en ligne",
    desc: "Améliorez vos pages produit avec des photos propres et cohérentes.",
    icon: <Store size={24} />,
    highlight: true,
  },
  {
    title: "Vendeurs WhatsApp",
    desc: "Envoyez de belles images à vos clients et donnez plus confiance.",
    icon: <MessageCircle size={24} />,
  },
  {
    title: "Instagram & Facebook",
    desc: "Publiez des photos plus attirantes pour capter l'attention.",
    icon: <Camera size={24} />,
  },
  {
    title: "Marques locales",
    desc: "Présentez vos produits avec une qualité digne d'une grande marque.",
    icon: <ShoppingBag size={24} />,
  },
  {
    title: "Artisans et créateurs",
    desc: "Montrez vos créations avec des images professionnelles.",
    icon: <Brush size={24} />,
  },
  {
    title: "Publicités",
    desc: "Créez des images claires pour vos campagnes et promotions.",
    icon: <Megaphone size={24} />,
  }
];

export default function UseCasesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Pour tous ceux qui vendent des produits
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col gap-4 ${
                item.highlight
                  ? "bg-gradient-to-br from-violet-600 to-brand-800 border-transparent shadow-lg shadow-violet-200 text-white"
                  : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-soft text-slate-900"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.highlight ? "bg-white/20 text-white" : "bg-violet-50 text-violet-600"
                }`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${item.highlight ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </h3>
                <p className={`${item.highlight ? "text-violet-100" : "text-slate-600"}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
