"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface MayuraTooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  showArrow?: boolean;
  variant?: "default" | "gradient" | "dark";
}

export const MayuraTooltip = ({
  children,
  content,
  position = "top",
  delay = 200,
  className,
  showArrow = true,
  variant = "default",
}: MayuraTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8; // Gap between trigger and tooltip

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + gap;
        break;
    }

    setCoords({ top, left });
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const variantClasses = {
    default: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-lg",
    gradient: "bg-gradient-to-br from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] text-white shadow-xl",
    dark: "bg-gray-900 text-white shadow-xl",
  };

  const arrowClasses = {
    default: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
    gradient: "bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2]",
    dark: "bg-gray-900",
  };

  const arrowPositionClasses = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2 rotate-45",
    left: "right-[-4px] top-1/2 -translate-y-1/2 rotate-45",
    right: "left-[-4px] top-1/2 -translate-y-1/2 rotate-45",
  };

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            "fixed z-50 px-3 py-2 text-sm rounded-lg pointer-events-none",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            variantClasses[variant],
            className
          )}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                "absolute w-2 h-2",
                variant === "default" && "border",
                arrowClasses[variant],
                arrowPositionClasses[position]
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};
