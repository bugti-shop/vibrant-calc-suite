import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NOTE_COLORS = [
  "#fefe9c", // yellow
  "#a8e6ff", // light blue
  "#ffb3d9", // pink
  "#ffa7a6", // light red/salmon
  "#b8f5cc", // light green
];

interface Note {
  id: string;
  text: string;
  color: string;
}

interface StickyNotesProps {
  calculatorName: string;
}

export const StickyNotes = ({ calculatorName }: StickyNotesProps) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(`notes-${calculatorName}`);
    return saved ? JSON.parse(saved) : [];
  });

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      text: "",
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(`notes-${calculatorName}`, JSON.stringify(updatedNotes));
  };

  const updateNote = (id: string, text: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem(`notes-${calculatorName}`, JSON.stringify(updatedNotes));
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(`notes-${calculatorName}`, JSON.stringify(updatedNotes));
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notes</h3>
        <Button
          onClick={addNote}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative p-4 rounded-lg shadow-md min-h-[150px]"
            style={{ backgroundColor: note.color }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 hover:bg-black/10"
              onClick={() => deleteNote(note.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Textarea
              value={note.text}
              onChange={(e) => updateNote(note.id, e.target.value)}
              placeholder="Write your note here..."
              className="border-none bg-transparent resize-none h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 placeholder:text-gray-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
