
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus, 
  FileText,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  X,
  ChevronDown
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ChildCard, { ChildProfile, TherapyType } from "@/components/dashboard/ChildCard";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const allChildren: ChildProfile[] = [
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
  },
  {
    id: "5",
    name: "Liam Wilson",
    age: 8,
    therapyTypes: ["special", "speech"],
    status: "good",
    lastSession: "1 week ago",
    progress: 65
  },
  {
    id: "6",
    name: "Sophia Martinez",
    age: 4,
    therapyTypes: ["occupational", "sensory", "adl"],
    status: "needs-attention",
    lastSession: "4 days ago",
    progress: 40
  },
  {
    id: "7",
    name: "Jackson Brown",
    age: 6,
    therapyTypes: ["behavior", "special"],
    status: "good",
    lastSession: "3 days ago",
    progress: 70
  },
  {
    id: "8",
    name: "Olivia Lee",
    age: 5,
    therapyTypes: ["speech", "sensory"],
    status: "stagnation",
    lastSession: "2 weeks ago",
    progress: 25
  }
];

type StatusFilterType = "all" | "good" | "needs-attention" | "stagnation";

export default function ChildrenList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");
  const [therapyFilter, setTherapyFilter] = useState<TherapyType | "all">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Apply filters
  const filteredChildren = allChildren.filter((child) => {
    // Search filter
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || child.status === statusFilter;
    
    // Therapy filter
    const matchesTherapy = therapyFilter === "all" || child.therapyTypes.includes(therapyFilter as TherapyType);
    
    return matchesSearch && matchesStatus && matchesTherapy;
  });
  
  // Get unique therapy types for filter
  const allTherapyTypes: TherapyType[] = ["speech", "behavior", "occupational", "adl", "sensory", "special"];
  
  // Status counts
  const statusCounts = {
    all: allChildren.length,
    good: allChildren.filter(child => child.status === "good").length,
    "needs-attention": allChildren.filter(child => child.status === "needs-attention").length,
    stagnation: allChildren.filter(child => child.status === "stagnation").length
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Children</h1>
              <p className="text-muted-foreground mt-1">Manage and view all assigned children</p>
            </div>
            
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add New Child</span>
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search by name..."
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
                        status="good"
                        count={statusCounts.good}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("good")}
                      />
                      <StatusFilterButton
                        status="needs-attention"
                        count={statusCounts["needs-attention"]}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("needs-attention")}
                      />
                      <StatusFilterButton
                        status="stagnation"
                        count={statusCounts.stagnation}
                        currentFilter={statusFilter}
                        onClick={() => setStatusFilter("stagnation")}
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
                Showing {filteredChildren.length} of {allChildren.length} children
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
          
          {/* Children grid */}
          {filteredChildren.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChildren.map((child, index) => (
                <ChildCard key={child.id} child={child} delay={index % 6} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No children found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                No children match your current filter criteria. Try adjusting your filters or search terms.
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
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v.01" />
          <path d="M12 8v5" />
        </svg>
      )}
      {status === "good" && <CheckCircle className="h-3 w-3 text-status-success" />}
      {status === "needs-attention" && <AlertCircle className="h-3 w-3 text-status-warning" />}
      {status === "stagnation" && <AlertTriangle className="h-3 w-3 text-status-danger" />}
      
      <span>
        {status === "all" && "All"}
        {status === "good" && "Good Progress"}
        {status === "needs-attention" && "Needs Attention"}
        {status === "stagnation" && "Stagnation"}
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
