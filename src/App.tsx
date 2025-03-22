
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

// Supervisor Routes
import SupervisorLogin from "./pages/auth/SupervisorLogin";
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorTherapists from "./pages/supervisor/Therapists";
import SupervisorChildren from "./pages/supervisor/Children";
import SupervisorChildProgress from "./pages/supervisor/ChildProgress";
import SupervisorRecommendations from "./pages/supervisor/Recommendations";
import SupervisorSessions from "./pages/supervisor/Sessions";
import SupervisorReports from "./pages/supervisor/Reports";
import SupervisorProfile from "./pages/supervisor/Profile";

// Admin Routes
import AdminLogin from "./pages/auth/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTherapists from "./pages/admin/Therapists";
import AdminUserManagement from "./pages/admin/UserManagement";
import AdminRoleManagement from "./pages/admin/RoleManagement";
import AdminSystemSettings from "./pages/admin/SystemSettings";
import AdminReports from "./pages/admin/Reports";
import AdminProfile from "./pages/admin/Profile";

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
            <Route path="/therapist-login" element={<ParentLogin />} /> {/* Placeholder */}
            <Route path="/supervisor-login" element={<SupervisorLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Parent Dashboard Routes */}
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/activities" element={<ParentDashboard />} /> {/* Placeholder */}
            <Route path="/parent/messages" element={<ParentDashboard />} /> {/* Placeholder */}
            <Route path="/parent/profile" element={<ParentDashboard />} /> {/* Placeholder */}

            {/* Therapist Dashboard Routes */}
            <Route path="/therapist/dashboard" element={<Dashboard />} />
            <Route path="/children" element={<ChildrenList />} />
            <Route path="/sessions" element={<SessionsHistory />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Supervisor Dashboard Routes */}
            <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
            <Route path="/supervisor/therapists" element={<SupervisorTherapists />} />
            <Route path="/supervisor/children" element={<SupervisorChildren />} />
            <Route path="/supervisor/child-progress" element={<SupervisorChildProgress />} />
            <Route path="/supervisor/recommendations" element={<SupervisorRecommendations />} />
            <Route path="/supervisor/sessions" element={<SupervisorSessions />} />
            <Route path="/supervisor/reports" element={<SupervisorReports />} />
            <Route path="/supervisor/profile" element={<SupervisorProfile />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/therapists" element={<AdminTherapists />} />
            <Route path="/admin/user-management" element={<AdminUserManagement />} />
            <Route path="/admin/role-management" element={<AdminRoleManagement />} />
            <Route path="/admin/system-settings" element={<AdminSystemSettings />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
