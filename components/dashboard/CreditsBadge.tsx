"use client";

import { Coins, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface CreditsBadgeProps {
  credits: number;
}

export default function CreditsBadge({ credits }: CreditsBadgeProps) {
  const isLow = credits <= 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-3 rounded-2xl px-5 py-4 border ${
        isLow
          ? "border-orange-200 bg-orange-50"
          : "border-violet-100 bg-violet-50"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${
          isLow ? "bg-orange-500" : "bg-violet-600"
        }`}
      >
        <Coins size={22} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-black text-slate-900">{credits}</p>
        <p className="text-xs font-medium text-slate-500">
          crédit{credits > 1 ? "s" : ""} disponible{credits > 1 ? "s" : ""}
        </p>
      </div>
      {isLow && (
        <a
          href="/pricing"
          className="flex items-center gap-1 rounded-xl bg-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-600 transition-colors"
        >
          <TrendingUp size={12} />
          Recharger
        </a>
      )}
    </motion.div>
  );
}
