import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "success" | "warning" | "error" | "muted";
  className?: string;
}

const variantClasses = {
  brand:   "bg-[var(--brand-100)] text-[var(--brand-700)] border-[var(--brand-200)]",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error:   "bg-red-50 text-red-700 border-red-200",
  muted:   "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)]",
};

export default function Badge({ children, variant = "brand", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
