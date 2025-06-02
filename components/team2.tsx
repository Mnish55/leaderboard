'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { useCounterTeam2, useScoreTeam2 } from "@/providers/zustand";

type Student = {
  name: string;
  marks: number[];
}

export const Team2 = ({ name, marks }: Student) => {
  const { counterTeam2, setCounterTeam2, increaseCounterTeam2 } = useCounterTeam2();
  const { scoreTeam2, setScoreTeam2, increaseScoreTeam2} = useScoreTeam2()
  const totalStudent = useQuery(api.student.getStudentsTeam2)
  const totalNumberOfStudents = totalStudent?.length || 0;
  const addZero  = useMutation(api.student.addZero);
  const arr = [...Array(totalNumberOfStudents)].map((_, i) => totalNumberOfStudents - i);


  useEffect(() => {
  if (counterTeam2 === totalNumberOfStudents) {
    setScoreTeam2(0);
  }
}, [counterTeam2, totalNumberOfStudents, setScoreTeam2]);
  

  const increaseCounterByOne = () => {
    if (counterTeam2 == totalNumberOfStudents) {
      setCounterTeam2(1)
    } else {
      increaseCounterTeam2();
    }
  }


  const handleZero = async (name: string) => {
    try {
       await addZero({
       name: name,
       newMarks: [...marks, 0],})
       increaseCounterByOne();
      } catch (error) {
        console.error("Error adding zero:", error);
        alert("Failed to add zero. Please try again.");
    }
     
  }

  const handleMarks = async (name: string) => {
    try {
       await addZero({
       name: name,
       newMarks: [...marks, arr[scoreTeam2]],})
       increaseScoreTeam2();
       increaseCounterByOne();
       console.log("array wala count",counterTeam2)
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