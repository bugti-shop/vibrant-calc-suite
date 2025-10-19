import { Calculator, TrendingUp, Percent, DollarSign, Calendar } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const calculators = [
  {
    name: "Simple Calculator",
    path: "/simple-calculator",
    icon: Calculator,
  },
  {
    name: "EMI Calculator",
    path: "/emi-calculator",
    icon: TrendingUp,
  },
  {
    name: "Interest Calculator",
    path: "/interest-calculator",
    icon: Percent,
  },
  {
    name: "Investment Return Calculator",
    path: "/investment-calculator",
    icon: DollarSign,
  },
  {
    name: "Women Periods Calculator",
    path: "/period-calculator",
    icon: Calendar,
  }
];

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primary">Calculators</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-2">
          <h3 className="text-sm font-semibold text-primary mb-4 px-3">All Calculators</h3>
          {calculators.map((calc) => {
            const Icon = calc.icon;
            const active = isActive(calc.path);
            
            return (
              <NavLink
                key={calc.path}
                to={calc.path}
                onClick={() => onOpenChange(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  active 
                    ? "bg-primary text-primary-foreground font-semibold" 
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{calc.name}</span>
              </NavLink>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
