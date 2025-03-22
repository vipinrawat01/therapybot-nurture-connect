
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, TrendingUp, Clock } from "lucide-react";

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  therapyTypes: TherapyType[];
  status: 'good' | 'needs-attention' | 'stagnation';
  lastSession: string;
  progress: number;
  image?: string;
}

export type TherapyType = 'speech' | 'behavior' | 'occupational' | 'adl' | 'sensory' | 'special';

interface TherapyTypeProps {
  type: TherapyType;
}

export function TherapyTypeChip({ type }: TherapyTypeProps) {
  const getLabel = () => {
    switch (type) {
      case 'speech': return 'Speech';
      case 'behavior': return 'Behavior';
      case 'occupational': return 'OT';
      case 'adl': return 'ADL';
      case 'sensory': return 'Sensory';
      case 'special': return 'Special Ed';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      type === 'speech' && "bg-therapy-speech/10 text-therapy-speech",
      type === 'behavior' && "bg-therapy-behavior/10 text-therapy-behavior",
      type === 'occupational' && "bg-therapy-occupational/10 text-therapy-occupational",
      type === 'adl' && "bg-therapy-adl/10 text-therapy-adl",
      type === 'sensory' && "bg-therapy-sensory/10 text-therapy-sensory",
      type === 'special' && "bg-therapy-special/10 text-therapy-special",
    )}>
      {getLabel()}
    </span>
  );
}

interface ChildCardProps {
  child: ChildProfile;
  delay?: number;
}

export default function ChildCard({ child, delay = 0 }: ChildCardProps) {
  const statusIcon = () => {
    switch (child.status) {
      case 'good':
        return <TrendingUp className="h-5 w-5 text-status-success" />;
      case 'needs-attention':
        return <AlertCircle className="h-5 w-5 text-status-warning" />;
      case 'stagnation':
        return <AlertCircle className="h-5 w-5 text-status-danger" />;
    }
  };

  const statusText = () => {
    switch (child.status) {
      case 'good':
        return "Good Progress";
      case 'needs-attention':
        return "Needs Attention";
      case 'stagnation':
        return "Stagnation Detected";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Link to={`/children/${child.id}`} className="block group">
        <div className="relative overflow-hidden rounded-xl bg-card border border-border shadow-glass-sm hover:shadow-glass transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary font-bold text-lg">
                  {child.image ? (
                    <img 
                      src={child.image} 
                      alt={child.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    child.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {child.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">Age: {child.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                {statusIcon()}
                <span className={cn(
                  "text-xs font-medium",
                  child.status === 'good' && "text-status-success",
                  child.status === 'needs-attention' && "text-status-warning",
                  child.status === 'stagnation' && "text-status-danger",
                )}>
                  {statusText()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {child.therapyTypes.map(type => (
                <TherapyTypeChip key={type} type={type} />
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock size={16} />
                <span>Last session: {child.lastSession}</span>
              </div>
              <div className="font-medium">
                {child.progress}% progress
              </div>
            </div>
          </div>
          
          <div className="h-1.5 w-full bg-muted">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out",
                child.status === 'good' && "bg-status-success",
                child.status === 'needs-attention' && "bg-status-warning",
                child.status === 'stagnation' && "bg-status-danger",
              )} 
              style={{ width: `${child.progress}%` }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
