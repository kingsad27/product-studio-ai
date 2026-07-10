"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";



export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 gradient-hero">
        <div className="mx-auto max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 shadow-xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand shadow-lg mb-4">
                <span className="text-xl font-black text-white">PS</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[var(--foreground)] mb-1">
                Connexion
              </h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                Accédez à votre espace Product Studio AI
              </p>
            </div>

            {/* Formulaire mock */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                >
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  disabled
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  disabled
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled
                id="btn-login"
                className="w-full rounded-xl py-3 text-sm font-bold text-white gradient-brand shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Se connecter
              </button>
            </form>

            {/* Notice MVP */}
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs text-amber-700 text-center leading-relaxed">
                🚧 <strong>Authentification bientôt disponible.</strong><br />
                L&apos;accès complet sera activé dans la prochaine version avec Supabase Auth.
              </p>
            </div>

            {/* Lien inscription */}
            <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
              Pas encore de compte ?{" "}
              <Link href={ROUTES.REGISTER} className="font-semibold text-[var(--brand-600)] hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Retour accueil */}
          <div className="mt-6 text-center">
            <Link
              href={ROUTES.HOME}
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-500)] transition-colors duration-200"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
