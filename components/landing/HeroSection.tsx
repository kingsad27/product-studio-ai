"use client";

import React from "react";
import Link from "next/link";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";

export default function HeroSection() {
  const { isLoaded, isSignedIn } = useAuth();

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
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 lg:mb-4 leading-[1.15]"
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
              {(!isLoaded || !isSignedIn) ? (
                <SignUpButton mode="modal">
                  <button className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-3 lg:px-12 lg:py-4 text-lg lg:text-xl font-bold text-white shadow-lg hover:bg-violet-700 transition-all">
                    Essayez
                  </button>
                </SignUpButton>
              ) : (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 lg:px-12 lg:py-4 text-lg lg:text-xl font-bold text-white shadow-lg hover:bg-slate-800 transition-all"
                >
                  Accéder à l'application
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right Column: 4 Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-lg mx-auto lg:ml-auto mt-12 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              
              {/* Image 1: Avant */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-fuchsia-600 text-white font-bold px-5 py-1.5 rounded-full shadow-md text-sm mb-3 z-10">
                  Avant
                </div>
                <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" 
                    alt="Avant" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 2: Après */}
              <div className="flex flex-col items-center sm:items-start lg:mt-8">
                <div className="bg-green-500 text-white font-bold px-5 py-1.5 rounded-full shadow-md text-sm mb-3 z-10">
                  Après
                </div>
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=400&auto=format&fit=crop" 
                    alt="Après 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 3: Après */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-green-500 text-white font-bold px-5 py-1.5 rounded-full shadow-md text-sm mb-3 z-10">
                  Après
                </div>
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" 
                    alt="Après 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image 4: Après */}
              <div className="flex flex-col items-center sm:items-start lg:mt-8">
                <div className="bg-green-500 text-white font-bold px-5 py-1.5 rounded-full shadow-md text-sm mb-3 z-10">
                  Après
                </div>
                <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                    alt="Après 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
