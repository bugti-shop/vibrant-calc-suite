import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, Baby } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";

const PregnancyCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [weeksPregnant, setWeeksPregnant] = useState("");
  const [trimester, setTrimester] = useState("");

  const calculateDueDate = () => {
    if (!lastPeriodDate) return;

    const lmp = new Date(lastPeriodDate);
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280); // Add 280 days (40 weeks)

    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    setDueDate(due.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }));
    setWeeksPregnant(`${weeks} weeks and ${days} days`);

    if (weeks <= 12) {
      setTrimester("First Trimester (Weeks 1-12)");
    } else if (weeks <= 26) {
      setTrimester("Second Trimester (Weeks 13-26)");
    } else {
      setTrimester("Third Trimester (Weeks 27-40)");
    }
  };

  const handleClear = () => {
    setLastPeriodDate("");
    setDueDate("");
    setWeeksPregnant("");
    setTrimester("");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <header className="bg-white border-b py-4 px-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-foreground"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Baby className="h-6 w-6 text-pink-500" />
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Pregnancy Due Date Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lmp">First Day of Last Menstrual Period (LMP)</Label>
              <Input
                id="lmp"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="text-lg"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={calculateDueDate}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                disabled={!lastPeriodDate}
              >
                Calculate Due Date
              </Button>
              <Button 
                onClick={handleClear}
                variant="outline"
              >
                Clear
              </Button>
            </div>

            {dueDate && (
              <div className="mt-6 space-y-4 p-6 bg-pink-50 rounded-lg">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-pink-900">Expected Due Date</h3>
                  <p className="text-2xl font-bold text-pink-700">{dueDate}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-pink-900">Current Stage</h3>
                  <p className="text-xl text-pink-700">{weeksPregnant}</p>
                  <p className="text-lg text-pink-600">{trimester}</p>
                </div>

                <div className="mt-4 p-4 bg-white rounded-md border border-pink-200">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> This calculator provides an estimated due date based on the first day 
                    of your last menstrual period. The actual due date may vary. Please consult with your 
                    healthcare provider for accurate information.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        <StickyNotes calculatorName="pregnancy-calculator" />
      </main>
    </div>
  );
};

export default PregnancyCalculator;
