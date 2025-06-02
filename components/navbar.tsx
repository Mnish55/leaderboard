"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Navbar = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [open, setOpen] = useState(false);
  const addStudent = useMutation(api.student.addStudent);
  const clearStudent = useMutation(api.student.clearStudents);

  const handleClear = async () => {
    try {
      await clearStudent();
      alert("All students cleared successfully!");
    } catch (error) {
      console.error("Error clearing students:", error);
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter a student name");
      return;
    }
    if (!team.trim()) {
      alert("Please enter  a team number");
      return;
    }

    try {
      await addStudent({ name: name.trim(), marks: [] , team: parseInt(team) });
      setName("");
      setTeam("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="h-20 w-full shadow-md">
      <div className="h-full flex items-center justify-center gap-x-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-[300px] bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 font-bold text-black">
              <Plus className="h-5 w-5 mr-2" />
              <h1>Add Student</h1>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Student</DialogTitle>
              <DialogDescription>Fill in the student details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
              <input
                type="number"
                placeholder="Team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full p-2 border rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
              <Button
                className="bg-blue-500 text-white w-full"
                onClick={handleSubmit}
                disabled={!name.trim()}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button className="bg-red-500 flex items-center justify-center" onClick={handleClear}>
          <Trash2 className="h-5 w-5 mr-2" />
        </Button>
      </div>
    </div>
  );
};