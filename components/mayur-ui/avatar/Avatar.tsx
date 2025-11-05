"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  shape?: "circle" | "square";
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "Avatar",
      fallback,
      size = "md",
      status,
      shape = "circle",
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const getInitials = (name?: string) => {
      if (!name) return "?";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        <div
          className={cn(
            "flex items-center justify-center font-semibold bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] text-white overflow-hidden ring-2 ring-white dark:ring-gray-800",
            sizes[size],
            shape === "circle" ? "rounded-full" : "rounded-lg"
          )}
        >
          {src && !imageError ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span>{getInitials(fallback || alt)}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-800",
              statusColors[status],
              size === "sm" && "w-2 h-2",
              size === "md" && "w-2.5 h-2.5",
              size === "lg" && "w-3 h-3",
              size === "xl" && "w-4 h-4"
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "MayuraAvatar";

export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  className?: string;
}> = ({ children, max = 3, className }) => {
  const childrenArray = React.Children.toArray(children);
  const displayedChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = childrenArray.length - displayedChildren.length;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayedChildren}
      {remainingCount > 0 && (
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-gray-800">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = "MayuraAvatarGroup";

export default Avatar;
