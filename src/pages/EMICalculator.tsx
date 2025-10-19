import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EMICalculator = () => {
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-6 text-center">EMI Calculator</h1>
        
        <Card className="p-6">
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
            
            <Button variant="calculator" size="calculator" onClick={calculateEMI} className="w-full">
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
      </div>
    </div>
  );
};

export default EMICalculator;
