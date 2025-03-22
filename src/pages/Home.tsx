
import React from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserCog, Settings } from "lucide-react";
import PortalCard from "@/components/landing/PortalCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text">
            AI-Driven Therapy Management
          </h1>
        </div>
      </header>

      <main className="container py-12 px-4 max-w-6xl mx-auto flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to AI-Driven Therapy Management System
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Please select your portal to access the system. Each portal is designed for specific roles 
            with customized dashboards and functionalities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <PortalCard 
            title="Parent Portal" 
            description="Monitor your child's progress, access home activities, and communicate with supervisors."
            icon={<Users className="h-6 w-6" />}
            to="/parent-login"
            color="primary"
            delay={1}
            showRegister={true}
          />
          <PortalCard 
            title="Therapist Portal" 
            description="Manage therapy sessions, track children's progress, and receive AI recommendations."
            icon={<UserCheck className="h-6 w-6" />}
            to="/therapist-login"
            color="blue"
            delay={2}
            showRegister={true}
          />
          <PortalCard 
            title="Supervisor Portal" 
            description="Monitor therapy quality, review session logs, and approve AI recommendations."
            icon={<UserCog className="h-6 w-6" />}
            to="/supervisor-login"
            color="green"
            delay={3}
          />
          <PortalCard 
            title="Admin Portal" 
            description="Manage users, system settings, and access comprehensive analytics."
            icon={<Settings className="h-6 w-6" />}
            to="/admin-login"
            color="orange"
            delay={4}
          />
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container px-4 max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2023 AI-Driven Therapy Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
