import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand shadow-lg">
              <span className="text-sm font-bold text-white">PS</span>
            </div>
            <span className="font-bold text-[var(--foreground)] group-hover:text-[var(--brand-500)] transition-colors duration-200">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={ROUTES.PRICING}
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Tarifs
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.LOGIN}
              className="hidden sm:inline-flex text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              Connexion
            </Link>
            <Link
              href={ROUTES.UPLOAD}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white gradient-brand shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200"
            >
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
