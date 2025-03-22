
import React from "react";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminSystemSettings() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">System Settings</h1>
          <p>This page will allow configuration of system settings and AI behavior monitoring.</p>
        </main>
      </div>
    </div>
  );
}
