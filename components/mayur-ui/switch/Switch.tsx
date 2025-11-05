"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  variant?: "default" | "gradient";
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: {
    track: "w-8 h-5",
    thumb: "w-3 h-3",
    translate: "peer-checked:translate-x-3",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-4 h-4",
    translate: "peer-checked:translate-x-5",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-5 h-5",
    translate: "peer-checked:translate-x-7",
  },
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, variant = "default", size = "md", ...props }, ref) => {
    const sizeClasses = sizes[size];

    return (
      <label className={cn("inline-flex items-start gap-3 cursor-pointer group", className)}>
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "rounded-full transition-all duration-200",
              "peer-focus:ring-2 peer-focus:ring-[#00aeaf]/40 peer-focus:ring-offset-2",
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
              sizeClasses.track,
              variant === "default" &&
                "bg-gray-300 dark:bg-gray-600 peer-checked:bg-[#00aeaf]",
              variant === "gradient" &&
                "bg-gray-300 dark:bg-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-[#00aeaf] peer-checked:to-[#0c4bb2]"
            )}
          >
            <div
              className={cn(
                "absolute left-1 rounded-full bg-white shadow-md transition-transform duration-200",
                sizeClasses.thumb,
                sizeClasses.translate
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

Switch.displayName = "MayuraSwitch";

export default Switch;
