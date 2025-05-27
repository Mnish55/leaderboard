"use client"

import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";


const LeaderBoard = () => {
    const data = useQuery(api.student.getStudents)
    return (
        <div className="flex flex-col h-full w-full">
            <div className="top-0">
                <Navbar/>
            </div>
            <div className="flex overflow-auto">
                {data?.map((student) => (
                    <Container key={student.id} name={student.name} marks={student.marks} />
                ))}
            </div>
        </div>
    )
}

export default LeaderBoard;