import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "gray" | "green" | "red" | "yellow" | "blue" | "purple" | "orange";
  className?: string;
}

const colorStyles: Record<string, string> = {
  gray: "bg-gray-100 text-gray-600",
  green: "bg-emerald-50 text-emerald-600",
  red: "bg-red-50 text-red-600",
  yellow: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-orange-50 text-orange-600",
};

export function Badge({
  children,
  color = "gray",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  );
}
