
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Bot, 
  UserCircle,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-col p-4 gap-1">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/children" icon={<Users size={20} />} label="My Children" />
        <NavItem to="/sessions" icon={<Clock size={20} />} label="Sessions History" />
        <NavItem to="/ai-assistant" icon={<Bot size={20} />} label="AI Assistant" />
        <NavItem to="/profile" icon={<UserCircle size={20} />} label="Profile" />
      </div>

      <div className="mt-auto p-4">
        <div className="glass-card p-4 rounded-xl space-y-2">
          <h3 className="font-medium text-sm">Need help?</h3>
          <p className="text-xs text-muted-foreground">Get AI assistance with therapy plans and activities.</p>
          <Link 
            to="/ai-assistant"
            className="flex items-center justify-between text-xs font-medium text-primary mt-2 hover:underline"
          >
            <span>Ask AI Assistant</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 group",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <span className={cn(
        "transition-transform duration-200",
        isActive ? "transform-gpu" : "group-hover:translate-x-1"
      )}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
