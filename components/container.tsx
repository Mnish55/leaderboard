'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useStore, useManish } from "@/providers/zustand";

type Student = {
  name: string;
  marks: number[];
}

export const Container = ({ name, marks }: Student) => {
  const { count, increase, setCount } = useStore();
  const  {countManish, increaseManish, setManish} = useManish()
  const totalStudent = useQuery(api.student.getStudents)
  const totalNumberOfStudents = totalStudent?.length || 0;
  const addZero  = useMutation(api.student.addZero);
  const arr = [...Array(totalNumberOfStudents)].map((_, i) => totalNumberOfStudents - i);
  console.log("ye only counter hai", countManish)
  console.log("ye marks hai", marks)

  const increaseManisha = () => {
    if (countManish == totalNumberOfStudents) {
      setManish()
    } else {
      increaseManish()
    }
  }

  const increaseCounter = () => {
    if (count == totalNumberOfStudents - 1 || countManish == totalNumberOfStudents - 1) {
      setCount()
    } else {
       increase()
    }
  }


  const handleZero = async (name: string) => {
    try {
       await addZero({
       name: name,
       newMarks: [...marks, 0],})
       increaseManisha();
      } catch (error) {
        console.error("Error adding zero:", error);
        alert("Failed to add zero. Please try again.");
    }
     
  }

  const handleMarks = async (name: string) => {
    try {
       await addZero({
       name: name,
       newMarks: [...marks, arr[count]],})
       increaseManisha();
       increaseCounter();
      } catch (error) {
        console.error("Error adding zero:", error);
        alert("Failed to add zero. Please try again.");
    }
     
  }

  return (
    <div className="flex pt-2 p-2 h-full">
      <Card className="h-full bg-gray-300 w-[150px] shadow-md rounded-md p-0">
        <CardHeader className="border-b flex-col text-xl font-bold border-gray-800 flex items-center">
          {name}
          <div className="flex space-x-6 mt-2">
            <Button onClick={() => handleZero(name)} className="bg-red-500 rounded-lg">0</Button>
            <Button onClick={() => handleMarks(name)} className="bg-green-500 rounded-lg">
              <Plus className="h-1 w-1"/>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="bg-white h-full flex flex-col p-0 items-center justify-center">
          {marks.map((mark, i) => (
            <div className="flex h-8 w-full border-slate-300 border items-center justify-center" key={i}>{mark}</div>
          ))}
          <div className="h-11 font-bold bg-slate-200 w-full flex items-center justify-center border border-slate-600">
            Total: {marks.reduce((acc, curr) => acc + curr, 0)}
          </div>
        </CardContent>
      </Card>
    </div>

  );
};