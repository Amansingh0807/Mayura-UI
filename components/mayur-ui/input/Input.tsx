"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error = false, ...props }, ref) => {
    const errorStyle = error ? "border-red-400 ring-red-200" : "border-transparent focus:border-[#00aeaf]";

    return (
      <div className={cn("w-full", className)}>
        {label && <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl bg-white/60 dark:bg-slate-900/60 border px-3 py-2 text-sm transition-shadow placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00aeaf]/20",
            errorStyle
          )}
          {...props}
        />
        {error && typeof error === "string" ? (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "MayuraInput";

export default Input;
