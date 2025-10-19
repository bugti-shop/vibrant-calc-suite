import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const PeriodCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [nextPeriod, setNextPeriod] = useState<string | null>(null);
  const [ovulationDate, setOvulationDate] = useState<string | null>(null);
  const [fertileDays, setFertileDays] = useState<string | null>(null);

  const calculatePeriod = () => {
    if (lastPeriodDate) {
      const lastDate = new Date(lastPeriodDate);
      const cycle = parseInt(cycleLength);
      
      // Next period date
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + cycle);
      
      // Ovulation date (typically 14 days before next period)
      const ovulation = new Date(nextDate);
      ovulation.setDate(ovulation.getDate() - 14);
      
      // Fertile window (5 days before ovulation and ovulation day)
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 5);
      const fertileEnd = new Date(ovulation);
      
      setNextPeriod(nextDate.toLocaleDateString());
      setOvulationDate(ovulation.toLocaleDateString());
      setFertileDays(`${fertileStart.toLocaleDateString()} - ${fertileEnd.toLocaleDateString()}`);
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
          <h1 className="text-xl md:text-2xl font-bold">Period Calculator</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="lastPeriod">First Day of Last Period</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="cycle">Average Cycle Length (days)</Label>
              <Input
                id="cycle"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                placeholder="28"
              />
            </div>
            
            <div>
              <Label htmlFor="period">Period Length (days)</Label>
              <Input
                id="period"
                type="number"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                placeholder="5"
              />
            </div>
            
            <Button variant="calculator" size="calculator" onClick={calculatePeriod} className="w-full mt-2">
              Calculate
            </Button>
            
            {nextPeriod && (
              <div className="mt-6 space-y-3 bg-muted p-4 rounded-lg">
                <div>
                  <span className="font-semibold">Next Period:</span>
                  <div className="font-bold text-primary text-lg">{nextPeriod}</div>
                </div>
                <div>
                  <span className="font-semibold">Ovulation Date:</span>
                  <div className="font-bold">{ovulationDate}</div>
                </div>
                <div>
                  <span className="font-semibold">Fertile Window:</span>
                  <div className="font-bold">{fertileDays}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  * This is an estimate based on average cycles. Individual cycles may vary.
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PeriodCalculator;
