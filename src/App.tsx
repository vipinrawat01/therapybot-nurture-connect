
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ChildrenList from "./pages/ChildrenList";
import SessionsHistory from "./pages/SessionsHistory";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ParentLogin from "./pages/auth/ParentLogin";
import ParentDashboard from "./pages/parent/Dashboard";

// Install framer-motion
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Landing Page and Auth Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/parent-login" element={<ParentLogin />} />
            
            {/* Parent Dashboard Routes */}
            <Route path="/parent/dashboard" element={<ParentDashboard />} />

            {/* Therapist Dashboard Routes */}
            <Route path="/therapist/dashboard" element={<Dashboard />} />
            <Route path="/children" element={<ChildrenList />} />
            <Route path="/sessions" element={<SessionsHistory />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
