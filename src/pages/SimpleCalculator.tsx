import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SimpleCalculator = () => {
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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-6 text-center">Simple Calculator</h1>
        
        <Card className="p-6">
          <div className="bg-muted p-4 rounded-lg mb-4 text-right">
            <div className="text-3xl font-bold break-all">{display}</div>
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
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("7")}>
              7
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("8")}>
              8
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("9")}>
              9
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("-")}>
              -
            </Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("4")}>
              4
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("5")}>
              5
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("6")}>
              6
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleOperation("+")}>
              +
            </Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("1")}>
              1
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("2")}>
              2
            </Button>
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("3")}>
              3
            </Button>
            <Button variant="calculator" size="calculator" onClick={handleEquals} className="row-span-2">
              =
            </Button>
            
            <Button variant="calculator" size="calculator" onClick={() => handleNumber("0")} className="col-span-2">
              0
            </Button>
            <Button variant="calculator" size="calculator" onClick={handleDecimal}>
              .
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SimpleCalculator;
