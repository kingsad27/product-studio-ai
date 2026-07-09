import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-brand">
                <span className="text-xs font-bold text-white">PS</span>
              </div>
              <span className="font-bold text-[var(--foreground)]">{siteConfig.shortName}</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xs">
              {siteConfig.description}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              🌍 {siteConfig.targetMarket.primary}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Accueil", href: ROUTES.HOME },
                { label: "Tarifs", href: ROUTES.PRICING },
                { label: "Connexion", href: ROUTES.LOGIN },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-500)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Informations</h3>
            <ul className="space-y-2">
              {[
                { label: "Conditions d'utilisation", href: ROUTES.TERMS },
                { label: "Politique de confidentialité", href: ROUTES.PRIVACY },
                { label: "Contact", href: ROUTES.CONTACT },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-500)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--muted-foreground)]">
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Fait avec ❤️ pour l&apos;Afrique de l&apos;Ouest
          </p>
        </div>
      </div>
    </footer>
  );
}
