import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterestCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          <h1 className="text-xl md:text-2xl font-bold">Interest Calculator</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
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
                
                <Button variant="calculator" size="calculator" onClick={calculateSimpleInterest} className="w-full mt-2">
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
                
                <Button variant="calculator" size="calculator" onClick={calculateCompoundInterest} className="w-full mt-2">
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
      </main>
    </div>
  );
};

export default InterestCalculator;
