
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Search, Settings, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/children":
        return "My Children";
      case "/sessions":
        return "Sessions History";
      case "/ai-assistant":
        return "AI Assistant";
      case "/profile":
        return "Profile";
      default:
        return "Therapy Management";
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-background/90 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative hidden md:flex items-center"
              >
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-full bg-accent pl-10 pr-4 py-2 text-sm outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search size={16} />
                <span>Search...</span>
              </motion.button>
            )}
          </AnimatePresence>

          <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-status-danger animate-pulse"></span>
          </button>

          <button className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Settings size={20} />
          </button>

          <div className="relative h-8 w-8 rounded-full bg-primary/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-primary font-medium">
              TH
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border overflow-hidden bg-background"
          >
            <nav className="flex flex-col p-4 space-y-2">
              <MobileNavLink 
                to="/" 
                active={location.pathname === "/"} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </MobileNavLink>
              <MobileNavLink 
                to="/children" 
                active={location.pathname === "/children"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Children
              </MobileNavLink>
              <MobileNavLink 
                to="/sessions" 
                active={location.pathname === "/sessions"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sessions History
              </MobileNavLink>
              <MobileNavLink 
                to="/ai-assistant" 
                active={location.pathname === "/ai-assistant"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Assistant
              </MobileNavLink>
              <MobileNavLink 
                to="/profile" 
                active={location.pathname === "/profile"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </MobileNavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface MobileNavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function MobileNavLink({ to, active, children, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        active 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
