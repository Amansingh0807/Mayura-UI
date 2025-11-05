"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MayuraDropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  onClick?: () => void;
  children?: MayuraDropdownItem[];
}

export interface MayuraDropdownProps {
  trigger: React.ReactNode;
  items: MayuraDropdownItem[];
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
  variant?: "default" | "gradient" | "bordered";
  closeOnSelect?: boolean;
}

export const MayuraDropdown = ({
  trigger,
  items,
  position = "bottom-left",
  className,
  variant = "default",
  closeOnSelect = true,
}: MayuraDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (item: MayuraDropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    if (closeOnSelect && !item.children) {
      setIsOpen(false);
    }
  };

  const positionClasses = {
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
    "top-left": "bottom-full left-0 mb-2",
    "top-right": "bottom-full right-0 mb-2",
  };

  const variantClasses = {
    default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg",
    gradient: "bg-white dark:bg-gray-900 border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-br before:from-[#00aeaf] before:via-[#0c4bb2] before:to-[#008c9d] before:p-[2px]",
    bordered: "bg-white dark:bg-gray-900 border-2 border-[#00aeaf] shadow-lg shadow-[#00aeaf]/20",
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 min-w-[200px] rounded-xl py-2",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            positionClasses[position],
            variantClasses[variant],
            className
          )}
          role="menu"
        >
          {items.map((item) => (
            <React.Fragment key={item.value}>
              {item.divider ? (
                <div className="my-2 h-px bg-gray-200 dark:bg-gray-800" />
              ) : (
                <DropdownMenuItem
                  item={item}
                  onClick={() => handleItemClick(item)}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

interface DropdownMenuItemProps {
  item: MayuraDropdownItem;
  onClick: () => void;
}

const DropdownMenuItem = ({ item, onClick }: DropdownMenuItemProps) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setShowSubmenu(true)}
      onMouseLeave={() => item.children && setShowSubmenu(false)}
    >
      <button
        onClick={onClick}
        disabled={item.disabled}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-all duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          item.disabled && "opacity-50 cursor-not-allowed",
          item.danger && "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950",
          "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
        )}
        role="menuitem"
      >
        {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {item.children && <ChevronRight className="w-4 h-4 shrink-0" />}
      </button>

      {/* Submenu */}
      {item.children && showSubmenu && (
        <div
          className={cn(
            "absolute left-full top-0 ml-1 min-w-[200px] rounded-xl py-2",
            "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg",
            "animate-in fade-in-0 slide-in-from-left-2 duration-200"
          )}
          role="menu"
        >
          {item.children.map((child) => (
            <DropdownMenuItem
              key={child.value}
              item={child}
              onClick={() => child.onClick?.()}
            />
          ))}
        </div>
      )}
    </div>
  );
};
