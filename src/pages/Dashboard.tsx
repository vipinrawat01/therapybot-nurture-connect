
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Calendar, 
  Clock, 
  Plus, 
  FileText, 
  Brain, 
  Sparkles,
  TrendingUp,
  AlertCircle,
  ArrowUpRight
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ChildCard, { ChildProfile } from "@/components/dashboard/ChildCard";
import ProgressIndicator from "@/components/dashboard/ProgressIndicator";
import SessionLogger from "@/components/dashboard/SessionLogger";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const children: ChildProfile[] = [
  {
    id: "1",
    name: "Alex Johnson",
    age: 6,
    therapyTypes: ["speech", "behavior"],
    status: "good",
    lastSession: "Today",
    progress: 75
  },
  {
    id: "2",
    name: "Mia Rodriguez",
    age: 4,
    therapyTypes: ["occupational", "sensory"],
    status: "needs-attention",
    lastSession: "Yesterday",
    progress: 45
  },
  {
    id: "3",
    name: "Noah Williams",
    age: 7,
    therapyTypes: ["speech", "special"],
    status: "stagnation",
    lastSession: "3 days ago",
    progress: 30
  },
  {
    id: "4",
    name: "Emily Chen",
    age: 5,
    therapyTypes: ["behavior", "adl"],
    status: "good",
    lastSession: "2 days ago",
    progress: 80
  }
];

const recentSessions = [
  {
    id: "s1",
    childName: "Alex Johnson",
    therapyType: "speech",
    date: "Today, 2:30 PM",
    performance: 4,
    aiRecommendation: "Increase difficulty of articulation exercises"
  },
  {
    id: "s2",
    childName: "Mia Rodriguez",
    therapyType: "sensory",
    date: "Yesterday, 10:15 AM",
    performance: 3,
    aiRecommendation: "Try more tactile integration activities"
  },
  {
    id: "s3",
    childName: "Noah Williams",
    therapyType: "speech",
    date: "3 days ago, 1:45 PM",
    performance: 2,
    aiRecommendation: "Simplify vocabulary exercises and add visual cues"
  }
];

export default function Dashboard() {
  const [sessionLoggerOpen, setSessionLoggerOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  
  const openSessionLogger = (child: ChildProfile) => {
    setSelectedChild(child);
    setSessionLoggerOpen(true);
  };

  const closeSessionLogger = () => {
    setSessionLoggerOpen(false);
    setSelectedChild(null);
  };

  // Filter children by status for the alerts section
  const needsAttentionChildren = children.filter(
    child => child.status === "needs-attention" || child.status === "stagnation"
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          {/* Stats Overview */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Children"
                value={children.length}
                icon={<FileText className="h-5 w-5 text-primary" />}
                trend="+2 this month"
                trendUp={true}
              />
              <StatsCard
                title="Sessions Today"
                value={2}
                icon={<Calendar className="h-5 w-5 text-primary" />}
                trend="2 remaining"
                trendUp={true}
              />
              <StatsCard
                title="Avg. Session Duration"
                value="45 min"
                icon={<Clock className="h-5 w-5 text-primary" />}
                trend="on target"
                trendUp={true}
              />
              <StatsCard
                title="AI Recommendations"
                value={3}
                icon={<Brain className="h-5 w-5 text-primary" />}
                trend="new suggestions"
                trendUp={true}
              />
            </div>
          </section>

          {/* AI Assistant Banner */}
          <section className="mb-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/90 to-primary p-6 text-white shadow-glass">
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
                <div className="h-40 w-40 rounded-full bg-white/10 backdrop-blur-sm"></div>
              </div>
              <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
                <div className="h-32 w-32 rounded-full bg-white/10 backdrop-blur-sm"></div>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-1">AI Therapy Assistant</h2>
                    <p className="text-white/80 max-w-md">
                      Get personalized therapy recommendations, activity suggestions, and progress insights.
                    </p>
                  </div>
                </div>
                <button className="rounded-lg bg-white px-4 py-2 text-primary font-medium hover:bg-white/90 transition-colors">
                  Ask AI Assistant
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Children section */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Children</h2>
                <button 
                  className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Child</span>
                </button>
              </div>

              <div className="space-y-4">
                {children.map((child, index) => (
                  <ChildCard 
                    key={child.id} 
                    child={child} 
                    delay={index} 
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
                  <span>View All Children</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            {/* Right sidebar */}
            <section className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {children.map((child, index) => (
                    <button
                      key={child.id}
                      onClick={() => openSessionLogger(child)}
                      className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-all hover:border-primary/50 hover:shadow-sm"
                    >
                      <div className="relative h-10 w-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary font-bold">
                        {child.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{child.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {child.therapyTypes.map(type => (
                            <span 
                              key={type}
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                                type === 'speech' && "bg-therapy-speech/10 text-therapy-speech",
                                type === 'behavior' && "bg-therapy-behavior/10 text-therapy-behavior",
                                type === 'occupational' && "bg-therapy-occupational/10 text-therapy-occupational",
                                type === 'adl' && "bg-therapy-adl/10 text-therapy-adl",
                                type === 'sensory' && "bg-therapy-sensory/10 text-therapy-sensory",
                                type === 'special' && "bg-therapy-special/10 text-therapy-special",
                              )}
                            >
                              {type === 'adl' ? 'ADL' : type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Plus className="ml-auto h-5 w-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Log New Session</span>
                  </button>
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{session.childName}</p>
                        <span 
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                            session.therapyType === 'speech' && "bg-therapy-speech/10 text-therapy-speech",
                            session.therapyType === 'behavior' && "bg-therapy-behavior/10 text-therapy-behavior",
                            session.therapyType === 'occupational' && "bg-therapy-occupational/10 text-therapy-occupational",
                            session.therapyType === 'adl' && "bg-therapy-adl/10 text-therapy-adl",
                            session.therapyType === 'sensory' && "bg-therapy-sensory/10 text-therapy-sensory",
                            session.therapyType === 'special' && "bg-therapy-special/10 text-therapy-special",
                          )}
                        >
                          {session.therapyType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{session.date}</span>
                        <span>Performance: {session.performance}/5</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-xs flex items-start gap-2">
                        <Brain className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <p>{session.aiRecommendation}</p>
                      </div>
                      <div className="border-b border-border/50 pt-2"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full rounded-lg border border-input bg-background px-4 py-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                    View All Sessions
                  </button>
                </div>
              </div>

              {/* Alerts & Notifications */}
              {needsAttentionChildren.length > 0 && (
                <div className="rounded-xl border border-status-warning/30 bg-status-warning/5 p-6 shadow-glass-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-status-warning" />
                    <h3 className="text-lg font-semibold">Attention Required</h3>
                  </div>
                  <div className="space-y-3">
                    {needsAttentionChildren.map((child) => (
                      <div 
                        key={child.id}
                        className="rounded-lg bg-status-warning/10 p-3 border border-status-warning/20"
                      >
                        <p className="text-sm font-medium">{child.name}</p>
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Session Logger Modal */}
      {sessionLoggerOpen && selectedChild && (
        <SessionLogger 
          childId={selectedChild.id} 
          childName={selectedChild.name} 
          onClose={closeSessionLogger} 
        />
      )}
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
          trendUp ? "text-status-success" : "text-status-danger"
        )}>
          {trendUp ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-1 h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
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
