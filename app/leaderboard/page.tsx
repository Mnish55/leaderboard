"use client"
import { Navbar } from "@/components/navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Team1 } from "@/components/team1";
import { Team2 } from "@/components/team2";


const LeaderBoard = () => {
    const team1 = useQuery(api.student.getStudentsTeam1);
    const team2 = useQuery(api.student.getStudentsTeam2);
    return (
        <div className="flex flex-col h-full w-full">
            <div className="top-0">
                <Navbar />
            </div>
            <div className="w-full h-full">
                <Tabs defaultValue="team1" className="w-full h-full">
                    <TabsList className="w-full h-[60px] bg-slate-300 flex items-center justify-center">
                        <div className="space-x-9">
                            <TabsTrigger className="h-10 text-md" value="team1">Team 1</TabsTrigger>
                            <TabsTrigger className="h-10 text-md" value="team2">Team 2</TabsTrigger>
                        </div>
                    </TabsList>
                    <TabsContent className="h-full" value="team1">
                        <div className="flex overflow-auto">
                            {team1?.map((student) => (
                                <Team1 key={student.id} name={student.name} marks={student.marks} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="team2">
                        <div className="flex overflow-auto">
                            {team2?.map((student) => (
                                <Team2 key={student.id} name={student.name} marks={student.marks} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default LeaderBoard;