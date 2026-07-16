"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface WelcomeGiftModalProps {
  /** Passé depuis le Server Component quand ?welcome=1 est présent dans l'URL */
  showOnMount?: boolean;
}

export default function WelcomeGiftModal({ showOnMount = false }: WelcomeGiftModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"box" | "opened">("box");

  useEffect(() => {
    if (!showOnMount) return;

    // Vérification localStorage pour éviter d'afficher deux fois (multi-device non-critique)
    const hasSeenGift = localStorage.getItem("hasSeenWelcomeGift");
    if (hasSeenGift) return;

    // Délai de 1.5s pour laisser le dashboard se charger
    const timer = setTimeout(() => {
      setIsOpen(true);
      setStep("box");
    }, 1500);

    return () => clearTimeout(timer);
  }, [showOnMount]);

  const openGift = () => {
    setStep("opened");
    // Lancer les confettis en deux vagues
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#f97316", "#ef4444", "#eab308", "#a855f7"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.5 },
        colors: ["#f97316", "#ef4444", "#fbbf24"],
        angle: 135,
      });
    }, 300);
  };

  const closeModal = () => {
    localStorage.setItem("hasSeenWelcomeGift", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Bouton fermer */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 rounded-full p-1 text-slate-300 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {/* Bandeau décoratif */}
          <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

          <div className="p-8 text-center">
            <AnimatePresence mode="wait">

              {/* ── Vue : boîte cadeau ────────────────────────── */}
              {step === "box" && (
                <motion.div
                  key="box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center"
                >
                  {/* Icône animée */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100 text-orange-500 shadow-inner"
                  >
                    <Gift size={48} />
                  </motion.div>

                  <h2 className="mb-2 text-2xl font-bold text-slate-800">
                    Tu as un cadeau ! 🎁
                  </h2>
                  <p className="mb-8 text-sm text-slate-500 leading-relaxed">
                    On t&apos;a réservé une surprise pour bien démarrer.<br />
                    Clique pour découvrir ton cadeau de bienvenue.
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={openGift}
                    className="w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:shadow-orange-500/50 hover:-translate-y-0.5"
                  >
                    Ouvrir mon cadeau ✨
                  </motion.button>
                </motion.div>
              )}

              {/* ── Vue : cadeau révélé ───────────────────────── */}
              {step === "opened" && (
                <motion.div
                  key="opened"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 18 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, delay: 0.1 }}
                    className="mb-4 text-6xl"
                  >
                    🎉
                  </motion.div>

                  <h2 className="mb-1 text-2xl font-bold text-slate-800">
                    Félicitations !
                  </h2>
                  <p className="mb-6 text-sm text-slate-500">Ton cadeau est déjà sur ton compte</p>

                  {/* Carte cadeau */}
                  <div className="mb-6 w-full overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-6">
                    <div className="mb-3 flex items-center gap-2 text-orange-600">
                      <Sparkles size={16} />
                      <span className="text-xs font-semibold uppercase tracking-wide">Cadeau de bienvenue</span>
                    </div>
                    <p className="text-4xl font-black text-orange-600 leading-none">
                      1 CRÉDIT
                    </p>
                    <p className="text-4xl font-black text-orange-500 leading-none mb-3">
                      GRATUIT
                    </p>
                    <p className="text-xs text-orange-500 font-medium">
                      = 1 shooting · jusqu&apos;à 3 photos → 5 visuels pro
                    </p>
                  </div>

                  <p className="mb-6 text-sm text-slate-500 leading-relaxed">
                    Profite-en pour créer tes premières images produits professionnelles dès maintenant.
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="w-full rounded-full bg-slate-900 py-4 font-bold text-white transition hover:bg-slate-800 active:scale-95"
                  >
                    Commencer ma création 🚀
                  </motion.button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
