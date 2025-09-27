import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Investments from "./pages/Investments";
import Expense from './pages/Expense';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryDetail from "./pages/CategoryDetail";
import NotFound from "./pages/NotFound";
import Landing from "./landingpage";

const queryClient = new QueryClient();

const AppLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

// Protect private routes
const PrivateRoute = () => {
  const session = localStorage.getItem("user-session");
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

// Protect public routes
const PublicRoute = () => {
  const session = localStorage.getItem("user-session");
  return session ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public pages */}
              <Route element={<PublicRoute />}>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Route>

              {/* Private pages */}
              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/investments" element={<Investments />} />
                  <Route path="/expense" element={<Expense />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/category/:categoryId" element={<CategoryDetail />} />
                </Route>
              </Route>

              {/* fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
