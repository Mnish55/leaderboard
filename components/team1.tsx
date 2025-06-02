'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCounterTeam1, useScoreTeam1 } from "@/providers/zustand";
import { useEffect } from "react";

type Student = {
  name: string;
  marks: number[];
}

export const Team1 = ({ name, marks }: Student) => {
  const { counterTeam1, setCounterTeam1, increaseCounterTeam1 } = useCounterTeam1();
  const { scoreTeam1, setScoreTeam1, increaseScoreTeam1} = useScoreTeam1()
  const totalStudent = useQuery(api.student.getStudentsTeam1)
  const totalNumberOfStudents = totalStudent?.length || 0;
  const addZero  = useMutation(api.student.addZero);
  const arr = [...Array(totalNumberOfStudents)].map((_, i) => totalNumberOfStudents - i);


  useEffect(() => {
  if (counterTeam1 === totalNumberOfStudents) {
    setScoreTeam1(0);
  }
}, [counterTeam1, totalNumberOfStudents, setScoreTeam1]);
  

  const increaseCounterByOne = () => {
    if (counterTeam1 == totalNumberOfStudents) {
      setCounterTeam1(1)
    } else {
      increaseCounterTeam1();
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
       newMarks: [...marks, arr[scoreTeam1]],})
       increaseScoreTeam1();
       increaseCounterByOne();
       console.log("array wala count",counterTeam1)
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