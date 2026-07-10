"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aïcha K.",
    role: "Vendeuse de cosmétiques",
    content: "Avant, mes photos ne donnaient pas confiance. Maintenant, mes produits paraissent plus propres et mes clientes posent moins de questions.",
  },
  {
    name: "Moussa B.",
    role: "Boutique vêtements",
    content: "Je peux créer des images pour WhatsApp et Facebook sans payer un shooting à chaque nouveau produit.",
  },
  {
    name: "Nadia S.",
    role: "Créatrice d'accessoires",
    content: "J'aime surtout les photos en situation. Les clientes comprennent mieux comment porter mes articles.",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Ils presentent mieux <span className="text-violet-600">leur produit</span>, leurs <span className="text-slate-900">temoignages</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-slate-600 italic font-medium mb-12 text-sm leading-relaxed">
                  &quot;{item.content}&quot;
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-400 font-medium">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
