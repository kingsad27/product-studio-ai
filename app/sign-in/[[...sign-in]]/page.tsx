import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | ProductStudio AI",
  description: "Connectez-vous à votre espace ProductStudio AI.",
};

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 p-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl rounded-3xl border border-slate-100",
            headerTitle: "text-slate-900 font-bold",
            formButtonPrimary:
              "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-full transition-all",
            footerActionLink: "text-orange-500 hover:text-orange-600 font-semibold",
          },
        }}
      />
    </main>
  );
}
