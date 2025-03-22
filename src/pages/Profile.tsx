
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Award, 
  Calendar, 
  Clock, 
  FileText,
  Settings,
  Bell,
  LogOut,
  Edit
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TherapistProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  organization: string;
  certifications: string[];
  specialties: string[];
  yearsExperience: number;
  avatar?: string;
  bio: string;
}

// Mock data
const therapist: TherapistProfile = {
  id: "t1",
  name: "Dr. Taylor Wright",
  title: "Senior Speech-Language Pathologist",
  email: "taylor.wright@therapycenter.org",
  phone: "(555) 123-4567",
  organization: "Comprehensive Therapy Center",
  certifications: [
    "CCC-SLP (Certificate of Clinical Competence in Speech-Language Pathology)",
    "BCBA (Board Certified Behavior Analyst)",
    "Certified Autism Specialist"
  ],
  specialties: [
    "Speech Therapy",
    "Language Development",
    "Behavior Therapy",
    "Early Intervention",
    "Autism Spectrum Disorders"
  ],
  yearsExperience: 8,
  bio: "Dr. Taylor Wright is a dedicated speech-language pathologist with extensive experience in pediatric therapy. Specializing in early intervention and autism spectrum disorders, Dr. Wright takes a holistic approach to therapy, incorporating evidence-based practices with family engagement strategies. Having worked in both clinical and educational settings, Dr. Wright brings a comprehensive understanding of child development across different environments."
};

// Stats data
const profileStats = [
  {
    id: "s1",
    label: "Active Children",
    value: 12,
    icon: <User className="h-4 w-4 text-primary" />
  },
  {
    id: "s2",
    label: "Sessions This Month",
    value: 48,
    icon: <Calendar className="h-4 w-4 text-primary" />
  },
  {
    id: "s3",
    label: "Avg. Session Duration",
    value: "45 min",
    icon: <Clock className="h-4 w-4 text-primary" />
  },
  {
    id: "s4",
    label: "Reports Submitted",
    value: 36,
    icon: <FileText className="h-4 w-4 text-primary" />
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"personal" | "preferences">("personal");
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary/10 overflow-hidden border-2 border-primary flex items-center justify-center">
                {therapist.avatar ? (
                  <img 
                    src={therapist.avatar} 
                    alt={therapist.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-primary text-4xl font-bold">
                    {therapist.name.charAt(0)}
                  </span>
                )}
              </div>
              <button 
                className="absolute -bottom-1 -right-1 rounded-full bg-muted p-1.5 border border-border hover:bg-accent transition-colors"
                onClick={() => toast.info("Profile photo update not implemented in this demo")}
              >
                <Edit className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{therapist.name}</h1>
              <p className="text-muted-foreground">{therapist.title}</p>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {therapist.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 md:items-end">
              <button 
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                onClick={() => toast.info("Edit profile not implemented in this demo")}
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              
              <button 
                className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {profileStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-xl bg-card border border-border p-4 shadow-glass-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    {stat.icon}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Tabs */}
          <div className="mb-6 border-b border-border">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("personal")}
                className={cn(
                  "py-3 text-sm font-medium transition-colors border-b-2 border-transparent -mb-px",
                  activeTab === "personal" 
                    ? "border-primary text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={cn(
                  "py-3 text-sm font-medium transition-colors border-b-2 border-transparent -mb-px",
                  activeTab === "preferences" 
                    ? "border-primary text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Preferences & Settings
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === "personal" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address</span>
                    </p>
                    <p className="font-medium">{therapist.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number</span>
                    </p>
                    <p className="font-medium">{therapist.phone}</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>Organization</span>
                    </p>
                    <p className="font-medium">{therapist.organization}</p>
                  </div>
                </div>
              </div>
              
              {/* Qualifications */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h2 className="text-lg font-semibold mb-4">Professional Qualifications</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>Certifications & Credentials</span>
                    </h3>
                    <ul className="space-y-2">
                      {therapist.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3 text-primary"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Experience</span>
                    </h3>
                    <p>
                      <span className="font-medium">{therapist.yearsExperience} years</span> of professional experience in pediatric therapy
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Professional Bio */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h2 className="text-lg font-semibold mb-4">Professional Biography</h2>
                <p className="text-muted-foreground">{therapist.bio}</p>
              </div>
            </motion.div>
          )}
          
          {activeTab === "preferences" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Account Settings */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span>Account Settings</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                    <button 
                      className="rounded-lg bg-muted px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={() => toast.info("Password change not implemented in this demo")}
                    >
                      Change
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <button 
                      className="rounded-lg bg-muted px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={() => toast.info("2FA setup not implemented in this demo")}
                    >
                      Enable
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <h3 className="font-medium">Connected Devices</h3>
                      <p className="text-sm text-muted-foreground">Manage devices with access to your account</p>
                    </div>
                    <button 
                      className="rounded-lg bg-muted px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={() => toast.info("Device management not implemented in this demo")}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notification Preferences */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span>Notification Preferences</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                      <span className="relative inline-block h-5 w-5 rounded-full bg-white shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <h3 className="font-medium">AI Recommendations</h3>
                      <p className="text-sm text-muted-foreground">Get therapy suggestions from AI</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                      <span className="relative inline-block h-5 w-5 rounded-full bg-white shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <h3 className="font-medium">Session Reminders</h3>
                      <p className="text-sm text-muted-foreground">Receive reminders before scheduled sessions</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                      <span className="relative inline-block h-5 w-5 rounded-full bg-white shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h3 className="font-medium">Child Progress Alerts</h3>
                      <p className="text-sm text-muted-foreground">Be notified of significant progress changes</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                      <span className="relative inline-block h-5 w-5 rounded-full bg-white shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Data & Privacy */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h2 className="text-lg font-semibold mb-4">Data & Privacy</h2>
                
                <div className="space-y-4">
                  <button 
                    className="w-full text-left flex justify-between items-center py-3 border-b border-border"
                    onClick={() => toast.info("Data export not implemented in this demo")}
                  >
                    <div>
                      <h3 className="font-medium">Export Your Data</h3>
                      <p className="text-sm text-muted-foreground">Download a copy of your session data</p>
                    </div>
                    <div className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                  </button>
                  
                  <button 
                    className="w-full text-left flex justify-between items-center py-3 border-b border-border"
                    onClick={() => toast.info("Privacy policy not implemented in this demo")}
                  >
                    <div>
                      <h3 className="font-medium">Privacy Policy</h3>
                      <p className="text-sm text-muted-foreground">View how we handle your data</p>
                    </div>
                    <div className="text-primary">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
