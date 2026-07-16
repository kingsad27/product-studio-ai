import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes accessibles sans authentification
const PUBLIC_PATHS = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhook/clerk",
  "/api/webhook/replicate",
];

function isPublicPath(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicPath(request)) {
    // Protège toutes les routes privées : /dashboard, /onboarding, /api/...
    await auth.protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals et fichiers statiques
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Toujours exécuter pour les API routes
    "/(api|trpc)(.*)",
  ],
};
