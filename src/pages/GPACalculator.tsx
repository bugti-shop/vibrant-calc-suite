import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, Plus, Trash2 } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyNotes } from "@/components/StickyNotes";

interface Course {
  id: number;
  grade: string;
  credits: string;
}

const GPACalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, grade: "", credits: "" }
  ]);
  const [result, setResult] = useState<number | null>(null);

  const gradePoints: { [key: string]: number } = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D": 1.0, "F": 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), grade: "", credits: "" }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: 'grade' | 'credits', value: string) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade.toUpperCase()];
      
      if (credits && points !== undefined) {
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });
    
    if (totalCredits > 0) {
      setResult(totalPoints / totalCredits);
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
          <h1 className="text-xl md:text-2xl font-bold">GPA/CGPA Calculator</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="p-6">
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={course.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label>Grade</Label>
                  <Input
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    placeholder="A, B+, C, etc."
                    className="mt-2"
                  />
                </div>
                <div className="flex-1">
                  <Label>Credits</Label>
                  <Input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    placeholder="3"
                    className="mt-2"
                  />
                </div>
                {courses.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addCourse}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
            
            <Button 
              variant="calculator" 
              size="calculator"
              onClick={calculateGPA}
              className="w-full"
            >
              Calculate GPA
            </Button>
            
            {result !== null && (
              <div className="bg-[hsl(var(--calc-display))] p-6 rounded-lg text-center">
                <h2 className="text-lg text-muted-foreground mb-2">Your GPA</h2>
                <div className="text-4xl font-bold text-primary">{result.toFixed(2)}</div>
              </div>
            )}
          </div>
        </Card>

        <StickyNotes calculatorName="gpa-calculator" />
      </main>
    </div>
  );
};

export default GPACalculator;
