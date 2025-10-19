import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

interface SimpleCalculatorProps {
  embedded?: boolean;
}

const SimpleCalculator = ({ embedded = false }: SimpleCalculatorProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  if (embedded) {
    return (
      <div className="w-full">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
          <div className="bg-[hsl(var(--calc-display))] p-4 rounded-lg mb-4 text-right min-h-[80px] flex items-center justify-end">
            <div className="text-3xl md:text-4xl font-bold break-all">{display}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button variant="calculator" size="calculator" onClick={handleClear} className="col-span-2">
              C
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("÷")}>
              ÷
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("×")}>
              ×
            </Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("7")}>7</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("8")}>8</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("9")}>9</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("-")}>-</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("4")}>4</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("5")}>5</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("6")}>6</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("+")}>+</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("1")}>1</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("2")}>2</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("3")}>3</Button>
            <Button variant="calculator" size="calculator" onClick={handleEquals} className="row-span-2">=</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("0")} className="col-span-2">0</Button>
            <Button variant="calculator" size="calculator" onClick={handleDecimal}>.</Button>
          </div>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-xl md:text-2xl font-bold">Simple Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-4 md:p-6 max-w-md mx-auto">
          <div className="bg-[hsl(var(--calc-display))] p-4 rounded-lg mb-4 text-right min-h-[80px] flex items-center justify-end">
            <div className="text-3xl md:text-4xl font-bold break-all">{display}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button variant="calculator" size="calculator" onClick={handleClear} className="col-span-2">C</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("÷")}>÷</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("×")}>×</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("7")}>7</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("8")}>8</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("9")}>9</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("-")}>-</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("4")}>4</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("5")}>5</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("6")}>6</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("+")}>+</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("1")}>1</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("2")}>2</Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("3")}>3</Button>
            <Button variant="calculator" size="calculator" onClick={handleEquals} className="row-span-2">=</Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("0")} className="col-span-2">0</Button>
            <Button variant="calculator" size="calculator" onClick={handleDecimal}>.</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default SimpleCalculator;
