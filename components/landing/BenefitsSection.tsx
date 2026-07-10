"use client";

import React from "react";
import { motion } from "framer-motion";
import { CameraOff, Sparkles, Share2, Layers } from "lucide-react";

const benefits = [
  {
    title: "Sans photographe",
    description: "Créez vos photos produit vous-même, directement depuis votre téléphone.",
    icon: <CameraOff size={24} />,
  },
  {
    title: "Sans compétence IA",
    description: "Pas besoin d'écrire des instructions compliquées. ProductStudio s'occupe de tout.",
    icon: <Sparkles size={24} />,
  },
  {
    title: "Pour vendre partout",
    description: "Boutique en ligne, WhatsApp, Facebook, Instagram et publicités.",
    icon: <Share2 size={24} />,
  },
  {
    title: "Plusieurs styles",
    description: "Fond blanc, mise en situation, gros plan et formats publicitaires.",
    icon: <Layers size={24} />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween" as const } }
};

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Des photos prêtes à publier, sans complication
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-violet-100 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
