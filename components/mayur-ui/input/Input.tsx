"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "flushed";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      type = "text",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const variants = {
      default: cn(
        "rounded-xl border-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-4 py-2.5",
        error
          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
          : "border-transparent focus:border-[#00aeaf] focus:ring-[#00aeaf]/20",
        leftIcon && "pl-10",
        rightIcon && "pr-10"
      ),
      filled: cn(
        "rounded-xl border-0 bg-[#00aeaf]/5 dark:bg-[#0c4bb2]/5 px-4 py-2.5",
        error
          ? "ring-2 ring-red-400 focus:ring-red-500"
          : "focus:ring-2 focus:ring-[#00aeaf]/30",
        leftIcon && "pl-10",
        rightIcon && "pr-10"
      ),
      flushed: cn(
        "rounded-none border-0 border-b-2 bg-transparent px-1 py-2",
        error
          ? "border-red-400 focus:border-red-500"
          : "border-gray-300 dark:border-gray-700 focus:border-[#00aeaf]",
        leftIcon && "pl-8",
        rightIcon && "pr-8"
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
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full text-sm transition-all duration-200",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:outline-none focus:ring-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              variants[variant]
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
          {variant === "default" && (isFocused || hasValue) && !error && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] rounded-full transform scale-x-0 animate-in slide-in-from-left duration-200" />
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "MayuraInput";

export default Input;
