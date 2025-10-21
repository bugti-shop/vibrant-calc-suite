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
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Simple Calculator</h1>
          <Button
            onClick={addCalculator}
            size="sm"
            variant="outline"
            className="ml-auto gap-2"
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
  const [currentInput, setCurrentInput] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const calculateRealTime = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return current !== 0 ? prev / current : prev;
      case "%":
        return prev % current;
      default:
        return current;
    }
  };

  const handleNumber = (num: string) => {
    const newInput = currentInput === "0" ? num : currentInput + num;
    setCurrentInput(newInput);
    
    // Update expression
    if (operation && previousValue !== null) {
      setExpression(`${previousValue}${operation}${newInput}`);
      // Real-time calculation
      const realTimeResult = calculateRealTime(previousValue, parseFloat(newInput), operation);
      setResult(String(realTimeResult));
    } else {
      setExpression(newInput);
      setResult(newInput);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(currentInput);
    
    if (previousValue === null) {
      setPreviousValue(current);
      setExpression(`${current}${op}`);
    } else if (operation) {
      const calculated = calculateRealTime(previousValue, current, operation);
      setPreviousValue(calculated);
      setExpression(`${calculated}${op}`);
      setResult(String(calculated));
    }
    
    setOperation(op);
    setCurrentInput("0");
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(currentInput);
      const finalResult = calculateRealTime(previousValue, current, operation);
      setExpression(`${previousValue}${operation}${current}`);
      setResult(String(finalResult));
      setCurrentInput(String(finalResult));
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setCurrentInput("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
    setResult("");
  };

  const handleDecimal = () => {
    if (!currentInput.includes(".")) {
      const newInput = currentInput + ".";
      setCurrentInput(newInput);
      if (operation && previousValue !== null) {
        setExpression(`${previousValue}${operation}${newInput}`);
      } else {
        setExpression(newInput);
      }
    }
  };

  const handleBackspace = () => {
    const newInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    setCurrentInput(newInput);
    
    if (operation && previousValue !== null) {
      setExpression(`${previousValue}${operation}${newInput}`);
      if (newInput !== "0") {
        const realTimeResult = calculateRealTime(previousValue, parseFloat(newInput), operation);
        setResult(String(realTimeResult));
      }
    } else {
      setExpression(newInput);
      setResult(newInput);
    }
  };

  const handlePercentage = () => {
    const current = parseFloat(currentInput);
    const percentValue = current / 100;
    setCurrentInput(String(percentValue));
    setExpression(String(percentValue));
    setResult(String(percentValue));
  };

  return (
    <Card className="p-4 md:p-6 w-full bg-background">
      <div className="bg-muted/30 p-6 rounded-xl mb-6 min-h-[140px] flex flex-col justify-end">
        <div className="text-2xl md:text-3xl font-bold text-foreground text-right mb-2 min-h-[36px]">
          {expression || "0"}
        </div>
        <div className="text-4xl md:text-6xl font-semibold text-muted-foreground text-right break-all">
          {result || currentInput}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <Button 
          variant="ghost" 
          onClick={handleClear}
          className="h-16 text-3xl font-semibold text-red-500"
        >
          C
        </Button>
        <Button 
          variant="ghost" 
          onClick={handlePercentage}
          className="h-16 w-full text-4xl font-semibold text-green-600"
        >
          %
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleBackspace}
          className="h-16 text-3xl font-semibold text-green-600"
        >
          ⌫
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => handleOperation("÷")}
          className="h-16 w-full text-4xl font-semibold text-green-600"
        >
          ÷
        </Button>
        
        <Button variant="ghost" onClick={() => handleNumber("7")} className="h-16 text-3xl font-semibold">7</Button>
        <Button variant="ghost" onClick={() => handleNumber("8")} className="h-16 text-3xl font-semibold">8</Button>
        <Button variant="ghost" onClick={() => handleNumber("9")} className="h-16 text-3xl font-semibold">9</Button>
        <Button 
          variant="ghost" 
          onClick={() => handleOperation("×")}
          className="h-16 w-full text-4xl font-semibold text-green-600"
        >
          ×
        </Button>
        
        <Button variant="ghost" onClick={() => handleNumber("4")} className="h-16 text-3xl font-semibold">4</Button>
        <Button variant="ghost" onClick={() => handleNumber("5")} className="h-16 text-3xl font-semibold">5</Button>
        <Button variant="ghost" onClick={() => handleNumber("6")} className="h-16 text-3xl font-semibold">6</Button>
        <Button 
          variant="ghost" 
          onClick={() => handleOperation("-")}
          className="h-16 w-full text-4xl font-semibold text-green-600"
        >
          -
        </Button>
        
        <Button variant="ghost" onClick={() => handleNumber("1")} className="h-16 text-3xl font-semibold">1</Button>
        <Button variant="ghost" onClick={() => handleNumber("2")} className="h-16 text-3xl font-semibold">2</Button>
        <Button variant="ghost" onClick={() => handleNumber("3")} className="h-16 text-3xl font-semibold">3</Button>
        <Button 
          variant="ghost" 
          onClick={() => handleOperation("+")}
          className="h-16 w-full text-4xl font-semibold text-green-600"
        >
          +
        </Button>
        
        <Button variant="ghost" onClick={() => handleNumber("0")} className="col-span-2 h-16 text-3xl font-semibold">0</Button>
        <Button variant="ghost" onClick={handleDecimal} className="h-16 text-3xl font-semibold">.</Button>
        <Button 
          onClick={handleEquals}
          className="bg-green-600 text-white text-3xl font-bold rounded-2xl h-16"
        >
          =
        </Button>
      </div>
    </Card>
  );
};

export default SimpleCalculator;
