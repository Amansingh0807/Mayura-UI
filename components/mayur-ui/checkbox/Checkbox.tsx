"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  variant?: "default" | "gradient";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, indeterminate = false, variant = "default", ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const setRefs = React.useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <label className={cn("inline-flex items-start gap-3 cursor-pointer group", className)}>
        <div className="relative flex items-center justify-center">
          <input
            ref={setRefs}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-md border-2 transition-all duration-200",
              "peer-focus:ring-2 peer-focus:ring-[#00aeaf]/40 peer-focus:ring-offset-2",
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
              variant === "default" &&
                "border-gray-300 dark:border-gray-600 peer-checked:bg-[#00aeaf] peer-checked:border-[#00aeaf]",
              variant === "gradient" &&
                "border-gray-300 dark:border-gray-600 peer-checked:bg-gradient-to-br peer-checked:from-[#00aeaf] peer-checked:to-[#0c4bb2] peer-checked:border-transparent"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
              {indeterminate ? <Minus className="w-3 h-3" /> : <Check className="w-3 h-3" />}
            </div>
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

Checkbox.displayName = "MayuraCheckbox";

export default Checkbox;
