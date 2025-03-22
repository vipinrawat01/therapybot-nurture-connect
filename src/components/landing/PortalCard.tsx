
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PortalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: "primary" | "blue" | "green" | "orange";
  delay?: number;
  showRegister?: boolean;
}

export default function PortalCard({
  title,
  description,
  icon,
  to,
  color,
  delay = 0,
  showRegister = false,
}: PortalCardProps) {
  const colorVariants = {
    primary: "from-primary/80 to-primary hover:from-primary/90 hover:to-primary/90",
    blue: "from-blue-500/80 to-blue-600 hover:from-blue-500/90 hover:to-blue-600/90",
    green: "from-green-500/80 to-green-600 hover:from-green-500/90 hover:to-green-600/90",
    orange: "from-amber-500/80 to-amber-600 hover:from-amber-500/90 hover:to-amber-600/90",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className="flex flex-col"
    >
      <Link 
        to={to} 
        className={cn(
          "flex flex-col justify-between h-full p-6 rounded-2xl bg-gradient-to-r shadow-glass-sm border border-white/10 text-white",
          colorVariants[color]
        )}
      >
        <div className="flex flex-col h-full">
          <div className="rounded-full bg-white/20 p-4 w-fit mb-4 backdrop-blur-sm">
            {icon}
          </div>
          
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-white/80 mb-6 flex-grow">{description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              Sign In
            </span>
            
            {showRegister && (
              <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                Register
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
