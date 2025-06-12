import { Toaster as ShadCnToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import LoginPage from "./pages/LoginPage";
import AccountsDashboardPage from "./pages/AccountsDashboardPage";
import MoveMoneyPage from "./pages/MoveMoneyPage";
import CardControlsPage from "./pages/CardControlsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShadCnToaster />
      <SonnerToaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* Default to LoginPage */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/accounts-dashboard" element={<AccountsDashboardPage />} />
          <Route path="/move-money" element={<MoveMoneyPage />} />
          <Route path="/card-controls" element={<CardControlsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;