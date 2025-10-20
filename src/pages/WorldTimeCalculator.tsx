import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIMEZONES = [
  { city: "New York", country: "USA", timezone: "America/New_York" },
  { city: "London", country: "UK", timezone: "Europe/London" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { city: "Paris", country: "France", timezone: "Europe/Paris" },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles" },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong" },
];

const WorldTimeCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimezones, setSelectedTimezones] = useState([
    TIMEZONES[0],
    TIMEZONES[1],
    TIMEZONES[2],
  ]);
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      selectedTimezones.forEach((tz) => {
        const time = new Date().toLocaleString("en-US", {
          timeZone: tz.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const date = new Date().toLocaleString("en-US", {
          timeZone: tz.timezone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        newTimes[tz.timezone] = `${time}\n${date}`;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezones]);

  const handleTimezoneChange = (index: number, timezoneCity: string) => {
    const timezone = TIMEZONES.find((tz) => tz.city === timezoneCity);
    if (timezone) {
      const newTimezones = [...selectedTimezones];
      newTimezones[index] = timezone;
      setSelectedTimezones(newTimezones);
    }
  };

  return (
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
          <h1 className="text-xl md:text-2xl font-bold">World Time Calculator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <Card className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedTimezones.map((tz, index) => (
              <div key={index} className="space-y-4">
                <Select
                  value={tz.city}
                  onValueChange={(value) => handleTimezoneChange(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((timezone) => (
                      <SelectItem key={timezone.city} value={timezone.city}>
                        {timezone.city}, {timezone.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Card className="bg-[hsl(var(--calc-display))] p-6 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {tz.country}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-4">
                    {tz.city}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                    {times[tz.timezone]?.split("\n")[0]}
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {times[tz.timezone]?.split("\n")[1]}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Time Difference</h3>
            <p className="text-sm text-muted-foreground">
              {selectedTimezones[0].city} to {selectedTimezones[1].city}:{" "}
              {Math.abs(
                new Date().toLocaleString("en-US", {
                  timeZone: selectedTimezones[0].timezone,
                  hour: "numeric",
                  hour12: false,
                }) as any -
                  (new Date().toLocaleString("en-US", {
                    timeZone: selectedTimezones[1].timezone,
                    hour: "numeric",
                    hour12: false,
                  }) as any)
              )}{" "}
              hours
            </p>
          </div>
        </Card>

        <StickyNotes calculatorName="world-time" />
      </main>
    </div>
  );
};

export default WorldTimeCalculator;
