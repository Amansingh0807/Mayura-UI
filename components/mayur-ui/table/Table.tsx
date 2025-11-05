"use client";

import React, { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MayuraTableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  className?: string;
  width?: string;
}

export interface MayuraTableProps<T = Record<string, unknown>> {
  columns: MayuraTableColumn<T>[];
  data: T[];
  className?: string;
  variant?: "default" | "striped" | "bordered" | "minimal";
  hoverable?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  compact?: boolean;
  stickyHeader?: boolean;
}

type SortOrder = "asc" | "desc" | null;

export const MayuraTable = <T extends Record<string, unknown>>({
  columns,
  data,
  className,
  variant = "default",
  hoverable = true,
  selectable = false,
  onRowSelect,
  compact = false,
  stickyHeader = false,
}: MayuraTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder(null);
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortOrder) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortKey] as string | number;
      const bValue = b[sortKey] as string | number;

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIndices = new Set(data.map((_, index) => index));
      setSelectedRows(allIndices);
      onRowSelect?.(data);
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(Array.from(newSelectedRows).map((i) => data[i]));
  };

  const variantClasses = {
    default: {
      table: "border border-gray-200 dark:border-gray-800",
      th: "bg-gray-50 dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800",
      td: "border-b border-gray-200 dark:border-gray-800",
    },
    striped: {
      table: "border border-gray-200 dark:border-gray-800",
      th: "bg-gradient-to-r from-[#00aeaf]/10 via-[#0c4bb2]/10 to-[#008c9d]/10 border-b-2 border-[#00aeaf]",
      td: "border-b border-gray-200 dark:border-gray-800",
    },
    bordered: {
      table: "border-2 border-[#00aeaf]",
      th: "bg-[#00aeaf]/5 border-b-2 border-[#00aeaf] border-r border-gray-200 dark:border-gray-800 last:border-r-0",
      td: "border-b border-r border-gray-200 dark:border-gray-800 last:border-r-0",
    },
    minimal: {
      table: "",
      th: "border-b border-gray-300 dark:border-gray-700",
      td: "border-b border-gray-200 dark:border-gray-800",
    },
  };

  const paddingClass = compact ? "px-3 py-2" : "px-6 py-4";

  return (
    <div className={cn("w-full overflow-x-auto rounded-xl", className)}>
      <table className={cn("w-full", variantClasses[variant].table)}>
        <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
          <tr>
            {selectable && (
              <th
                className={cn(
                  "text-left font-semibold text-gray-700 dark:text-gray-300",
                  paddingClass,
                  variantClasses[variant].th
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-[#00aeaf] focus:ring-[#00aeaf] cursor-pointer"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-left font-semibold text-gray-700 dark:text-gray-300",
                  paddingClass,
                  variantClasses[variant].th,
                  column.className
                )}
                style={{ width: column.width }}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2 hover:text-[#00aeaf] transition-colors group"
                  >
                    {column.label}
                    {sortKey === column.key ? (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-4 h-4 text-[#00aeaf]" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-[#00aeaf]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-12 text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "transition-colors",
                  hoverable && "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  variant === "striped" && rowIndex % 2 === 0 && "bg-gray-50/50 dark:bg-gray-800/30",
                  selectedRows.has(rowIndex) && "bg-[#00aeaf]/5"
                )}
              >
                {selectable && (
                  <td className={cn(paddingClass, variantClasses[variant].td)}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => handleSelectRow(rowIndex)}
                      className="w-4 h-4 rounded border-gray-300 text-[#00aeaf] focus:ring-[#00aeaf] cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      paddingClass,
                      variantClasses[variant].td,
                      "text-gray-900 dark:text-gray-100",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : (row[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
