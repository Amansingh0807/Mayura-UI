"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variants = {
  primary: "bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] text-white shadow-lg shadow-[#00aeaf]/25 hover:shadow-xl hover:shadow-[#0c4bb2]/30 hover:scale-[1.02]",
  secondary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-[1.02]",
  ghost: "bg-transparent text-[#0c4bb2] dark:text-[#00aeaf] hover:bg-[#00aeaf]/10 border border-transparent",
  outline: "bg-transparent border-2 border-[#00aeaf]/30 text-[#0c4bb2] dark:text-[#00aeaf] hover:border-[#00aeaf] hover:bg-[#00aeaf]/5",
  gradient: "bg-gradient-to-br from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden group",
  danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-rose-600/30 hover:scale-[1.02]",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm md:text-base rounded-xl",
  lg: "px-6 py-3 text-base md:text-lg rounded-xl",
  xl: "px-8 py-4 text-lg md:text-xl rounded-2xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]/40 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          "active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {variant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#008c9d] via-[#0c4bb2] to-[#00aeaf] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        {loading && <Loader2 className="h-4 w-4 animate-spin relative z-10" />}
        {!loading && icon && iconPosition === "left" && <span className="relative z-10">{icon}</span>}
        <span className="relative z-10">{children}</span>
        {!loading && icon && iconPosition === "right" && <span className="relative z-10">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "MayuraButton";

export default Button;
