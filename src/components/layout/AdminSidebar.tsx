
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  Shield, 
  Settings,
  FileText, 
  UserCircle,
  ChevronRight
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-col p-4 gap-1">
        <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/admin/therapists" icon={<Users size={20} />} label="Therapists" />
        <NavItem to="/admin/user-management" icon={<UserCog size={20} />} label="User Management" />
        <NavItem to="/admin/role-management" icon={<Shield size={20} />} label="Role Management" />
        <NavItem to="/admin/system-settings" icon={<Settings size={20} />} label="System Settings" />
        <NavItem to="/admin/reports" icon={<FileText size={20} />} label="Reports" />
        <NavItem to="/admin/profile" icon={<UserCircle size={20} />} label="Profile" />
      </div>

      <div className="mt-auto p-4">
        <div className="glass-card p-4 rounded-xl space-y-2 bg-primary/5 border border-primary/10">
          <h3 className="font-medium text-sm">Admin Controls</h3>
          <p className="text-xs text-muted-foreground">Manage system, users and permissions.</p>
          <Link 
            to="/admin/user-management"
            className="flex items-center justify-between text-xs font-medium text-primary mt-2 hover:underline"
          >
            <span>Manage Users</span>
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
