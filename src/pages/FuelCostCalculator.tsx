import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const FuelCostCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [distance, setDistance] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [result, setResult] = useState<{
    fuelNeeded: number;
    totalCost: number;
  } | null>(null);

  const calculateFuelCost = () => {
    const dist = parseFloat(distance);
    const price = parseFloat(fuelPrice);
    const mpg = parseFloat(mileage);
    
    if (dist && price && mpg) {
      const fuelNeeded = dist / mpg;
      const totalCost = fuelNeeded * price;
      setResult({ fuelNeeded, totalCost });
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
          <h1 className="text-xl md:text-2xl font-bold">Fuel Cost Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="distance">Distance (km/miles)</Label>
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Enter distance"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="mileage">Mileage (km/l or mpg)</Label>
              <Input
                id="mileage"
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Enter mileage"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="fuelPrice">Fuel Price per Unit</Label>
              <Input
                id="fuelPrice"
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="Enter fuel price"
                className="mt-2"
              />
            </div>
            
            <Button 
              variant="calculator" 
              size="calculator"
              onClick={calculateFuelCost}
              className="w-full"
            >
              Calculate Cost
            </Button>
            
            {result && (
              <div className="bg-[hsl(var(--calc-display))] p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fuel Needed:</span>
                  <span className="text-xl font-bold">{result.fuelNeeded.toFixed(2)} L</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="text-2xl font-bold text-primary">₹{result.totalCost.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default FuelCostCalculator;
