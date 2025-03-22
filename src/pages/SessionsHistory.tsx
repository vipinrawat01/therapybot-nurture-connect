
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ChevronDown, 
  X,
  FileText,
  ArrowUpDown,
  Brain,
  User
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { TherapyType, TherapyTypeChip } from "@/components/dashboard/ChildCard";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  childId: string;
  childName: string;
  therapyType: TherapyType;
  date: string;
  time: string;
  duration: string;
  performance: number;
  status: 'completed' | 'pending-review' | 'cancelled';
  aiRecommendation?: string;
}

// Mock data for demonstration
const allSessions: Session[] = [
  {
    id: "s1",
    childId: "1",
    childName: "Alex Johnson",
    therapyType: "speech",
    date: "2023-06-20",
    time: "14:30",
    duration: "45 min",
    performance: 4,
    status: "completed",
    aiRecommendation: "Increase difficulty of articulation exercises. Focus on 's' and 'th' sounds."
  },
  {
    id: "s2",
    childId: "2",
    childName: "Mia Rodriguez",
    therapyType: "sensory",
    date: "2023-06-19",
    time: "10:15",
    duration: "30 min",
    performance: 3,
    status: "completed",
    aiRecommendation: "Try more tactile integration activities. Use various textures in next session."
  },
  {
    id: "s3",
    childId: "3",
    childName: "Noah Williams",
    therapyType: "speech",
    date: "2023-06-17",
    time: "13:45",
    duration: "40 min",
    performance: 2,
    status: "completed",
    aiRecommendation: "Simplify vocabulary exercises and add visual cues. Use picture cards more extensively."
  },
  {
    id: "s4",
    childId: "4",
    childName: "Emily Chen",
    therapyType: "behavior",
    date: "2023-06-18",
    time: "11:00",
    duration: "50 min",
    performance: 5,
    status: "completed",
    aiRecommendation: "Excellent progress. Continue with current strategy and gradually increase complexity."
  },
  {
    id: "s5",
    childId: "5",
    childName: "Liam Wilson",
    therapyType: "special",
    date: "2023-06-13",
    time: "09:30",
    duration: "45 min",
    performance: 3,
    status: "completed",
    aiRecommendation: "Maintain current pace. Consider adding more math-focused activities in next session."
  },
  {
    id: "s6",
    childId: "6",
    childName: "Sophia Martinez",
    therapyType: "occupational",
    date: "2023-06-16",
    time: "15:00",
    duration: "35 min",
    performance: 4,
    status: "completed",
    aiRecommendation: "Great progress with fine motor skills. Focus on bilateral coordination activities next."
  },
  {
    id: "s7",
    childId: "7",
    childName: "Jackson Brown",
    therapyType: "behavior",
    date: "2023-06-15",
    time: "10:45",
    duration: "40 min",
    performance: 3,
    status: "completed",
    aiRecommendation: "Continue working on impulse control. Try using visual timer for transitions."
  },
  {
    id: "s8",
    childId: "1",
    childName: "Alex Johnson",
    therapyType: "behavior",
    date: "2023-06-14",
    time: "13:00",
    duration: "45 min",
    performance: 4,
    status: "completed",
    aiRecommendation: "Good progress on social communication. Add more peer interaction activities."
  },
  {
    id: "s9",
    childId: "2",
    childName: "Mia Rodriguez",
    therapyType: "adl",
    date: "2023-06-20",
    time: "16:30",
    duration: "30 min",
    performance: 3,
    status: "pending-review"
  },
  {
    id: "s10",
    childId: "3",
    childName: "Noah Williams",
    therapyType: "speech",
    date: "2023-06-21",
    time: "09:00",
    duration: "45 min",
    performance: 0,
    status: "cancelled"
  }
];

type StatusFilterType = "all" | "completed" | "pending-review" | "cancelled";
type SortField = "date" | "childName" | "therapyType" | "performance";
type SortDirection = "asc" | "desc";

export default function SessionsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");
  const [therapyFilter, setTherapyFilter] = useState<TherapyType | "all">("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  
  // Apply filters and sorting
  const filteredSessions = allSessions
    .filter((session) => {
      // Search filter (name or id)
      const matchesSearch = 
        session.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === "all" || session.status === statusFilter;
      
      // Therapy filter
      const matchesTherapy = therapyFilter === "all" || session.therapyType === therapyFilter;
      
      return matchesSearch && matchesStatus && matchesTherapy;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "date") {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "childName") {
        return sortDirection === "asc"
          ? a.childName.localeCompare(b.childName)
          : b.childName.localeCompare(a.childName);
      } else if (sortField === "therapyType") {
        return sortDirection === "asc"
          ? a.therapyType.localeCompare(b.therapyType)
          : b.therapyType.localeCompare(a.therapyType);
      } else if (sortField === "performance") {
        return sortDirection === "asc"
          ? a.performance - b.performance
          : b.performance - a.performance;
      }
      return 0;
    });
  
  // Get unique therapy types for filter
  const allTherapyTypes: TherapyType[] = ["speech", "behavior", "occupational", "adl", "sensory", "special"];
  
  // Status counts
  const statusCounts = {
    all: allSessions.length,
    completed: allSessions.filter(session => session.status === "completed").length,
    "pending-review": allSessions.filter(session => session.status === "pending-review").length,
    cancelled: allSessions.filter(session => session.status === "cancelled").length
  };
  
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to desc
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const toggleExpandSession = (sessionId: string) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Sessions History</h1>
              <p className="text-muted-foreground mt-1">Review past therapy sessions and AI recommendations</p>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search by child name or session ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  isFilterOpen && "rotate-180"
                )} />
              </button>
            </div>
            
            {/* Filter panel */}
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex flex-wrap gap-6">
                  {/* Status filter */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      <StatusFilterButton
                        status="all"
                        count={statusCounts.all}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("all")}
                      />
                      <StatusFilterButton
                        status="completed"
                        count={statusCounts.completed}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("completed")}
                      />
                      <StatusFilterButton
                        status="pending-review"
                        count={statusCounts["pending-review"]}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("pending-review")}
                      />
                      <StatusFilterButton
                        status="cancelled"
                        count={statusCounts.cancelled}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("cancelled")}
                      />
                    </div>
                  </div>
                  
                  {/* Therapy type filter */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Therapy Type</h3>
                    <div className="flex flex-wrap gap-2">
                      <TherapyFilterButton
                        type="all"
                        currentFilter={therapyFilter}
                        onClick={() => setTherapyFilter("all")}
                      />
                      {allTherapyTypes.map((type) => (
                        <TherapyFilterButton
                          key={type}
                          type={type}
                          currentFilter={therapyFilter}
                          onClick={() => setTherapyFilter(type)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex justify-between">
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setTherapyFilter("all");
                      setSearchTerm("");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear filters
                  </button>
                  
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-sm text-primary hover:text-primary/90"
                  >
                    Apply filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Results summary */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing {filteredSessions.length} of {allSessions.length} sessions
              </span>
            </div>
            
            {(statusFilter !== "all" || therapyFilter !== "all" || searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setTherapyFilter("all");
                  setSearchTerm("");
                }}
                className="text-sm text-primary hover:text-primary/90 flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            )}
          </div>
          
          {/* Sessions table */}
          {filteredSessions.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <table className="w-full border-collapse">
                <thead className="bg-muted/50">
                  <tr>
                    <SortableTableHeader
                      label="Date & Time"
                      field="date"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={() => toggleSort("date")}
                    />
                    <SortableTableHeader
                      label="Child"
                      field="childName"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={() => toggleSort("childName")}
                    />
                    <SortableTableHeader
                      label="Therapy"
                      field="therapyType"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={() => toggleSort("therapyType")}
                    />
                    <SortableTableHeader
                      label="Performance"
                      field="performance"
                      currentSortField={sortField}
                      currentSortDirection={sortDirection}
                      onSort={() => toggleSort("performance")}
                      className="hidden md:table-cell"
                    />
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSessions.map((session) => (
                    <React.Fragment key={session.id}>
                      <tr 
                        className={cn(
                          "bg-card hover:bg-accent/5 transition-colors",
                          expandedSession === session.id && "bg-accent/5"
                        )}
                      >
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {formatDate(session.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {session.time} ({session.duration})
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-8 w-8 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary font-bold text-sm">
                              {session.childName.charAt(0)}
                            </div>
                            <span className="text-sm font-medium">{session.childName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <TherapyTypeChip type={session.therapyType} />
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          {session.status === "cancelled" ? (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          ) : (
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={star <= session.performance ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className={cn(
                                    "h-4 w-4",
                                    star <= session.performance ? "text-amber-500" : "text-muted-foreground"
                                  )}
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            session.status === "completed" && "bg-status-success/10 text-status-success",
                            session.status === "pending-review" && "bg-status-warning/10 text-status-warning",
                            session.status === "cancelled" && "bg-status-danger/10 text-status-danger",
                          )}>
                            {session.status === "completed" && "Completed"}
                            {session.status === "pending-review" && "Pending Review"}
                            {session.status === "cancelled" && "Cancelled"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => toggleExpandSession(session.id)}
                            className={cn(
                              "inline-flex items-center rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                              expandedSession === session.id && "bg-accent text-foreground"
                            )}
                          >
                            <ChevronDown className={cn(
                              "h-5 w-5 transition-transform",
                              expandedSession === session.id && "rotate-180"
                            )} />
                          </button>
                        </td>
                      </tr>
                      
                      {expandedSession === session.id && (
                        <tr className="bg-accent/5">
                          <td colSpan={6} className="px-4 py-4">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-border pt-4 mt-2 space-y-4">
                                {session.status !== "cancelled" && (
                                  <>
                                    <div className="flex items-start gap-4">
                                      <div className="flex-1">
                                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                          <User className="h-4 w-4 text-primary" />
                                          Session Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <div className="bg-muted/30 rounded-lg p-3">
                                            <p className="text-xs text-muted-foreground mb-1">Performance</p>
                                            <p className="text-sm font-medium">
                                              {session.performance}/5
                                              {session.performance === 1 && " (Needs improvement)"}
                                              {session.performance === 2 && " (Below expectations)"}
                                              {session.performance === 3 && " (Met expectations)"}
                                              {session.performance === 4 && " (Above expectations)"}
                                              {session.performance === 5 && " (Excellent)"}
                                            </p>
                                          </div>
                                          <div className="bg-muted/30 rounded-lg p-3">
                                            <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                                            <p className="text-sm font-medium">
                                              {formatDate(session.date)} at {session.time}
                                            </p>
                                          </div>
                                          <div className="bg-muted/30 rounded-lg p-3">
                                            <p className="text-xs text-muted-foreground mb-1">Duration</p>
                                            <p className="text-sm font-medium">{session.duration}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {session.aiRecommendation && (
                                      <div className="flex items-start gap-4">
                                        <div className="flex-1">
                                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                            <Brain className="h-4 w-4 text-primary" />
                                            AI Recommendation
                                          </h4>
                                          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                                            <p className="text-sm">{session.aiRecommendation}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                                
                                {session.status === "cancelled" && (
                                  <div className="bg-status-danger/10 rounded-lg p-4 border border-status-danger/20">
                                    <p className="text-sm flex items-center gap-2">
                                      <X className="h-4 w-4 text-status-danger" />
                                      <span>This session was cancelled and no data was recorded.</span>
                                    </p>
                                  </div>
                                )}
                                
                                <div className="pt-2 flex justify-end">
                                  <button
                                    onClick={() => toggleExpandSession(session.id)}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                    Close details
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No sessions found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                No sessions match your current filter criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface StatusFilterButtonProps {
  status: StatusFilterType;
  count: number;
  currentFilter: StatusFilterType;
  onClick: () => void;
}

function StatusFilterButton({ status, count, currentFilter, onClick }: StatusFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full border border-input px-3 py-1 text-xs font-medium transition-colors",
        status === currentFilter 
          ? "bg-primary text-primary-foreground border-primary"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {status === "all" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M12 3v6" />
        </svg>
      )}
      {status === "completed" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 text-status-success"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )}
      {status === "pending-review" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 text-status-warning"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      {status === "cancelled" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 text-status-danger"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )}
      
      <span>
        {status === "all" && "All"}
        {status === "completed" && "Completed"}
        {status === "pending-review" && "Pending Review"}
        {status === "cancelled" && "Cancelled"}
      </span>
      
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">{count}</span>
    </button>
  );
}

interface TherapyFilterButtonProps {
  type: TherapyType | "all";
  currentFilter: TherapyType | "all";
  onClick: () => void;
}

function TherapyFilterButton({ type, currentFilter, onClick }: TherapyFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-colors border",
        type === "all" && currentFilter === "all" && "bg-primary text-primary-foreground border-primary",
        type === "all" && currentFilter !== "all" && "bg-muted text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground",
        type === "speech" && currentFilter === "speech" && "bg-therapy-speech text-white border-therapy-speech",
        type === "speech" && currentFilter !== "speech" && "bg-therapy-speech/10 text-therapy-speech border-therapy-speech/20 hover:bg-therapy-speech/20",
        type === "behavior" && currentFilter === "behavior" && "bg-therapy-behavior text-white border-therapy-behavior",
        type === "behavior" && currentFilter !== "behavior" && "bg-therapy-behavior/10 text-therapy-behavior border-therapy-behavior/20 hover:bg-therapy-behavior/20",
        type === "occupational" && currentFilter === "occupational" && "bg-therapy-occupational text-white border-therapy-occupational",
        type === "occupational" && currentFilter !== "occupational" && "bg-therapy-occupational/10 text-therapy-occupational border-therapy-occupational/20 hover:bg-therapy-occupational/20",
        type === "adl" && currentFilter === "adl" && "bg-therapy-adl text-white border-therapy-adl",
        type === "adl" && currentFilter !== "adl" && "bg-therapy-adl/10 text-therapy-adl border-therapy-adl/20 hover:bg-therapy-adl/20",
        type === "sensory" && currentFilter === "sensory" && "bg-therapy-sensory text-white border-therapy-sensory",
        type === "sensory" && currentFilter !== "sensory" && "bg-therapy-sensory/10 text-therapy-sensory border-therapy-sensory/20 hover:bg-therapy-sensory/20",
        type === "special" && currentFilter === "special" && "bg-therapy-special text-white border-therapy-special",
        type === "special" && currentFilter !== "special" && "bg-therapy-special/10 text-therapy-special border-therapy-special/20 hover:bg-therapy-special/20",
      )}
    >
      {type === "all" ? "All Therapies" : type === "adl" ? "ADL" : type}
    </button>
  );
}

interface SortableTableHeaderProps {
  label: string;
  field: SortField;
  currentSortField: SortField;
  currentSortDirection: SortDirection;
  onSort: () => void;
  className?: string;
}

function SortableTableHeader({
  label,
  field,
  currentSortField,
  currentSortDirection,
  onSort,
  className
}: SortableTableHeaderProps) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors group",
        className
      )}
      onClick={onSort}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <ArrowUpDown className={cn(
          "h-3.5 w-3.5 transition-colors",
          currentSortField === field ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
        )} />
      </div>
    </th>
  );
}
