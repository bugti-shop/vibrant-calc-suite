import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, Plus } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";

interface SimpleCalculatorProps {
  embedded?: boolean;
}

const SimpleCalculator = ({ embedded = false }: SimpleCalculatorProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [calculators, setCalculators] = useState([{ id: 1 }]);
  
  const addCalculator = () => {
    setCalculators([...calculators, { id: Date.now() }]);
  };

  return embedded ? (
    <CalculatorInstance embedded />
  ) : (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold">Simple Calculator</h1>
          <Button
            onClick={addCalculator}
            size="sm"
            variant="outline"
            className="ml-auto gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
          >
            <Plus className="h-4 w-4" />
            Add Calculator
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className={`grid gap-6 ${calculators.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-4xl mx-auto'}`}>
          {calculators.map((calc) => (
            <CalculatorInstance key={calc.id} />
          ))}
        </div>
        
        <StickyNotes calculatorName="simple-calculator" />
      </main>
    </div>
  );
};

const CalculatorInstance = ({ embedded = false }: SimpleCalculatorProps) => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (resetDisplay) {
      setDisplay(num);
      setExpression(expression + num);
      setResetDisplay(false);
    } else {
      const newDisplay = display === "0" ? num : display + num;
      setDisplay(newDisplay);
      if (!operation) {
        setExpression(newDisplay);
      }
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
      setExpression(display + " " + op + " ");
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
      setExpression(expression + display + " " + op + " ");
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
      setExpression(expression + display + " = " + result);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <Card className="p-4 md:p-6 w-full">
      <div className="bg-[hsl(var(--calc-display))] p-4 rounded-lg mb-4 min-h-[120px] flex flex-col justify-between">
        <div className="text-lg md:text-xl font-bold text-foreground text-right mb-2 min-h-[28px]">{expression || " "}</div>
        <div className="text-4xl md:text-5xl font-semibold break-all text-right">{display}</div>
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
  );
};

export default SimpleCalculator;
