
import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Calendar, 
  Users, 
  Baby,
  Clock, 
  Plus, 
  FileText, 
  Brain, 
  Sparkles,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  MessageCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import SupervisorSidebar from "@/components/layout/SupervisorSidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const therapists = [
  {
    id: "1",
    name: "Dr. Emma Thompson",
    role: "Speech & OT Therapist",
    childrenCount: 8,
    sessionsThisWeek: 24,
    performance: 92
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    role: "Behavior Therapist",
    childrenCount: 6,
    sessionsThisWeek: 18,
    performance: 88
  },
  {
    id: "3",
    name: "Dr. Sarah Williams",
    role: "Sensory Therapist",
    childrenCount: 5,
    sessionsThisWeek: 15,
    performance: 95
  }
];

const needsAttentionChildren = [
  {
    id: "1",
    name: "Noah Williams",
    age: 7,
    therapyTypes: ["speech", "special"],
    status: "stagnation",
    lastSession: "3 days ago",
    progress: 30,
    therapist: "Dr. Emma Thompson"
  },
  {
    id: "2",
    name: "Mia Rodriguez",
    age: 4,
    therapyTypes: ["occupational", "sensory"],
    status: "needs-attention",
    lastSession: "Yesterday",
    progress: 45,
    therapist: "Dr. Sarah Williams"
  }
];

const aiRecommendations = [
  {
    id: "r1",
    childName: "Noah Williams",
    therapyType: "speech",
    recommendation: "Consider introducing visual cues alongside verbal exercises",
    priority: "high",
    dateGenerated: "Today"
  },
  {
    id: "r2",
    childName: "Mia Rodriguez",
    therapyType: "sensory",
    recommendation: "Reduce sensory input during initial therapy sessions",
    priority: "medium",
    dateGenerated: "Yesterday"
  },
  {
    id: "r3",
    childName: "Alex Johnson",
    therapyType: "behavior",
    recommendation: "Incorporate more reward-based activities",
    priority: "low",
    dateGenerated: "2 days ago"
  }
];

const parentMessages = [
  {
    id: "m1",
    parentName: "Mrs. Williams",
    childName: "Noah Williams",
    message: "When can we expect to see the next progress report?",
    time: "2 hours ago",
    isRead: false
  },
  {
    id: "m2",
    parentName: "Mr. Rodriguez",
    childName: "Mia Rodriguez",
    message: "Thank you for the suggested home activities",
    time: "Yesterday",
    isRead: true
  }
];

export default function SupervisorDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <SupervisorSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          {/* Stats Overview */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Therapists"
                value={therapists.length}
                icon={<Users className="h-5 w-5 text-primary" />}
                trend="All active"
                trendUp={true}
              />
              <StatsCard
                title="Children"
                value={15}
                icon={<Baby className="h-5 w-5 text-primary" />}
                trend="2 need attention"
                trendUp={false}
              />
              <StatsCard
                title="Sessions This Week"
                value={57}
                icon={<Calendar className="h-5 w-5 text-primary" />}
                trend="↑ 12% from last week"
                trendUp={true}
              />
              <StatsCard
                title="AI Recommendations"
                value={8}
                icon={<Brain className="h-5 w-5 text-primary" />}
                trend="3 high priority"
                trendUp={true}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Therapists Overview */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Therapist Overview</h2>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <span>View All</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {therapists.map((therapist, index) => (
                  <motion.div
                    key={therapist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="rounded-xl border border-border p-4 shadow-glass-sm bg-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {therapist.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{therapist.name}</h3>
                            <p className="text-sm text-muted-foreground">{therapist.role}</p>
                          </div>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {therapist.performance}% Performance
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Baby className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{therapist.childrenCount} children</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{therapist.sessionsThisWeek} sessions this week</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Right sidebar */}
            <section className="space-y-6">
              {/* AI Recommendations */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                <div className="space-y-4">
                  {aiRecommendations.map((rec) => (
                    <div key={rec.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{rec.childName}</p>
                        <span 
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                            rec.priority === 'high' && "bg-status-danger/10 text-status-danger",
                            rec.priority === 'medium' && "bg-status-warning/10 text-status-warning",
                            rec.priority === 'low' && "bg-status-success/10 text-status-success",
                          )}
                        >
                          {rec.priority} priority
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 mr-1",
                            rec.therapyType === 'speech' && "bg-therapy-speech/10 text-therapy-speech",
                            rec.therapyType === 'behavior' && "bg-therapy-behavior/10 text-therapy-behavior",
                            rec.therapyType === 'sensory' && "bg-therapy-sensory/10 text-therapy-sensory",
                          )}>
                            {rec.therapyType}
                          </span>
                          therapy
                        </span>
                        <span>{rec.dateGenerated}</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-xs flex items-start gap-2">
                        <Brain className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <p>{rec.recommendation}</p>
                      </div>
                      <div className="pt-1">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          Review & Approve
                        </Button>
                      </div>
                      <div className="border-b border-border/50 pt-2"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Recommendations
                  </Button>
                </div>
              </div>

              {/* Parent Communication */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h3 className="text-lg font-semibold mb-4">Parent Communication</h3>
                <div className="space-y-4">
                  {parentMessages.map((message) => (
                    <div key={message.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.parentName}</p>
                        {!message.isRead && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Re: {message.childName}</span>
                        <span>{message.time}</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-xs">
                        <p>"{message.message}"</p>
                      </div>
                      <div className="pt-1">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          Respond
                        </Button>
                      </div>
                      <div className="border-b border-border/50 pt-2"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Messages
                  </Button>
                </div>
              </div>

              {/* Alerts & Notifications */}
              <div className="rounded-xl border border-status-warning/30 bg-status-warning/5 p-6 shadow-glass-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-status-warning" />
                  <h3 className="text-lg font-semibold">Children Needing Attention</h3>
                </div>
                <div className="space-y-3">
                  {needsAttentionChildren.map((child) => (
                    <div 
                      key={child.id}
                      className="rounded-lg bg-status-warning/10 p-3 border border-status-warning/20"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{child.name}</p>
                        <span className="text-xs text-muted-foreground">{child.age} years</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Progress: {child.progress}%</span>
                        <span>Last session: {child.lastSession}</span>
                      </div>
                      <p className="text-xs mt-2 text-status-warning flex items-center gap-1.5">
                        <AlertCircle className="h-3 w-3" />
                        {child.status === "needs-attention" 
                          ? "Needs additional focus" 
                          : "Showing signs of stagnation"
                        }
                      </p>
                      <p className="text-xs mt-1 text-muted-foreground">
                        Therapist: {child.therapist}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="text-xs flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="text-xs flex-1">
                          Intervene
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
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
}

function StatsCard({ title, value, icon, trend, trendUp }: StatsCardProps) {
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
            <AlertCircle className="mr-1 h-3 w-3" />
          )}
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}
