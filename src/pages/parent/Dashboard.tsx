
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  LineChart, 
  Brain, 
  MessageCircle,
  ArrowUpRight
} from "lucide-react";
import Header from "@/components/layout/Header";
import ParentSidebar from "@/components/layout/ParentSidebar";
import ProgressIndicator from "@/components/dashboard/ProgressIndicator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration
const childProgress = {
  speech: { value: 70, max: 100 },
  behavior: { value: 85, max: 100 },
  occupational: { value: 60, max: 100 },
  sensory: { value: 75, max: 100 }
};

const recentActivities = [
  {
    id: "1",
    type: "speech",
    title: "Sound Repetition Exercise",
    description: "Practice 'S' sound repetition with picture cards",
    date: "Today, 2:30 PM",
    completed: true
  },
  {
    id: "2",
    type: "behavior",
    title: "Calm Down Routine",
    description: "Practice the 5-step calm down routine before bedtime",
    date: "Yesterday",
    completed: false
  },
  {
    id: "3",
    type: "sensory",
    title: "Texture Exploration",
    description: "Explore different textures with hands and describe the feeling",
    date: "2 days ago",
    completed: true
  }
];

export default function ParentDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <ParentSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          {/* Welcome Section */}
          <section className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold mb-2">Welcome, Jessica!</h1>
              <p className="text-muted-foreground">
                Here's an overview of your child's progress and recent home activities.
              </p>
            </motion.div>
          </section>

          {/* Stats Overview */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Next Session"
                value="Tomorrow, 3:30 PM"
                icon={<Calendar className="h-5 w-5 text-primary" />}
                description="Speech Therapy"
              />
              <StatsCard
                title="Completed Activities"
                value="8 of 12"
                icon={<Clock className="h-5 w-5 text-primary" />}
                description="This week"
              />
              <StatsCard
                title="Overall Progress"
                value="72%"
                icon={<LineChart className="h-5 w-5 text-primary" />}
                description="Last 30 days"
              />
              <StatsCard
                title="New Recommendations"
                value="3"
                icon={<Brain className="h-5 w-5 text-primary" />}
                description="From AI Assistant"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Child Progress Section */}
            <section className="lg:col-span-2">
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Alex's Progress</h2>
                  <button className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
                    <span>Full Report</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <ProgressIndicator 
                    label="Speech Therapy" 
                    value={childProgress.speech.value} 
                    max={childProgress.speech.max}
                    color="primary" 
                    size="md"
                  />
                  <ProgressIndicator 
                    label="Behavior Therapy" 
                    value={childProgress.behavior.value} 
                    max={childProgress.behavior.max} 
                    color="success"
                    size="md"
                  />
                  <ProgressIndicator 
                    label="Occupational Therapy" 
                    value={childProgress.occupational.value} 
                    max={childProgress.occupational.max} 
                    color="warning"
                    size="md"
                  />
                  <ProgressIndicator 
                    label="Sensory Integration" 
                    value={childProgress.sensory.value} 
                    max={childProgress.sensory.max} 
                    color="primary"
                    size="md"
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Overall Progress</p>
                    <p className="text-2xl font-bold">72%</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Last updated: Today, 9:30 AM</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right sidebar */}
            <section className="space-y-6">
              {/* Recent Activities */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <span 
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs
                            ${activity.type === 'speech' ? "bg-therapy-speech/10 text-therapy-speech" : ""}
                            ${activity.type === 'behavior' ? "bg-therapy-behavior/10 text-therapy-behavior" : ""}
                            ${activity.type === 'occupational' ? "bg-therapy-occupational/10 text-therapy-occupational" : ""}
                            ${activity.type === 'sensory' ? "bg-therapy-sensory/10 text-therapy-sensory" : ""}
                          `}
                        >
                          {activity.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span>{activity.date}</span>
                        <span className={activity.completed ? "text-green-500" : "text-amber-500"}>
                          {activity.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                      <div className="border-b border-border/50 pt-2"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full rounded-lg border border-input bg-background px-4 py-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                    View All Activities
                  </button>
                </div>
              </div>

              {/* Communication */}
              <div className="rounded-xl border border-border p-6 shadow-glass-sm">
                <h3 className="text-lg font-semibold mb-4">Messages</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">You have 2 unread messages from your supervisor.</p>
                  <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>View Messages</span>
                  </button>
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
  description: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
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
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
