"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onClick = () => {
    router.push("/leaderboard");
  };
  return (
    <div className="flex h-screen items-center justify-center bg-amber-500 text-2xl font-bold text-gray-800">
      <Button onClick={onClick} className="h-[70px] w-[150px] text-2xl font-bold">
        <Plus className="h-[20px] w-[20px] mr-2" />
        Create
      </Button>
    </div>
  )
}