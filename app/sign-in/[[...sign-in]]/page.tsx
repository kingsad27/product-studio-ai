import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | ProductStudio AI",
  description: "Connectez-vous à votre espace ProductStudio AI.",
};

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <SignIn
        forceRedirectUrl="/dashboard"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl rounded-3xl border border-orange-100/60 bg-white",
            headerTitle: "text-slate-900 font-bold",
            formButtonPrimary:
              "bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-bold rounded-full transition-all shadow-lg shadow-orange-500/20",
            footerActionLink: "text-orange-500 hover:text-orange-600 font-semibold",
            formFieldInput: "rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400",
          },
        }}
      />
    </main>
  );
}
