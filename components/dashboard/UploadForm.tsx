"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Sparkles, ImagePlus, AlertCircle } from "lucide-react";
import Image from "next/image";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export default function UploadForm() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const MAX_FILES = 3;
  const MAX_SIZE_MB = 10;

  const addFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      setError(null);

      const validFiles = Array.from(newFiles).filter((file) => {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          setError("Format non supporté. Utilisez JPG, PNG ou WebP.");
          return false;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          setError(`Fichier trop volumineux (max ${MAX_SIZE_MB} Mo).`);
          return false;
        }
        return true;
      });

      setFiles((prev) => {
        const combined = [...prev, ...validFiles.map((f) => ({
          id: crypto.randomUUID(),
          file: f,
          preview: URL.createObjectURL(f),
        }))];
        if (combined.length > MAX_FILES) {
          setError(`Maximum ${MAX_FILES} images par session.`);
          return combined.slice(0, MAX_FILES);
        }
        return combined;
      });
    },
    []
  );

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleGenerate = async () => {
    if (files.length === 0) return;
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f.file));

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (res.status === 401) {
        router.push("/sign-in");
        return;
      }
      if (res.status === 402) {
        setError("Crédits insuffisants. Rechargez votre compte.");
        return;
      }
      if (!res.ok) {
        throw new Error("Erreur lors de la génération.");
      }

      const data = await res.json();
      router.push(`/dashboard/results/${data.projectId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Zone de dépôt */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => files.length < MAX_FILES && fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 cursor-pointer select-none
          ${isDragging
            ? "border-violet-500 bg-violet-50 scale-[1.01]"
            : files.length >= MAX_FILES
            ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60"
            : "border-slate-300 bg-white hover:border-violet-400 hover:bg-violet-50/40"
          }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200 mx-auto mb-4"
        >
          <ImagePlus size={28} />
        </motion.div>

        <p className="font-bold text-slate-800 text-lg mb-1">
          {files.length >= MAX_FILES
            ? "Limite atteinte (3 images max)"
            : "Glissez vos photos ici"}
        </p>
        <p className="text-sm text-slate-500">
          ou cliquez pour sélectionner · JPG, PNG, WebP · Max 10 Mo
        </p>
        <p className="mt-3 text-xs font-semibold text-violet-600 bg-violet-50 inline-block px-3 py-1 rounded-full">
          {files.length}/{MAX_FILES} image{files.length > 1 ? "s" : ""} sélectionnée{files.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Aperçus des images */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-4"
          >
            {files.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
              >
                <Image
                  src={f.preview}
                  alt="Aperçu"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}

            {/* Slots vides restants */}
            {Array.from({ length: MAX_FILES - files.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all"
              >
                <Upload size={20} className="text-slate-300" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Erreur */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton Générer */}
      <motion.button
        onClick={handleGenerate}
        disabled={files.length === 0 || isGenerating}
        whileTap={{ scale: 0.97 }}
        className={`w-full flex items-center justify-center gap-3 rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300
          ${files.length === 0 || isGenerating
            ? "bg-slate-300 cursor-not-allowed shadow-none"
            : "bg-violet-600 shadow-violet-200 hover:bg-violet-700 hover:-translate-y-0.5"
          }`}
      >
        {isGenerating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
            />
            Génération en cours…
          </>
        ) : (
          <>
            <Sparkles size={22} />
            Générer mes photos pro · 1 crédit
          </>
        )}
      </motion.button>

      {/* Info crédits */}
      <p className="text-center text-xs text-slate-400">
        1 crédit = jusqu&apos;à 3 photos importées → 5 photos professionnelles générées
      </p>
    </div>
  );
}
