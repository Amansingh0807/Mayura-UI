"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MayuraPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxPageNumbers?: number;
  variant?: "default" | "rounded" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
  showFirstLast?: boolean;
}

export const MayuraPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxPageNumbers = 5,
  variant = "default",
  size = "md",
  className,
  showFirstLast = true,
}: MayuraPaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSide = Math.floor(maxPageNumbers / 2);
      const rightSide = maxPageNumbers - leftSide - 1;

      if (currentPage <= leftSide + 1) {
        for (let i = 1; i <= maxPageNumbers - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - rightSide) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxPageNumbers + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - leftSide + 1; i <= currentPage + rightSide - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const sizeClasses = {
    sm: "h-8 min-w-8 text-sm",
    md: "h-10 min-w-10 text-base",
    lg: "h-12 min-w-12 text-lg",
  };

  const variantClasses = {
    default: {
      button: "border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800",
      active: "bg-[#00aeaf] text-white border-[#00aeaf] hover:bg-[#008c9d]",
    },
    rounded: {
      button: "rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800",
      active: "bg-gradient-to-r from-[#00aeaf] via-[#0c4bb2] to-[#008c9d] text-white border-transparent",
    },
    minimal: {
      button: "hover:bg-gray-100 dark:hover:bg-gray-800",
      active: "text-[#00aeaf] font-semibold underline underline-offset-4",
    },
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={cn("flex items-center gap-2", className)}
      role="navigation"
      aria-label="Pagination"
    >
      {/* First Page */}
      {showFirstLast && (
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            sizeClasses[size],
            variant === "rounded" ? "rounded-full" : "rounded-lg",
            variantClasses[variant].button,
            currentPage === 1 && "opacity-50 cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
          )}
          aria-label="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      )}

      {/* Previous Page */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          sizeClasses[size],
          variant === "rounded" ? "rounded-full" : "rounded-lg",
          variantClasses[variant].button,
          currentPage === 1 && "opacity-50 cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {showPageNumbers &&
        getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => handlePageClick(page)}
                className={cn(
                  "flex items-center justify-center transition-all duration-200 font-medium",
                  sizeClasses[size],
                  variant === "rounded" ? "rounded-full" : "rounded-lg",
                  page === currentPage
                    ? variantClasses[variant].active
                    : variantClasses[variant].button,
                  "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
                )}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ) : (
              <span
                className={cn(
                  "flex items-center justify-center text-gray-400",
                  sizeClasses[size]
                )}
              >
                {page}
              </span>
            )}
          </React.Fragment>
        ))}

      {/* Next Page */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          sizeClasses[size],
          variant === "rounded" ? "rounded-full" : "rounded-lg",
          variantClasses[variant].button,
          currentPage === totalPages && "opacity-50 cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Last Page */}
      {showFirstLast && (
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            sizeClasses[size],
            variant === "rounded" ? "rounded-full" : "rounded-lg",
            variantClasses[variant].button,
            currentPage === totalPages && "opacity-50 cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-[#00aeaf]"
          )}
          aria-label="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};

export interface MayuraPaginationInfoProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  className?: string;
}

export const MayuraPaginationInfo = ({
  currentPage,
  pageSize,
  totalItems,
  className,
}: MayuraPaginationInfoProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={cn("text-sm text-gray-600 dark:text-gray-400", className)}>
      Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem}</span> to{" "}
      <span className="font-semibold text-gray-900 dark:text-white">{endItem}</span> of{" "}
      <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> results
    </div>
  );
};
