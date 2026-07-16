import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un compte | ProductStudio AI",
  description: "Créez votre compte ProductStudio AI et obtenez 1 essai gratuit.",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <SignUp
        forceRedirectUrl="/dashboard"
        signInUrl="/sign-in"
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
