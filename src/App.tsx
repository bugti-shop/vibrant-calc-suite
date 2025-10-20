import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimpleCalculator from "./pages/SimpleCalculator";
import EMICalculator from "./pages/EMICalculator";
import InterestCalculator from "./pages/InterestCalculator";
import InvestmentCalculator from "./pages/InvestmentCalculator";
import PeriodCalculator from "./pages/PeriodCalculator";
import AgeCalculator from "./pages/AgeCalculator";
import FuelCostCalculator from "./pages/FuelCostCalculator";
import GPACalculator from "./pages/GPACalculator";
import HexCalculator from "./pages/HexCalculator";
import WorldTimeCalculator from "./pages/WorldTimeCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simple-calculator" element={<SimpleCalculator />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/interest-calculator" element={<InterestCalculator />} />
          <Route path="/investment-calculator" element={<InvestmentCalculator />} />
          <Route path="/period-calculator" element={<PeriodCalculator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/fuel-calculator" element={<FuelCostCalculator />} />
          <Route path="/gpa-calculator" element={<GPACalculator />} />
          <Route path="/hex-calculator" element={<HexCalculator />} />
          <Route path="/world-time-calculator" element={<WorldTimeCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
