import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import ServicePage from "./pages/ServicePage";
import VendorProfilePage from "./pages/VendorProfilePage";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VendorRegisterPage from "./pages/auth/VendorRegisterPage";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/service/:serviceId" element={<ServicePage />} />
            <Route path="/vendor/:vendorId" element={<VendorProfilePage />} />
            <Route path="/request/:vendorId" element={<ServiceRequestPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/vendor-register" element={<VendorRegisterPage />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
