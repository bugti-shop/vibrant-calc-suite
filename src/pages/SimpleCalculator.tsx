import { useState } from "react";
import { Copy } from "lucide-react";

const SimpleCalculator = () => {
  const [currentInput, setCurrentInput] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

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
    vibrate();
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
    vibrate();
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
    vibrate();
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
    vibrate();
    setCurrentInput("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
    setResult("");
  };

  const handleDecimal = () => {
    vibrate();
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
    vibrate();
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
    vibrate();
    const current = parseFloat(currentInput);
    const percentValue = current / 100;
    setCurrentInput(String(percentValue));
    setExpression(String(percentValue));
    setResult(String(percentValue));
  };

  const handleCopy = () => {
    vibrate();
    navigator.clipboard.writeText(result || currentInput);
  };

  const CalcButton = ({ 
    onClick, 
    children, 
    className = "", 
    variant = "default" 
  }: { 
    onClick: () => void; 
    children: React.ReactNode; 
    className?: string;
    variant?: "default" | "operator" | "clear" | "equals";
  }) => {
    const baseStyle = "h-20 text-4xl font-semibold rounded-2xl transition-all duration-100 active:scale-95 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.1)] active:translate-y-[2px]";
    
    const variantStyles = {
      default: "bg-white text-gray-900 hover:bg-gray-50",
      operator: "bg-emerald-500 text-white hover:bg-emerald-600",
      clear: "bg-white text-red-500 hover:bg-gray-50",
      equals: "bg-emerald-500 text-white hover:bg-emerald-600 rounded-3xl"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Display Area */}
      <div className="flex-1 flex flex-col justify-end p-6 pb-8">
        <div className="text-right">
          <div className="text-3xl text-gray-600 mb-2 min-h-[40px] flex items-center justify-end">
            {expression || "0"}
            <span className="inline-block w-1 h-10 bg-emerald-500 ml-1 animate-pulse"></span>
          </div>
          <div className="text-6xl font-light text-gray-800 break-all">
            {result || currentInput}
          </div>
        </div>
      </div>
      
      {/* Button Grid */}
      <div className="p-4 pb-8">
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          <CalcButton onClick={handleClear} variant="clear">C</CalcButton>
          <CalcButton onClick={handlePercentage} variant="operator">%</CalcButton>
          <CalcButton onClick={handleBackspace} variant="operator">⌫</CalcButton>
          <CalcButton onClick={() => handleOperation("÷")} variant="operator">÷</CalcButton>
          
          <CalcButton onClick={() => handleNumber("7")}>7</CalcButton>
          <CalcButton onClick={() => handleNumber("8")}>8</CalcButton>
          <CalcButton onClick={() => handleNumber("9")}>9</CalcButton>
          <CalcButton onClick={() => handleOperation("×")} variant="operator">×</CalcButton>
          
          <CalcButton onClick={() => handleNumber("4")}>4</CalcButton>
          <CalcButton onClick={() => handleNumber("5")}>5</CalcButton>
          <CalcButton onClick={() => handleNumber("6")}>6</CalcButton>
          <CalcButton onClick={() => handleOperation("-")} variant="operator">-</CalcButton>
          
          <CalcButton onClick={() => handleNumber("1")}>1</CalcButton>
          <CalcButton onClick={() => handleNumber("2")}>2</CalcButton>
          <CalcButton onClick={() => handleNumber("3")}>3</CalcButton>
          <CalcButton onClick={() => handleOperation("+")} variant="operator">+</CalcButton>
          
          <CalcButton onClick={handleCopy} variant="operator" className="flex items-center justify-center">
            <Copy className="h-8 w-8" />
          </CalcButton>
          <CalcButton onClick={() => handleNumber("0")} className="col-span-2">0</CalcButton>
          <CalcButton onClick={handleDecimal}>.</CalcButton>
          <CalcButton onClick={handleEquals} variant="equals" className="row-span-1">=</CalcButton>
        </div>
      </div>
    </div>
  );
};

export default SimpleCalculator;
