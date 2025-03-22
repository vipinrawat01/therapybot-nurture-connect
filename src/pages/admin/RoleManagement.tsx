
import React from "react";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminRoleManagement() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Role Management</h1>
          <p>This page will allow creation and management of user roles, including supervisors and admins.</p>
        </main>
      </div>
    </div>
  );
}
