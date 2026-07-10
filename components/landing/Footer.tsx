import React from "react";
import Link from "next/link";
import { MessageCircle, Camera, Globe } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Colonne 1: Brand */}
          <div className="md:col-span-1">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                <span className="font-bold text-sm">PS</span>
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                ProductStudio
              </span>
            </Link>
            <p className="text-sm text-slate-500 mb-6">
              Des photos produit professionnelles, sans photographe.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-violet-600 transition-colors" aria-label="Facebook"><MessageCircle size={20} /></a>
              <a href="#" className="hover:text-violet-600 transition-colors" aria-label="Instagram"><Camera size={20} /></a>
              <a href="#" className="hover:text-violet-600 transition-colors" aria-label="LinkedIn"><Globe size={20} /></a>
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produit</h4>
            <ul className="space-y-3">
              <li><Link href="#exemples" className="text-sm text-slate-600 hover:text-violet-600">Exemples</Link></li>
              <li><Link href="#comment-ca-marche" className="text-sm text-slate-600 hover:text-violet-600">Comment ça marche</Link></li>
              <li><Link href="#tarifs" className="text-sm text-slate-600 hover:text-violet-600">Tarifs</Link></li>
              <li><Link href="#faq" className="text-sm text-slate-600 hover:text-violet-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Légal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Légal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-slate-600 hover:text-violet-600">Conditions d&apos;utilisation</Link></li>
              <li><Link href="#" className="text-sm text-slate-600 hover:text-violet-600">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">
            © 2026 ProductStudio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
