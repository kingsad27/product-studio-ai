"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Gift, Camera, User as UserIcon, Phone, AlertCircle } from "lucide-react";

type OnboardingData = {
  firstName: string;
  phonePrefix: string;
  phoneNumber: string;
  goal: string;
  acquisitionChannel: string;
};

const PHONE_PREFIXES = [
  { code: "+225", flag: "🇨🇮", label: "CI" },
  { code: "+221", flag: "🇸🇳", label: "SN" },
  { code: "+228", flag: "🇹🇬", label: "TG" },
  { code: "+226", flag: "🇧🇫", label: "BF" },
  { code: "+223", flag: "🇲🇱", label: "ML" },
  { code: "+237", flag: "🇨🇲", label: "CM" },
  { code: "+33",  flag: "🇫🇷", label: "FR" },
  { code: "+1",   flag: "🇺🇸", label: "US" },
];

const GOALS = [
  { id: "ecommerce", label: "Vendre sur E-commerce", icon: "🛍️" },
  { id: "social",    label: "Posts Réseaux Sociaux",  icon: "📱" },
  { id: "agency",    label: "Pour mes clients (Agence)", icon: "🏢" },
  { id: "fun",       label: "Juste pour tester",      icon: "😎" },
];

const CHANNELS = [
  { id: "tiktok",    label: "TikTok",            icon: "🎵" },
  { id: "instagram", label: "Instagram",          icon: "📸" },
  { id: "facebook",  label: "Facebook",           icon: "📘" },
  { id: "whatsapp",  label: "WhatsApp",           icon: "💬" },
  { id: "friend",    label: "Un ami m'en a parlé", icon: "👥" },
  { id: "google",    label: "Recherche Google",   icon: "🔍" },
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    phonePrefix: "+225",
    phoneNumber: "",
    goal: "",
    acquisitionChannel: "",
  });

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
    setError(null);
  };

  const submitOnboarding = async (channelId: string) => {
    setLoading(true);
    setError(null);
    try {
      const phone = `${data.phonePrefix}${data.phoneNumber.replace(/\s/g, "")}`;
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName.trim(),
          phone,
          goal: data.goal,
          acquisitionChannel: channelId,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Une erreur est survenue. Réessaie.");
      }

      // Succès → on marque "nouvel utilisateur" pour la modal cadeau côté URL
      router.push("/dashboard?welcome=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    setError(null);
  };

  const step1Valid = data.firstName.trim().length >= 2 && data.phoneNumber.trim().length >= 6;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFCF8] p-4 font-sans text-slate-800">

      {/* Progress dots */}
      <div className="absolute top-10 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-400" : "w-2 bg-orange-200"
            }`}
          />
        ))}
      </div>

      {/* Bouton retour */}
      {step > 1 && (
        <button
          onClick={prevStep}
          className="absolute top-8 left-8 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Retour
        </button>
      )}

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">

          {/* ── ÉTAPE 1 : Profil ─────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <h1 className="mb-2 text-3xl font-bold">Parle-nous de toi</h1>
              <p className="mb-8 text-sm text-slate-500">
                Ces infos nous aident à personnaliser ton expérience
              </p>

              <div className="space-y-4 text-left">
                {/* Prénom */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Ton prénom <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={data.firstName}
                      onChange={(e) => updateData({ firstName: e.target.value })}
                      placeholder="Ex: Innocent"
                      autoFocus
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Numéro de téléphone <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={data.phonePrefix}
                      onChange={(e) => updateData({ phonePrefix: e.target.value })}
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-slate-600 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    >
                      {PHONE_PREFIXES.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.flag} {p.code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <input
                        type="tel"
                        value={data.phoneNumber}
                        onChange={(e) => updateData({ phoneNumber: e.target.value })}
                        placeholder="07 07 02 03 04"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                disabled={!step1Valid}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
              >
                Continuer →
              </button>
            </motion.div>
          )}

          {/* ── ÉTAPE 2 : Objectif ───────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <h1 className="mb-2 text-3xl font-bold">Pourquoi tu veux créer des images ?</h1>
              <p className="mb-8 text-sm text-slate-500">Dis-nous ce qui t&apos;amène ici</p>

              <div className="space-y-3">
                {GOALS.map((item) => (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                      data.goal === item.id
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <input
                      type="radio"
                      name="goal"
                      value={item.id}
                      checked={data.goal === item.id}
                      onChange={(e) => updateData({ goal: e.target.value })}
                      className="h-5 w-5 border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                  </label>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!data.goal}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
              >
                Continuer →
              </button>
            </motion.div>
          )}

          {/* ── ÉTAPE 3 : Canal d'acquisition → soumet ───────── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <h1 className="mb-2 text-3xl font-bold">Comment tu nous as trouvés ?</h1>
              <p className="mb-8 text-sm text-slate-500">Ça nous aide à nous améliorer</p>

              {loading ? (
                /* Loading state pendant la soumission */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-6 py-16"
                >
                  <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
                    <span className="absolute inset-0 flex items-center justify-center text-2xl">✨</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Préparation de ton espace…</p>
                    <p className="mt-1 text-sm text-slate-500">Ça prend 2 secondes !</p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {CHANNELS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => submitOnboarding(item.id)}
                        disabled={loading}
                        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-6 transition-all active:scale-95 ${
                          data.acquisitionChannel === item.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Erreur */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      {error}
                      <button
                        onClick={() => setError(null)}
                        className="ml-auto font-medium underline"
                      >
                        Réessayer
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Réassurance bas de page */}
      {!loading && (
        <div className="absolute bottom-8 flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Sparkles size={12} /> Rendu pro en 10s</span>
          <span className="flex items-center gap-1"><Camera size={12} /> Shooting virtuel</span>
          <span className="flex items-center gap-1"><Gift size={12} /> 1 crédit offert</span>
        </div>
      )}
    </div>
  );
}
