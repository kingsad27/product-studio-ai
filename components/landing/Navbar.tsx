"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200 transition-transform group-hover:scale-105">
              <span className="font-bold text-lg">PS</span>
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              ProductStudio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#exemples" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
              Exemples
            </Link>
            <Link href="#comment-ca-marche" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
              Comment ça marche
            </Link>
            <Link href="#tarifs" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
              Tarifs
            </Link>
            <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {(!isLoaded || !isSignedIn) ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-semibold text-slate-700 hover:text-violet-600 transition-colors">
                    Connexion
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 hover:-translate-y-0.5 transition-all">
                    <Sparkles size={16} />
                    Essayez maintenant
                  </button>
                </SignUpButton>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-slate-700 hover:text-violet-600 transition-colors"
                >
                  Mon Espace
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg p-4 md:hidden flex flex-col gap-4"
          >
            <Link href="#exemples" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-base font-medium text-slate-700">Exemples</Link>
            <Link href="#comment-ca-marche" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-base font-medium text-slate-700">Comment ça marche</Link>
            <Link href="#tarifs" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-base font-medium text-slate-700">Tarifs</Link>
            <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-base font-medium text-slate-700">FAQ</Link>
            <hr className="border-slate-100" />
            {(!isLoaded || !isSignedIn) ? (
              <>
                <SignInButton mode="modal">
                  <button className="block w-full text-left p-2 text-base font-medium text-slate-700">Connexion</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-base font-bold text-white shadow-md">
                    Essayez maintenant
                  </button>
                </SignUpButton>
              </>
            ) : (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-base font-medium text-slate-700">Mon Espace</Link>
                <div className="p-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
