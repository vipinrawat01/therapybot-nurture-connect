
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  value: number;
  max: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  color?: "primary" | "success" | "warning" | "danger";
  label?: string;
  className?: string;
}

export default function ProgressIndicator({
  value,
  max,
  size = "md",
  showValue = true,
  color = "primary",
  label,
  className,
}: ProgressIndicatorProps) {
  const percentage = Math.round((value / max) * 100);
  
  // Size variants
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };
  
  // Color variants
  const colorClasses = {
    primary: "bg-primary",
    success: "bg-status-success",
    warning: "bg-status-warning",
    danger: "bg-status-danger",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {value}/{max} ({percentage}%)
            </span>
          )}
        </div>
      )}
      
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])}>
        <motion.div
          className={cn("h-full rounded-full", colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
