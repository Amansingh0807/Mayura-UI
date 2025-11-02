"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const base = "inline-flex items-center justify-center rounded-2xl font-medium transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<string, string> = {
  primary: "bg-gradient-to-r from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] text-white shadow-lg hover:scale-[1.02] active:scale-100 focus:ring-[#00aeaf]/40",
  ghost: "bg-transparent text-[#0c4bb2] hover:bg-[#00aeaf]/8 border border-transparent",
  outline: "bg-transparent border border-[#00aeaf]/20 text-[#0c4bb2] hover:border-[#00aeaf]",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-6 py-3 text-base md:text-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant] ?? variants.primary, sizes[size] ?? sizes.md, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "MayuraButton";

export default Button;
