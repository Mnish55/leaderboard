"use client"
import { Navbar } from "@/components/navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Team1 } from "@/components/team1";


const LeaderBoard = () => {
    const team1 = useQuery(api.student.getStudentsTeam1);
    return (
        <div className="flex flex-col h-full w-full">
            <div className="top-0">
                <Navbar />
            </div>
            <div className="w-full h-full">
                <div className="flex overflow-auto">
                            {team1?.map((student) => (
                                <Team1 key={student.id} name={student.name} marks={student.marks} />
                            ))}
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard;