"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  History,
  ShoppingBag,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/dashboard",           icon: Home,        label: "Accueil"          },
  { href: "/dashboard/new",       icon: Sparkles,    label: "Nouveau shooting" },
  { href: "/dashboard/history",   icon: History,     label: "Historique"       },
  { href: "/dashboard/stats",     icon: BarChart2,   label: "Statistiques"     },
  { href: "/pricing",             icon: ShoppingBag, label: "Acheter des crédits" },
];

interface SidebarProps {
  credits: number;
}

export default function Sidebar({ credits }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex h-screen flex-col border-r border-orange-100/60 bg-white shadow-sm"
      style={{ minWidth: collapsed ? 72 : 240 }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-6 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-orange-100 bg-white shadow-md text-slate-400 hover:text-orange-500 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-orange-50">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md shadow-orange-500/20">
          <Sparkles size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-bold text-slate-800 leading-tight"
            >
              ProductStudio<br />
              <span className="text-orange-500 font-black">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 pt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-sm font-medium group ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20"
                  : "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Crédits badge */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 p-3"
        >
          <p className="text-xs text-orange-500 font-semibold mb-1">Solde crédits</p>
          <p className="text-2xl font-black text-orange-600 leading-none">{credits}</p>
          <p className="text-xs text-slate-400 mt-0.5">crédit{credits > 1 ? "s" : ""} disponible{credits > 1 ? "s" : ""}</p>
          <Link
            href="/pricing"
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-2 text-xs font-bold text-white shadow-sm shadow-orange-500/20 transition hover:opacity-90"
          >
            + Recharger
          </Link>
        </motion.div>
      )}

      {/* User profile */}
      <div className={`flex items-center gap-3 border-t border-orange-50 p-3 ${collapsed ? "justify-center" : ""}`}>
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt="Avatar"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-xl object-cover ring-2 ring-orange-100"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold text-sm">
            {user?.firstName?.[0] ?? "U"}
          </div>
        )}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="flex-1 min-w-0"
            >
              <p className="truncate text-sm font-semibold text-slate-700">
                {user?.firstName ?? "Utilisateur"}
              </p>
              <p className="truncate text-xs text-slate-400">
                {user?.primaryEmailAddress?.emailAddress ?? ""}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {!collapsed && (
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="shrink-0 rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-400 transition-colors"
            title="Se déconnecter"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
