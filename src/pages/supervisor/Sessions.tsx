
import React from "react";
import Header from "@/components/layout/Header";
import SupervisorSidebar from "@/components/layout/SupervisorSidebar";

export default function SupervisorSessions() {
  return (
    <div className="flex min-h-screen bg-background">
      <SupervisorSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Sessions</h1>
          <p>This page will display all therapy sessions conducted by therapists under this supervisor.</p>
        </main>
      </div>
    </div>
  );
}
