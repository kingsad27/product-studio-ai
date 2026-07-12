"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Download, RotateCcw, AlertTriangle, CheckCircle, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  inputImageUrls: string[];
  outputImageUrls: string[];
  errorMessage: string | null;
  createdAt: string;
}

export default function ProjectResultsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Étape de traitement simulée ou réelle pour le loading
  const [loadingStep, setLoadingStep] = useState(0);
  const steps = [
    "Analyse de vos produits...",
    "Création du décor de fond...",
    "Harmonisation de la lumière...",
    "Génération des images HD...",
    "Finalisation...",
  ];

  // Effet de texte qui change pour le chargement
  useEffect(() => {
    if (!project || project.status === "COMPLETED" || project.status === "FAILED") return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, [project]);

  // Récupérer le statut du projet
  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.status === 401) {
        router.push("/sign-in");
        return;
      }
      if (!res.ok) throw new Error("Impossible de charger le projet.");

      const data = await res.json();
      setProject(data.project);
      
      if (data.project.outputImageUrls && data.project.outputImageUrls.length > 0 && !activeImage) {
        setActiveImage(data.project.outputImageUrls[0]);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  };

  // Polling si le projet est en cours de traitement
  useEffect(() => {
    if (!projectId) return;

    fetchProject();

    const interval = setInterval(() => {
      if (project && (project.status === "COMPLETED" || project.status === "FAILED")) {
        clearInterval(interval);
        return;
      }
      fetchProject();
    }, 4000); // Poll toutes les 4 secondes

    return () => clearInterval(interval);
  }, [projectId, project?.status]);

  const handleDownload = async (url: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `product-studio-${projectId}-${Date.now()}.webp`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Échec du téléchargement direct:", err);
      // Fallback ouvrir dans un nouvel onglet
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Fil d'Ariane */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6 text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Retour à mon espace
          </Link>

          {loading && !project ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="h-10 w-10 rounded-full border-4 border-violet-600 border-t-transparent animate-spin mb-4" />
              <p className="text-slate-500">Chargement de votre session...</p>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center max-w-lg mx-auto">
              <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
              <h2 className="text-xl font-bold text-slate-900 mb-2">Une erreur est survenue</h2>
              <p className="text-sm text-red-700 mb-6">{error}</p>
              <button
                onClick={fetchProject}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 text-white font-bold px-6 py-2.5 hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : project ? (
            <div className="space-y-6">
              {/* Statuts en cours de génération */}
              {(project.status === "PENDING" || project.status === "PROCESSING") && (
                <div className="rounded-3xl border border-violet-100 bg-white p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-6 min-h-[450px]">
                  {/* Animation premium */}
                  <div className="relative flex items-center justify-center h-28 w-28">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-4 border-dashed border-violet-600"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-20 w-20 rounded-full bg-violet-50 flex items-center justify-center shadow-inner"
                    >
                      <Sparkles size={36} className="text-violet-600" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800">
                      L&apos;IA prépare votre shooting
                    </h2>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      Cela prend environ 20 à 45 secondes. Vous recevrez 5 variations professionnelles de votre produit.
                    </p>
                  </div>

                  {/* Indicateur d'étape */}
                  <div className="w-full max-w-md bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-violet-600 h-full rounded-full"
                      initial={{ width: "5%" }}
                      animate={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm font-bold text-violet-600"
                    >
                      {steps[loadingStep]}
                    </motion.p>
                  </AnimatePresence>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={12} />
                    <span>Vous pouvez quitter cette page sans risque. La génération continue.</span>
                  </div>
                </div>
              )}

              {/* Statut Échoué */}
              {project.status === "FAILED" && (
                <div className="rounded-3xl border border-orange-100 bg-white p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <AlertTriangle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800">
                      Génération impossible
                    </h2>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      Nous n&apos;avons pas pu générer les images de cette session. Votre crédit a été automatiquement remboursé.
                    </p>
                    {project.errorMessage && (
                      <p className="text-xs text-red-500 font-semibold bg-red-50 px-3 py-1.5 rounded-lg inline-block">
                        Raison : {project.errorMessage}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white font-bold px-6 py-3 hover:bg-slate-800 transition-all shadow-md"
                  >
                    <RotateCcw size={16} />
                    Créer une nouvelle session
                  </Link>
                </div>
              )}

              {/* Statut Réussi (Galerie) */}
              {project.status === "COMPLETED" && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Visuel principal à gauche */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                      {activeImage && (
                        <Image
                          src={activeImage}
                          alt="Génération principale"
                          fill
                          className="object-cover"
                          priority
                        />
                      )}
                    </div>
                    {activeImage && (
                      <button
                        onClick={() => handleDownload(activeImage)}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white font-bold py-4 hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-md"
                      >
                        <Download size={20} />
                        Télécharger en HD
                      </button>
                    )}
                  </div>

                  {/* Variations à droite */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 mb-2">
                        <CheckCircle size={12} />
                        Shooting Terminé
                      </span>
                      <h2 className="text-2xl font-black text-slate-800">Vos variations</h2>
                      <p className="text-slate-500 text-xs">Sélectionnez et téléchargez vos visuels</p>
                    </div>

                    {/* Grille des variations */}
                    <div className="grid grid-cols-2 gap-3">
                      {project.outputImageUrls.map((url, index) => (
                        <div
                          key={index}
                          onClick={() => setActiveImage(url)}
                          className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.02]
                            ${activeImage === url
                              ? "border-violet-600 shadow-md shadow-violet-100"
                              : "border-transparent bg-white border-slate-100"
                            }`}
                        >
                          <Image
                            src={url}
                            alt={`Variation ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="font-bold text-slate-800 text-sm mb-3">Images d&apos;entrée</h3>
                      <div className="flex gap-2">
                        {project.inputImageUrls.map((url, i) => (
                          <div
                            key={i}
                            className="relative h-14 w-14 rounded-lg overflow-hidden border border-slate-200 bg-white"
                          >
                            <Image
                              src={url}
                              alt="Entrée"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
