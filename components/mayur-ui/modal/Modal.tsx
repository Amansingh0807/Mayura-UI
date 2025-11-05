"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MayuraModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  variant?: "default" | "gradient" | "blur";
}

export const MayuraModal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  className,
  showCloseButton = true,
  closeOnBackdropClick = true,
  variant = "default",
}: MayuraModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full m-4",
  };

  const variantClasses = {
    default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    gradient: "bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-[#00aeaf] before:via-[#0c4bb2] before:to-[#008c9d] before:p-[2px]",
    blur: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50",
  };

  const backdropVariants = {
    default: "bg-black/50",
    gradient: "bg-gradient-to-br from-black/60 via-[#0c4bb2]/20 to-black/60",
    blur: "bg-black/30 backdrop-blur-sm",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "animate-in fade-in-0 duration-200",
        backdropVariants[variant]
      )}
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={cn(
          "relative w-full rounded-2xl shadow-2xl",
          "animate-in zoom-in-95 slide-in-from-bottom-4 duration-200",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
                )}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export interface MayuraModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const MayuraModalHeader = ({ children, className }: MayuraModalHeaderProps) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

export interface MayuraModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const MayuraModalFooter = ({ children, className }: MayuraModalFooterProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 pt-4 mt-4",
        "border-t border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
};
