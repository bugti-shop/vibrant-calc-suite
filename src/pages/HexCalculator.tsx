import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const HexCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [mode, setMode] = useState<"HEX" | "DEC">("HEX");

  const hexButtons = ["A", "B", "C", "D", "E", "F"];

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const convertMode = () => {
    if (mode === "HEX") {
      const decimal = parseInt(display, 16);
      setDisplay(decimal.toString());
      setMode("DEC");
    } else {
      const hex = parseInt(display, 10).toString(16).toUpperCase();
      setDisplay(hex);
      setMode("HEX");
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
          <h1 className="text-xl md:text-2xl font-bold">Hexadecimal Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
          <div className="bg-[hsl(var(--calc-display))] p-4 rounded-lg mb-4 min-h-[100px] flex flex-col justify-between">
            <div className="text-sm text-muted-foreground text-right mb-2">Mode: {mode}</div>
            <div className="text-3xl md:text-4xl font-bold break-all text-right">{display}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-2">
            <Button variant="calculator" size="calculator" onClick={handleClear} className="col-span-2">C</Button>
            <Button variant="calculator" size="calculator" onClick={convertMode} className="col-span-2">
              {mode === "HEX" ? "→DEC" : "→HEX"}
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[7, 8, 9].map((num) => (
              <Button key={num} variant="calculator" size="calculator" onClick={() => handleNumber(String(num))}>
                {num}
              </Button>
            ))}
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("A")} disabled={mode === "DEC"}>A</Button>
            
            {[4, 5, 6].map((num) => (
              <Button key={num} variant="calculator" size="calculator" onClick={() => handleNumber(String(num))}>
                {num}
              </Button>
            ))}
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("B")} disabled={mode === "DEC"}>B</Button>
            
            {[1, 2, 3].map((num) => (
              <Button key={num} variant="calculator" size="calculator" onClick={() => handleNumber(String(num))}>
                {num}
              </Button>
            ))}
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("C")} disabled={mode === "DEC"}>C</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("0")} className="col-span-1">0</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("D")} disabled={mode === "DEC"}>D</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("E")} disabled={mode === "DEC"}>E</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("F")} disabled={mode === "DEC"}>F</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default HexCalculator;
