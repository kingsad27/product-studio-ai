"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Cpu, Download } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Prenez une photo",
    description: "Prenez votre produit avec votre téléphone, même sans studio.",
    icon: <Camera size={24} />,
  },
  {
    number: "2",
    title: "Importez l'image",
    description: "Ajoutez la photo dans ProductStudio en quelques secondes.",
    icon: <Upload size={24} />,
  },
  {
    number: "3",
    title: "L'IA analyse votre produit",
    description: "Elle comprend le type de produit, son style et les images les plus utiles à créer.",
    icon: <Cpu size={24} />,
  },
  {
    number: "4",
    title: "Téléchargez vos photos",
    description: "Utilisez vos nouvelles photos pour votre boutique, vos réseaux sociaux ou vos publicités.",
    icon: <Download size={24} />,
  }
];

export default function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            C&apos;est simple
          </h2>
          <p className="text-lg text-slate-600">
            Vous n&apos;avez pas besoin de savoir utiliser l&apos;IA.
          </p>
        </div>

        <div className="relative">
          {/* Ligne horizontale (desktop) */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-violet-100" />
          
          {/* Ligne verticale (mobile) */}
          <div className="lg:hidden absolute top-10 bottom-10 left-8 w-0.5 bg-violet-100" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative flex lg:flex-col gap-6 lg:gap-0"
              >
                {/* Icône et Cercle */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-16 h-16 lg:w-24 lg:h-24 lg:mx-auto bg-white rounded-full border-4 border-slate-50 shadow-sm text-violet-600 lg:mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-violet-50 group-hover:bg-violet-100 transition-colors"
                  >
                    {step.icon}
                  </motion.div>
                  {/* Petit numéro flottant */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Contenu */}
                <div className="pt-2 lg:pt-0 lg:text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
