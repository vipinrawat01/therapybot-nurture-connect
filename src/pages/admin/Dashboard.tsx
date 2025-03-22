
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserCog, 
  Shield, 
  Settings, 
  BarChart3, 
  TrendingUp,
  ArrowUpRight,
  Bell,
  CheckCircle,
  AlertTriangle,
  Brain,
  PieChart
} from "lucide-react";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration
const systemOverview = {
  users: {
    total: 124,
    therapists: 42,
    supervisors: 8,
    parents: 74,
    admins: 2,
    growth: "+8% this month"
  },
  activity: {
    sessions: 278,
    aiRecommendations: 156,
    parentMessages: 93,
    reports: 42
  },
  performance: {
    systemUptime: "99.8%",
    apiLatency: "124ms",
    activeUsers: 36,
    errorRate: "0.3%"
  }
};

const recentActivities = [
  {
    id: "a1",
    user: "Dr. Emma Thompson",
    role: "Therapist",
    action: "Added new session log",
    time: "10 minutes ago",
    details: "Speech therapy session for Noah Williams"
  },
  {
    id: "a2",
    user: "Janet Miller",
    role: "Supervisor",
    action: "Approved AI recommendation",
    time: "42 minutes ago",
    details: "Updated therapy plan for Mia Rodriguez"
  },
  {
    id: "a3",
    user: "System",
    role: "AI",
    action: "Generated new recommendations",
    time: "1 hour ago",
    details: "5 new therapy suggestions for 3 children"
  },
  {
    id: "a4",
    user: "John Davis",
    role: "Admin",
    action: "Changed user role",
    time: "3 hours ago",
    details: "Promoted Janet Miller to Supervisor"
  },
  {
    id: "a5",
    user: "Sarah Chen",
    role: "Parent",
    action: "Submitted feedback",
    time: "Yesterday",
    details: "Rated home activities as very helpful"
  }
];

const systemAlerts = [
  {
    id: "s1",
    type: "success",
    message: "Daily backups completed successfully",
    time: "4:00 AM"
  },
  {
    id: "s2",
    type: "warning",
    message: "High server load detected",
    time: "10:15 AM"
  },
  {
    id: "s3",
    type: "success",
    message: "AI model training completed",
    time: "Yesterday"
  },
  {
    id: "s4",
    type: "warning",
    message: "Multiple failed login attempts",
    time: "Yesterday"
  }
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Alerts</span>
                </Button>
                <Button size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard 
                title="Total Users"
                value={systemOverview.users.total}
                icon={<Users className="h-5 w-5 text-primary" />}
                trend={systemOverview.users.growth}
                trendUp={true}
                subtitle="Across all roles"
              />
              <StatsCard 
                title="Therapy Sessions"
                value={systemOverview.activity.sessions}
                icon={<BarChart3 className="h-5 w-5 text-primary" />}
                trend="This month"
                trendUp={true}
                subtitle="Logged by therapists"
              />
              <StatsCard 
                title="AI Recommendations"
                value={systemOverview.activity.aiRecommendations}
                icon={<Brain className="h-5 w-5 text-primary" />}
                trend="For all children"
                trendUp={true}
                subtitle="Generated & approved"
              />
              <StatsCard 
                title="System Performance"
                value={systemOverview.performance.systemUptime}
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                trend={`Latency: ${systemOverview.performance.apiLatency}`}
                trendUp={true}
                subtitle="Uptime over 30 days"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Distribution */}
            <section className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">User Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of system users by role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-center mb-6">
                      <div className="h-36 w-36 rounded-full border-8 border-primary flex items-center justify-center relative">
                        <PieChart className="h-10 w-10 text-primary" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-bold text-2xl">{systemOverview.users.total}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <UserTypeBar 
                        type="Therapists" 
                        count={systemOverview.users.therapists} 
                        total={systemOverview.users.total}
                        color="bg-blue-500"
                      />
                      <UserTypeBar 
                        type="Supervisors" 
                        count={systemOverview.users.supervisors} 
                        total={systemOverview.users.total}
                        color="bg-purple-500"
                      />
                      <UserTypeBar 
                        type="Parents" 
                        count={systemOverview.users.parents} 
                        total={systemOverview.users.total}
                        color="bg-green-500"
                      />
                      <UserTypeBar 
                        type="Admins" 
                        count={systemOverview.users.admins} 
                        total={systemOverview.users.total}
                        color="bg-amber-500"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <UserCog className="h-4 w-4" />
                    <span>Manage Users</span>
                  </Button>
                </CardFooter>
              </Card>
            </section>

            {/* Recent Activities */}
            <section className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Recent Activities</CardTitle>
                  <CardDescription>
                    Latest actions across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="flex gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                      >
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                          activity.role === "Therapist" && "bg-blue-500/10 text-blue-500",
                          activity.role === "Supervisor" && "bg-purple-500/10 text-purple-500",
                          activity.role === "Parent" && "bg-green-500/10 text-green-500",
                          activity.role === "Admin" && "bg-amber-500/10 text-amber-500",
                          activity.role === "AI" && "bg-primary/10 text-primary"
                        )}>
                          {activity.role === "Therapist" && <Users className="h-5 w-5" />}
                          {activity.role === "Supervisor" && <Shield className="h-5 w-5" />}
                          {activity.role === "Parent" && <Users className="h-5 w-5" />}
                          {activity.role === "Admin" && <UserCog className="h-5 w-5" />}
                          {activity.role === "AI" && <Brain className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{activity.user}</p>
                              <p className="text-xs text-muted-foreground">
                                <span className={cn(
                                  "inline-block px-1.5 py-0.5 rounded-md mr-2 text-xs",
                                  activity.role === "Therapist" && "bg-blue-500/10 text-blue-500",
                                  activity.role === "Supervisor" && "bg-purple-500/10 text-purple-500",
                                  activity.role === "Parent" && "bg-green-500/10 text-green-500",
                                  activity.role === "Admin" && "bg-amber-500/10 text-amber-500",
                                  activity.role === "AI" && "bg-primary/10 text-primary"
                                )}>
                                  {activity.role}
                                </span>
                                {activity.action}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-xs mt-1 bg-muted/50 p-1.5 rounded">
                            {activity.details}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>View All Activity</span>
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </div>

          {/* System Alerts */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "rounded-lg p-4 border flex items-center gap-4",
                    alert.type === "success" && "bg-status-success/5 border-status-success/30",
                    alert.type === "warning" && "bg-status-warning/5 border-status-warning/30"
                  )}
                >
                  {alert.type === "success" ? (
                    <CheckCircle className="h-6 w-6 text-status-success" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-status-warning" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className={cn(
                        "font-medium",
                        alert.type === "success" && "text-status-success",
                        alert.type === "warning" && "text-status-warning"
                      )}>
                        {alert.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      alert.type === "success" && "text-status-success hover:bg-status-success/10",
                      alert.type === "warning" && "text-status-warning hover:bg-status-warning/10"
                    )}
                  >
                    Details
                  </Button>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  subtitle: string;
}

function StatsCard({ title, value, icon, trend, trendUp, subtitle }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-6 shadow-glass-sm"
    >
      <div className="flex justify-between items-start">
        <div className="rounded-full bg-primary/10 p-2">
          {icon}
        </div>
        <span className={cn(
          "inline-flex items-center text-xs",
          trendUp ? "text-status-success" : "text-status-warning"
        )}>
          {trendUp ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : (
            <AlertTriangle className="mr-1 h-3 w-3" />
          )}
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface UserTypeBarProps {
  type: string;
  count: number;
  total: number;
  color: string;
}

function UserTypeBar({ type, count, total, color }: UserTypeBarProps) {
  const percentage = Math.round((count / total) * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{type}</span>
        <span className="font-medium">{count}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
