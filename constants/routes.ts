export const ROUTES = {
  // Pages publiques
  HOME: "/",
  PRICING: "/pricing",
  LOGIN: "/login",
  REGISTER: "/register",

  // Application (authentifiée)
  DASHBOARD: "/dashboard",
  UPLOAD: "/upload",
  GALLERY: "/gallery",

  // Légal / Support
  TERMS: "/legal/terms",
  PRIVACY: "/legal/privacy",
  CONTACT: "/contact",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

// Routes protégées (nécessitent une authentification)
export const PROTECTED_ROUTES: Route[] = [
  ROUTES.DASHBOARD,
  ROUTES.UPLOAD,
  ROUTES.GALLERY,
];

// Routes de navigation principale (header)
export const NAV_ROUTES = [
  { label: "Accueil", href: ROUTES.HOME },
  { label: "Tarifs", href: ROUTES.PRICING },
];

// Routes de navigation du dashboard
export const DASHBOARD_NAV_ROUTES = [
  { label: "Tableau de bord", href: ROUTES.DASHBOARD, icon: "LayoutDashboard" },
  { label: "Uploader", href: ROUTES.UPLOAD, icon: "Upload" },
  { label: "Ma galerie", href: ROUTES.GALLERY, icon: "Images" },
];
