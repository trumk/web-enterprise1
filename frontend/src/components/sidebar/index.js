import { ChevronFirst } from "lucide-react";

export default function Sidebar(){
    return (
        <aside className="h-screen mt-16">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex items-center gap-2">
                    <h3>Dashboard</h3>
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        <ChevronFirst />
                    </button>
                </div>
                <ul className="flex-1 px-3">
                    
                </ul>
                <div className="border-t flex p-3">
                    
                </div>
            </nav>
        </aside>
    )
}