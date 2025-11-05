"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autosize?: boolean;
  maxLength?: number;
  showCount?: boolean;
  variant?: "default" | "filled";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      autosize = false,
      maxLength,
      showCount = false,
      variant = "default",
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      
      if (autosize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      
      onChange?.(e);
    };

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const variants = {
      default: cn(
        "rounded-xl border-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm",
        error
          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
          : "border-transparent focus:border-[#00aeaf] focus:ring-[#00aeaf]/20"
      ),
      filled: cn(
        "rounded-xl border-0 bg-[#00aeaf]/5 dark:bg-[#0c4bb2]/5",
        error
          ? "ring-2 ring-red-400 focus:ring-red-500"
          : "focus:ring-2 focus:ring-[#00aeaf]/30"
      ),
    };

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            className={cn(
              "mb-2 block text-sm font-medium transition-colors",
              error ? "text-red-500" : "text-gray-700 dark:text-gray-300"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={setRefs}
            maxLength={maxLength}
            className={cn(
              "w-full min-h-[96px] px-4 py-3 text-sm transition-all duration-200 resize-none",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:outline-none focus:ring-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              variants[variant],
              autosize && "overflow-hidden"
            )}
            onChange={handleChange}
            {...props}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div>
            {(error || helperText) && (
              <p
                className={cn(
                  "text-xs",
                  error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                )}
              >
                {error || helperText}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p
              className={cn(
                "text-xs",
                charCount >= maxLength ? "text-red-500" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "MayuraTextarea";

export default Textarea;
