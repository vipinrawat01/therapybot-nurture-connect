
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PortalCard from "@/components/landing/PortalCard";
import { Brain, Users, UserCog, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold"
          >
            TherapyAI
          </motion.h1>
        </div>
        <Button variant="outline" size="sm">
          Contact Support
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            AI-Driven Therapy Management System
          </h2>
          <p className="text-xl text-muted-foreground">
            Intelligent support for therapists, supervisors, parents, and administrators
            to enhance therapy outcomes for children.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          <PortalCard
            title="Parent Portal"
            description="Track your child's progress, access home activities, and communicate with therapists."
            icon={<Users className="h-6 w-6 text-white" />}
            to="/parent-login"
            color="blue"
            delay={1}
            showRegister={true}
          />
          
          <PortalCard
            title="Therapist Portal"
            description="Log therapy sessions, track progress, and get AI recommendations for your patients."
            icon={<Brain className="h-6 w-6 text-white" />}
            to="/therapist-login"
            color="primary"
            delay={2}
            showRegister={true}
          />
          
          <PortalCard
            title="Supervisor Portal"
            description="Monitor therapists, approve AI recommendations, and generate progress reports."
            icon={<UserCog className="h-6 w-6 text-white" />}
            to="/supervisor-login"
            color="green"
            delay={3}
          />
          
          <PortalCard
            title="Admin Portal"
            description="Manage users, roles, and system settings for the entire platform."
            icon={<Shield className="h-6 w-6 text-white" />}
            to="/admin-login"
            color="orange"
            delay={4}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 TherapyAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
