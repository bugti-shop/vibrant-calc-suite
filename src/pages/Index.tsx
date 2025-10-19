import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Percent, DollarSign, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const calculators = [
  {
    name: "Simple Calculator",
    path: "/simple-calculator",
    icon: Calculator,
    description: "Basic arithmetic operations"
  },
  {
    name: "EMI Calculator",
    path: "/emi-calculator",
    icon: TrendingUp,
    description: "Calculate loan EMI"
  },
  {
    name: "Interest Calculator",
    path: "/interest-calculator",
    icon: Percent,
    description: "Simple & compound interest"
  },
  {
    name: "Investment Return Calculator",
    path: "/investment-calculator",
    icon: DollarSign,
    description: "Calculate investment returns"
  },
  {
    name: "Women Periods Calculator",
    path: "/period-calculator",
    icon: Calendar,
    description: "Track menstrual cycle"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Calculator Hub</h1>
          <p className="text-center mt-2 opacity-90">All your calculators in one place</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">All Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calculator) => {
              const Icon = calculator.icon;
              return (
                <Link key={calculator.path} to={calculator.path}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full hover:border-primary">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{calculator.name}</h3>
                      <p className="text-muted-foreground text-sm">{calculator.description}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
