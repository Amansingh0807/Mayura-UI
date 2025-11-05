"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface MayuraTabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
}

export interface MayuraTabsProps {
  items: MayuraTabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "pills" | "gradient";
  className?: string;
  fullWidth?: boolean;
}

export const MayuraTabs = ({
  items,
  defaultValue,
  onChange,
  variant = "line",
  className,
  fullWidth = false,
}: MayuraTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.value === activeTab);
    const activeTabElement = tabsRef.current[activeIndex];

    if (activeTabElement && variant === "line") {
      setIndicatorStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab, items, variant]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  const activeContent = items.find((item) => item.value === activeTab)?.content;

  const tabVariantClasses = {
    line: {
      tab: "px-4 py-2.5 font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
      activeTab: "text-[#00aeaf] dark:text-[#00aeaf]",
      container: "border-b border-gray-200 dark:border-gray-800",
    },
    pills: {
      tab: "px-4 py-2.5 font-medium rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
      activeTab: "bg-[#00aeaf] text-white hover:bg-[#008c9d]",
      container: "bg-gray-50 dark:bg-gray-900 rounded-xl p-1",
    },
    gradient: {
      tab: "px-4 py-2.5 font-medium rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
      activeTab: "bg-gradient-to-r from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] text-white shadow-lg",
      container: "bg-gray-50 dark:bg-gray-900 rounded-xl p-1",
    },
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div
        className={cn(
          "relative flex gap-1",
          tabVariantClasses[variant].container,
          fullWidth && "justify-stretch"
        )}
        role="tablist"
      >
        {items.map((item, index) => (
          <button
            key={item.value}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            onClick={() => !item.disabled && handleTabChange(item.value)}
            disabled={item.disabled}
            className={cn(
              "flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeaf] focus:ring-offset-2 dark:focus:ring-offset-gray-900",
              tabVariantClasses[variant].tab,
              activeTab === item.value && tabVariantClasses[variant].activeTab,
              item.disabled && "opacity-50 cursor-not-allowed",
              fullWidth && "flex-1 justify-center"
            )}
            role="tab"
            aria-selected={activeTab === item.value}
            aria-disabled={item.disabled}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </button>
        ))}

        {/* Animated Indicator for Line Variant */}
        {variant === "line" && (
          <div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] transition-all duration-300 rounded-full"
            style={{
              width: `${indicatorStyle.width}px`,
              left: `${indicatorStyle.left}px`,
            }}
          />
        )}
      </div>

      {/* Tab Content */}
      <div
        className="mt-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
        role="tabpanel"
      >
        {activeContent}
      </div>
    </div>
  );
};
