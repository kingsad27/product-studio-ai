"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left mt-4 lg:mt-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-3 lg:mb-4 leading-[1.15]"
            >
              Transformez une <span className="text-violet-600">simple photo</span> en Shooting professionnel pour <span className="text-violet-600">vendre vos produits</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-slate-900 mb-5 lg:mb-6 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Importez une image et nous generons un pack de photos prêtes à etre publier sur votre boutique et vos réseaux sociaux
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={ROUTES.UPLOAD}
                className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-3 lg:px-12 lg:py-4 text-lg lg:text-xl font-bold text-white shadow-lg hover:bg-violet-700 transition-all"
              >
                Essayez
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual Collage (Absolute positioning) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full max-w-md mx-auto aspect-square lg:aspect-[4/5] mt-8 lg:mt-0"
          >
            {/* Image 1: Avant (Haut Gauche) */}
            <div className="absolute top-0 left-[5%] w-[45%] h-[50%] z-10">
              <div className="absolute -top-4 -left-6 bg-fuchsia-600 text-white font-bold px-6 py-2 rounded-full shadow-lg text-sm z-20">
                Avant
              </div>
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" 
                  alt="Avant" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Image 2: Après (Haut Droite) */}
            <div className="absolute top-[10%] right-[2%] w-[42%] h-[42%] z-20">
              <div className="absolute top-6 -right-6 bg-green-500 text-white font-bold px-6 py-2 rounded-full shadow-lg text-sm z-20">
                Après
              </div>
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=400&auto=format&fit=crop" 
                  alt="Après 1" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Image 3: Après (Bas Gauche) */}
            <div className="absolute bottom-[5%] left-[8%] w-[42%] h-[42%] z-30">
              <div className="absolute top-6 -left-6 bg-green-500 text-white font-bold px-6 py-2 rounded-full shadow-lg text-sm z-20">
                Après
              </div>
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" 
                  alt="Après 2" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Image 4: Après (Bas Droite) */}
            <div className="absolute bottom-0 right-[5%] w-[45%] h-[48%] z-10">
              <div className="absolute -top-4 right-4 bg-green-500 text-white font-bold px-6 py-2 rounded-full shadow-lg text-sm z-20">
                Après
              </div>
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                  alt="Après 3" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
