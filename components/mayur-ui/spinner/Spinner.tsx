"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "ring" | "dots" | "pulse" | "gradient";
  color?: "primary" | "secondary" | "white";
}

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const colors = {
  primary: "border-[#00aeaf]",
  secondary: "border-purple-500",
  white: "border-white",
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = "md",
      variant = "ring",
      color = "primary",
      ...props
    },
    ref
  ) => {
    const pixelSize = sizes[size];

    if (variant === "ring") {
      return (
        <div
          ref={ref}
          className={cn("inline-block", className)}
          style={{ width: pixelSize, height: pixelSize }}
          {...props}
        >
          <div
            className={cn(
              "w-full h-full rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-transparent animate-spin",
              colors[color]
            )}
            style={{ borderTopColor: "transparent" }}
          />
        </div>
      );
    }

    if (variant === "dots") {
      return (
        <div
          ref={ref}
          className={cn("inline-flex items-center gap-1", className)}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full bg-[#00aeaf] animate-pulse",
                size === "sm" && "w-1.5 h-1.5",
                size === "md" && "w-2 h-2",
                size === "lg" && "w-2.5 h-2.5",
                size === "xl" && "w-3 h-3"
              )}
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          ref={ref}
          className={cn("inline-block", className)}
          style={{ width: pixelSize, height: pixelSize }}
          {...props}
        >
          <div
            className="w-full h-full rounded-full bg-[#00aeaf] animate-ping"
          />
        </div>
      );
    }

    // gradient variant
    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
        style={{ width: pixelSize, height: pixelSize }}
        {...props}
      >
        <div className="w-full h-full rounded-full border-2 border-transparent bg-gradient-to-r from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] animate-spin relative">
          <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900" />
        </div>
      </div>
    );
  }
);

Spinner.displayName = "MayuraSpinner";

export default Spinner;
