"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const variants = {
  default: {
    container: "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800",
    icon: "text-gray-600 dark:text-gray-400",
    title: "text-gray-900 dark:text-gray-100",
    description: "text-gray-600 dark:text-gray-400",
  },
  success: {
    container: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900",
    icon: "text-green-600 dark:text-green-400",
    title: "text-green-900 dark:text-green-100",
    description: "text-green-700 dark:text-green-300",
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900",
    icon: "text-yellow-600 dark:text-yellow-400",
    title: "text-yellow-900 dark:text-yellow-100",
    description: "text-yellow-700 dark:text-yellow-300",
  },
  error: {
    container: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-900 dark:text-red-100",
    description: "text-red-700 dark:text-red-300",
  },
  info: {
    container: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-900 dark:text-blue-100",
    description: "text-blue-700 dark:text-blue-300",
  },
};

const defaultIcons = {
  default: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    if (dismissed) return null;

    const IconComponent = defaultIcons[variant];
    const variantStyles = variants[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl border p-4 transition-all duration-200",
          variantStyles.container,
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex gap-3">
          <div className={cn("flex-shrink-0", variantStyles.icon)}>
            {icon || <IconComponent className="h-5 w-5" />}
          </div>
          <div className="flex-1 space-y-1">
            {title && (
              <h5 className={cn("text-sm font-semibold", variantStyles.title)}>
                {title}
              </h5>
            )}
            {description && (
              <p className={cn("text-sm", variantStyles.description)}>
                {description}
              </p>
            )}
            {children && (
              <div className={cn("text-sm", variantStyles.description)}>
                {children}
              </div>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                variantStyles.icon
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "MayuraAlert";

export default Alert;
