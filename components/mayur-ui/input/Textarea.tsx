"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string | boolean;
  autosize?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error = false, autosize = false, ...props }, ref) => {
    const errorStyle = error ? "border-red-400 ring-red-200" : "border-transparent focus:border-[#00aeaf]";

    // simple autosize using onInput if requested
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (!autosize) return;
      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    return (
      <div className={cn("w-full", className)}>
        {label && <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
        <textarea
          ref={ref}
          onInput={handleInput}
          className={cn(
            "w-full min-h-[96px] rounded-xl bg-white/60 dark:bg-slate-900/60 border px-3 py-2 text-sm transition-shadow placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00aeaf]/20",
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

Textarea.displayName = "MayuraTextarea";

export default Textarea;
