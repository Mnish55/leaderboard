import { Plus } from "lucide-react"

export const Navbar = () => {
    return (
        <div className="h-10 w-full m-5 rounded-md bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500">
            <div className="flex items-center justify-center p-2 font-bold">
                <Plus className="h-5 w-5 mr-2" />
                <h1>Add Student</h1>
            </div>
        </div>
    )
}