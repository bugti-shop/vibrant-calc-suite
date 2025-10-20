import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Percent, DollarSign, Calendar, Star, Fuel, GraduationCap, Hash, Clock } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

interface CalculatorItem {
  name: string;
  path: string;
  icon: any;
  category: string;
}

const calculators: CalculatorItem[] = [
  {
    name: "Simple Calculator",
    path: "/simple-calculator",
    icon: Calculator,
    category: "Basic"
  },
  {
    name: "Age Calculator",
    path: "/age-calculator",
    icon: Calendar,
    category: "Basic"
  },
  {
    name: "Hexadecimal Calculator",
    path: "/hex-calculator",
    icon: Hash,
    category: "Basic"
  },
  {
    name: "EMI Calculator",
    path: "/emi-calculator",
    icon: TrendingUp,
    category: "Financial"
  },
  {
    name: "Interest Calculator",
    path: "/interest-calculator",
    icon: Percent,
    category: "Financial"
  },
  {
    name: "Investment Return Calculator",
    path: "/investment-calculator",
    icon: DollarSign,
    category: "Financial"
  },
  {
    name: "Fuel Cost Calculator",
    path: "/fuel-calculator",
    icon: Fuel,
    category: "Daily Use"
  },
  {
    name: "World Time Calculator",
    path: "/world-time-calculator",
    icon: Clock,
    category: "Daily Use"
  },
  {
    name: "GPA/CGPA Calculator",
    path: "/gpa-calculator",
    icon: GraduationCap,
    category: "Education"
  },
  {
    name: "Women Periods Calculator",
    path: "/period-calculator",
    icon: Calendar,
    category: "Health"
  }
];

const categories = ["Basic", "Financial", "Daily Use", "Education", "Health"];

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
  const location = useLocation();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem("favoriteCalculators");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);
  
  const toggleFavorite = (path: string) => {
    const newFavorites = favorites.includes(path)
      ? favorites.filter(f => f !== path)
      : [...favorites, path];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteCalculators", JSON.stringify(newFavorites));
  };
  
  const isActive = (path: string) => location.pathname === path;
  const favoriteCalcs = calculators.filter(c => favorites.includes(c.path));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primary">Calculators</SheetTitle>
        </SheetHeader>
        
        {favoriteCalcs.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-primary mb-3 px-3 flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary" />
              Favorites
            </h3>
            {favoriteCalcs.map((calc) => {
              const Icon = calc.icon;
              const active = isActive(calc.path);
              
              return (
                <div key={calc.path} className="flex items-center gap-1">
                  <NavLink
                    to={calc.path}
                    onClick={() => onOpenChange(false)}
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      active 
                        ? "bg-primary text-primary-foreground font-semibold" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{calc.name}</span>
                  </NavLink>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleFavorite(calc.path)}
                  >
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          {categories.map((category) => {
            const categoryCalcs = calculators.filter(c => c.category === category);
            
            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-primary mb-3 px-3">{category}</h3>
                <div className="space-y-1">
                  {categoryCalcs.map((calc) => {
                    const Icon = calc.icon;
                    const active = isActive(calc.path);
                    const isFavorite = favorites.includes(calc.path);
                    
                    return (
                      <div key={calc.path} className="flex items-center gap-1">
                        <NavLink
                          to={calc.path}
                          onClick={() => onOpenChange(false)}
                          className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                            active 
                              ? "bg-primary text-primary-foreground font-semibold" 
                              : "hover:bg-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{calc.name}</span>
                        </NavLink>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleFavorite(calc.path)}
                        >
                          <Star className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
