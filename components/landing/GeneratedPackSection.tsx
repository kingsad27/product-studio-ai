"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GeneratedPackSection() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-3xl mx-auto"
        >
          Un <span className="text-violet-600">pack complet</span> de photos pour vendre plus facilement
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-900 font-medium mb-10 max-w-2xl mx-auto"
        >
          À partir d&apos;une seule image prise avec votre smartphone, Product-Studio prépare plusieurs photos adaptées à vos besoins.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <button className="inline-flex items-center justify-center rounded-full bg-violet-600 px-12 py-4 text-lg font-bold text-white shadow-lg hover:bg-violet-700 transition-all">
            Ils ont crée ca avec Productstudio
          </button>
        </motion.div>

        {/* 4 Images Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=400&auto=format&fit=crop"
                alt={`Photo générée ${item}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
