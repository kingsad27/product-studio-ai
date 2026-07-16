import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes publiques : landing + webhooks entrants (pas d'auth requise)
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook/clerk",
  "/api/webhook/replicate",
  // Pages Clerk gérées par le SDK (sign-in / sign-up)
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Protège toutes les routes privées : /dashboard, /onboarding, /api/...
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals et fichiers statiques
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Toujours exécuter pour les API routes
    "/(api|trpc)(.*)",
  ],
};
