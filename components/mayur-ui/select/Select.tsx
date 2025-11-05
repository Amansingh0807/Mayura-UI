"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MayuraSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface MayuraSelectProps {
  options: MayuraSelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

export const MayuraSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className,
  disabled = false,
  multiple = false,
  searchable = false,
  variant = "default",
  size = "md",
}: MayuraSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter((v) => v !== optionValue));
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean);
    }
    return options.find((opt) => opt.value === value)?.label;
  };

  const sizeClasses = {
    sm: "h-9 text-sm px-3",
    md: "h-11 text-base px-4",
    lg: "h-13 text-lg px-5",
  };

  const variantClasses = {
    default: "bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 focus-within:border-[#00aeaf]",
    filled: "bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus-within:border-[#00aeaf] focus-within:bg-white dark:focus-within:bg-gray-900",
    outlined: "bg-transparent border-2 border-[#00aeaf] focus-within:border-[#0c4bb2]",
  };

  return (
    <div ref={selectRef} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between gap-2 rounded-xl transition-all duration-200",
          sizeClasses[size],
          variantClasses[variant],
          disabled && "opacity-50 cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-[#00aeaf] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        )}
      >
        <div className="flex flex-wrap gap-1.5 flex-1">
          {multiple && Array.isArray(value) && value.length > 0 ? (
            (getDisplayValue() as string[]).map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#00aeaf] text-white text-sm rounded-md"
              >
                {label}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-300"
                  onClick={(e) => handleRemove(value[index], e)}
                />
              </span>
            ))
          ) : (
            <span className={cn("truncate", !value && "text-gray-400")}>
              {(getDisplayValue() as string) || placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800",
            "rounded-xl shadow-2xl max-h-60 overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
          )}
        >
          {/* Search */}
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className={cn(
                    "w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
                  )}
                />
              </div>
            </div>
          )}

          {/* Options */}
          <div className="overflow-y-auto max-h-48 p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    isSelected(option.value) && "bg-[#00aeaf]/10 text-[#00aeaf]",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {option.icon && <span className="w-5 h-5 shrink-0">{option.icon}</span>}
                  <span className="flex-1">{option.label}</span>
                  {isSelected(option.value) && (
                    <Check className="w-5 h-5 shrink-0 text-[#00aeaf]" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
