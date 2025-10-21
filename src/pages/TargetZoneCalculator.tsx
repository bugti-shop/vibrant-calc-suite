import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, Heart } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";

const TargetZoneCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [zones, setZones] = useState<any>(null);

  const calculateZones = () => {
    if (!age || !restingHR) return;

    const ageNum = parseInt(age);
    const restingNum = parseInt(restingHR);
    const maxHR = 220 - ageNum;
    const hrReserve = maxHR - restingNum;

    const zoneData = {
      maxHR,
      zones: [
        {
          name: "Warm Up Zone",
          percentage: "50-60%",
          range: `${Math.round(restingNum + hrReserve * 0.5)} - ${Math.round(restingNum + hrReserve * 0.6)} bpm`,
          benefit: "Very light activity, good for warming up"
        },
        {
          name: "Fat Burn Zone",
          percentage: "60-70%",
          range: `${Math.round(restingNum + hrReserve * 0.6)} - ${Math.round(restingNum + hrReserve * 0.7)} bpm`,
          benefit: "Light activity, improves basic endurance and fat burning"
        },
        {
          name: "Cardio Zone",
          percentage: "70-80%",
          range: `${Math.round(restingNum + hrReserve * 0.7)} - ${Math.round(restingNum + hrReserve * 0.8)} bpm`,
          benefit: "Moderate activity, improves aerobic fitness"
        },
        {
          name: "Peak Zone",
          percentage: "80-90%",
          range: `${Math.round(restingNum + hrReserve * 0.8)} - ${Math.round(restingNum + hrReserve * 0.9)} bpm`,
          benefit: "Hard activity, increases maximum performance capacity"
        },
        {
          name: "Maximum Zone",
          percentage: "90-100%",
          range: `${Math.round(restingNum + hrReserve * 0.9)} - ${maxHR} bpm`,
          benefit: "Very hard activity, only for very short bursts"
        }
      ]
    };

    setZones(zoneData);
  };

  const handleClear = () => {
    setAge("");
    setRestingHR("");
    setZones(null);
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
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Heart Rate Target Zone Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resting">Resting Heart Rate (bpm)</Label>
                <Input
                  id="resting"
                  type="number"
                  placeholder="Enter resting HR"
                  value={restingHR}
                  onChange={(e) => setRestingHR(e.target.value)}
                  min="30"
                  max="100"
                  className="text-lg"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={calculateZones}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                disabled={!age || !restingHR}
              >
                Calculate Target Zones
              </Button>
              <Button 
                onClick={handleClear}
                variant="outline"
              >
                Clear
              </Button>
            </div>

            {zones && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Maximum Heart Rate</h3>
                  <p className="text-3xl font-bold text-red-700">{zones.maxHR} bpm</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Training Zones</h3>
                  {zones.zones.map((zone: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{zone.name}</h4>
                          <p className="text-sm text-muted-foreground">{zone.percentage} of max HR</p>
                        </div>
                        <p className="font-bold text-red-600">{zone.range}</p>
                      </div>
                      <p className="text-sm text-gray-600">{zone.benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> These calculations use the Karvonen formula. Always consult with 
                    a healthcare provider before starting a new exercise program, especially if you have 
                    any health concerns.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        <StickyNotes calculatorName="target-zone-calculator" />
      </main>
    </div>
  );
};

export default TargetZoneCalculator;
