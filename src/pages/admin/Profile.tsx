
import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  FileEdit, 
  Shield, 
  Lock,
  KeyRound,
  LogOut,
  ExternalLink
} from "lucide-react";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock admin data
const adminData = {
  name: "John Davidson",
  email: "john.davidson@therapyai.com",
  phone: "+1 (555) 123-4567",
  role: "System Administrator",
  joinDate: "March 15, 2023",
  lastLogin: "Today at 8:45 AM",
  permissions: [
    "User Management",
    "System Configuration",
    "Role Assignment",
    "Data Management",
    "Reports Access",
    "Audit Logs"
  ],
  recentActivities: [
    {
      id: "act1",
      action: "Updated system settings",
      date: "Today at 10:30 AM"
    },
    {
      id: "act2",
      action: "Added new supervisor",
      date: "Yesterday at 2:15 PM"
    },
    {
      id: "act3",
      action: "Modified user roles",
      date: "May 18, 2023 at 11:20 AM"
    },
    {
      id: "act4",
      action: "Generated system report",
      date: "May 15, 2023 at 9:45 AM"
    }
  ]
};

const securitySettings = [
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    enabled: true
  },
  {
    id: "sessions",
    title: "Active Sessions",
    description: "Manage devices where you're currently logged in",
    enabled: false
  },
  {
    id: "password",
    title: "Password Management",
    description: "Change your password or set up password requirements",
    enabled: true
  },
  {
    id: "notifications",
    title: "Login Notifications",
    description: "Get notified of new logins to your account",
    enabled: true
  }
];

export default function AdminProfile() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Profile</h1>
              <p className="text-muted-foreground">Manage your account and security settings</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                <FileEdit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                      {adminData.name.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                      <Shield className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{adminData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{adminData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{adminData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium">{adminData.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="font-medium">{adminData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings and Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securitySettings.map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex gap-3">
                        {setting.id === "2fa" && <KeyRound className="h-5 w-5 text-muted-foreground mt-0.5" />}
                        {setting.id === "sessions" && <Computer className="h-5 w-5 text-muted-foreground mt-0.5" />}
                        {setting.id === "password" && <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />}
                        {setting.id === "notifications" && <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />}
                        <div>
                          <p className="font-medium">{setting.title}</p>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mr-2 ${
                          setting.enabled ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                        }`}>
                          {setting.enabled ? "Enabled" : "Disabled"}
                        </span>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardHeader className="pb-3 pt-6">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and login activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Activity Log</Button>
              </CardFooter>
            </Card>

            {/* Permissions Card */}
            <Card className="lg:col-span-3">
              <CardHeader className="pb-3">
                <CardTitle>System Permissions</CardTitle>
                <CardDescription>Your access rights in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {adminData.permissions.map((permission, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 border rounded-lg p-3 bg-background"
                    >
                      <Shield className="h-5 w-5 text-primary" />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground w-full text-center">
                  As an administrator, you have full access to all system features
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function Computer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
