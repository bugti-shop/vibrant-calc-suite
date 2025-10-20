import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";

const EMICalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure);

    if (p && r && n) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmountValue = emiValue * n;
      const totalInterestValue = totalAmountValue - p;

      setEmi(parseFloat(emiValue.toFixed(2)));
      setTotalAmount(parseFloat(totalAmountValue.toFixed(2)));
      setTotalInterest(parseFloat(totalInterestValue.toFixed(2)));
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
          <h1 className="text-xl md:text-2xl font-bold">EMI Calculator</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Loan Amount (₹)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            
            <div>
              <Label htmlFor="rate">Interest Rate (% per annum)</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            
            <div>
              <Label htmlFor="tenure">Loan Tenure (months)</Label>
              <Input
                id="tenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter tenure in months"
              />
            </div>
            
            <Button variant="calculator" size="calculator" onClick={calculateEMI} className="w-full mt-2">
              Calculate
            </Button>
            
            {emi !== null && (
              <div className="mt-6 space-y-3 bg-muted p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-semibold">Monthly EMI:</span>
                  <span className="font-bold text-primary">₹{emi.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold">₹{totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Interest:</span>
                  <span className="font-bold">₹{totalInterest?.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        <StickyNotes calculatorName="emi-calculator" />
      </main>
    </div>
  );
};

export default EMICalculator;
