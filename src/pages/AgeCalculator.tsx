import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const AgeCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    setResult({ years, months, days });
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
          <h1 className="text-xl md:text-2xl font-bold">Age Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <Button 
              variant="calculator" 
              size="calculator"
              onClick={calculateAge}
              className="w-full"
            >
              Calculate Age
            </Button>
            
            {result && (
              <div className="bg-[hsl(var(--calc-display))] p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Your Age</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">{result.years}</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{result.months}</div>
                    <div className="text-sm text-muted-foreground">Months</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{result.days}</div>
                    <div className="text-sm text-muted-foreground">Days</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AgeCalculator;
