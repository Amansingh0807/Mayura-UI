"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  variant?: "default" | "gradient";
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, variant = "default", ...props }, ref) => {
    return (
      <label className={cn("inline-flex items-start gap-3 cursor-pointer group", className)}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 transition-all duration-200",
              "peer-focus:ring-2 peer-focus:ring-[#00aeaf]/40 peer-focus:ring-offset-2",
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
              variant === "default" &&
                "border-gray-300 dark:border-gray-600 peer-checked:border-[#00aeaf]",
              variant === "gradient" &&
                "border-gray-300 dark:border-gray-600 peer-checked:border-transparent"
            )}
          >
            <div
              className={cn(
                "absolute inset-1 rounded-full transition-all duration-200 scale-0 peer-checked:scale-100",
                variant === "default" && "bg-[#00aeaf]",
                variant === "gradient" && "bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2]"
              )}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#0c4bb2] dark:group-hover:text-[#00aeaf] transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = "MayuraRadio";

export default Radio;
