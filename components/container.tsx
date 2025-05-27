'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type Student = {
  name: string;
  marks: number[];
}

export const Container = ({ name, marks }: Student) => {
  const addZero  = useMutation(api.student.addZero);

  const handleZero = async (name: string) => {
    try {
       await addZero({
       name: name,
       newMarks: [...marks, 0],})
      } catch (error) {
        console.error("Error adding zero:", error);
        alert("Failed to add zero. Please try again.");
    }
     
  }

  return (
    <div className="flex p-2 h-full">
      <Card className="h-full bg-gray-300 w-[150px] shadow-md rounded-md p-0">
        <CardHeader className="border-b flex-col text-xl font-bold border-gray-800 flex items-center">
          {name}
          <div className="flex space-x-6 mt-2">
            <Button onClick={() => handleZero(name)} className="bg-red-500 rounded-lg">0</Button>
            <Button className="bg-green-500 rounded-lg">
              <Plus className="h-1 w-1"/>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="bg-white h-full flex flex-col p-0 items-center justify-center">
          {marks.map((mark, i) => (
            <div className="flex h-8 w-full border-slate-300 border items-center justify-center" key={i}>{mark}</div>
          ))}
        </CardContent>
      </Card>
    </div>

  );
};