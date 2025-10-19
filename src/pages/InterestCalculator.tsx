import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [simpleInterest, setSimpleInterest] = useState<number | null>(null);
  const [compoundInterest, setCompoundInterest] = useState<number | null>(null);

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (p && r && t) {
      const si = (p * r * t) / 100;
      setSimpleInterest(parseFloat(si.toFixed(2)));
    }
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (p && r && t) {
      const ci = p * Math.pow(1 + r / 100, t) - p;
      setCompoundInterest(parseFloat(ci.toFixed(2)));
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
        
        <h1 className="text-3xl font-bold mb-6 text-center">Interest Calculator</h1>
        
        <Card className="p-6">
          <Tabs defaultValue="simple">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple">Simple Interest</TabsTrigger>
              <TabsTrigger value="compound">Compound Interest</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="principal-si">Principal Amount (₹)</Label>
                  <Input
                    id="principal-si"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="Enter principal"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rate-si">Rate of Interest (% per annum)</Label>
                  <Input
                    id="rate-si"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Enter rate"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time-si">Time Period (years)</Label>
                  <Input
                    id="time-si"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Enter time"
                  />
                </div>
                
                <Button variant="calculator" size="calculator" onClick={calculateSimpleInterest} className="w-full">
                  Calculate
                </Button>
                
                {simpleInterest !== null && (
                  <div className="mt-4 bg-muted p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Simple Interest:</span>
                      <span className="font-bold text-primary">₹{simpleInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold">₹{(parseFloat(principal) + simpleInterest).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="compound">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="principal-ci">Principal Amount (₹)</Label>
                  <Input
                    id="principal-ci"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="Enter principal"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rate-ci">Rate of Interest (% per annum)</Label>
                  <Input
                    id="rate-ci"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Enter rate"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time-ci">Time Period (years)</Label>
                  <Input
                    id="time-ci"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Enter time"
                  />
                </div>
                
                <Button variant="calculator" size="calculator" onClick={calculateCompoundInterest} className="w-full">
                  Calculate
                </Button>
                
                {compoundInterest !== null && (
                  <div className="mt-4 bg-muted p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Compound Interest:</span>
                      <span className="font-bold text-primary">₹{compoundInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold">₹{(parseFloat(principal) + compoundInterest).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default InterestCalculator;
