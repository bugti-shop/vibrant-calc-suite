import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const InvestmentCalculator = () => {
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-6 text-center">Investment Return Calculator</h1>
        
        <Card className="p-6">
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
            
            <Button variant="calculator" size="calculator" onClick={calculateReturn} className="w-full">
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
      </div>
    </div>
  );
};

export default InvestmentCalculator;
