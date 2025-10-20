import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";

const InvestmentCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [years, setYears] = useState("");
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalContribution, setTotalContribution] = useState<number | null>(null);
  const [totalReturn, setTotalReturn] = useState<number | null>(null);

  const calculateReturn = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const months = parseFloat(years) * 12;

    if (months > 0) {
      // Future value of initial investment
      const fvInitial = initial * Math.pow(1 + rate, months);
      
      // Future value of monthly contributions
      const fvMonthly = monthly * (Math.pow(1 + rate, months) - 1) / rate;
      
      const future = fvInitial + fvMonthly;
      const totalContrib = initial + (monthly * months);
      const returns = future - totalContrib;

      setFutureValue(parseFloat(future.toFixed(2)));
      setTotalContribution(parseFloat(totalContrib.toFixed(2)));
      setTotalReturn(parseFloat(returns.toFixed(2)));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold">Investment Calculator</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="initial">Initial Investment (₹)</Label>
              <Input
                id="initial"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="Enter initial amount"
              />
            </div>
            
            <div>
              <Label htmlFor="monthly">Monthly Contribution (₹)</Label>
              <Input
                id="monthly"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="Enter monthly amount"
              />
            </div>
            
            <div>
              <Label htmlFor="return">Expected Annual Return (%)</Label>
              <Input
                id="return"
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                placeholder="Enter expected return"
              />
            </div>
            
            <div>
              <Label htmlFor="years">Investment Period (years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Enter years"
              />
            </div>
            
            <Button variant="calculator" size="calculator" onClick={calculateReturn} className="w-full mt-2">
              Calculate
            </Button>
            
            {futureValue !== null && (
              <div className="mt-6 space-y-3 bg-muted p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-semibold">Future Value:</span>
                  <span className="font-bold text-primary">₹{futureValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Contribution:</span>
                  <span className="font-bold">₹{totalContribution?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Returns:</span>
                  <span className="font-bold text-primary">₹{totalReturn?.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        <StickyNotes calculatorName="investment-calculator" />
      </main>
    </div>
  );
};

export default InvestmentCalculator;
