
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Baby,
  LineChart, 
  Sparkles,
  Clock, 
  FileText, 
  UserCircle,
  ChevronRight
} from "lucide-react";

export default function SupervisorSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-col p-4 gap-1">
        <NavItem to="/supervisor/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/supervisor/therapists" icon={<Users size={20} />} label="Therapists" />
        <NavItem to="/supervisor/children" icon={<Baby size={20} />} label="Children" />
        <NavItem to="/supervisor/child-progress" icon={<LineChart size={20} />} label="Child Progress" />
        <NavItem to="/supervisor/recommendations" icon={<Sparkles size={20} />} label="Recommendations" />
        <NavItem to="/supervisor/sessions" icon={<Clock size={20} />} label="Sessions" />
        <NavItem to="/supervisor/reports" icon={<FileText size={20} />} label="Reports" />
        <NavItem to="/supervisor/profile" icon={<UserCircle size={20} />} label="Profile" />
      </div>

      <div className="mt-auto p-4">
        <div className="glass-card p-4 rounded-xl space-y-2">
          <h3 className="font-medium text-sm">Need assistance?</h3>
          <p className="text-xs text-muted-foreground">Get help with therapy management and reports.</p>
          <Link 
            to="/supervisor/dashboard"
            className="flex items-center justify-between text-xs font-medium text-primary mt-2 hover:underline"
          >
            <span>View Dashboard</span>
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
