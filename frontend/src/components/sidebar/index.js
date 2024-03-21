import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    IconButton,
} from "@material-tailwind/react";
import { FileSliders, PartyPopper, Users } from "lucide-react";
import { useState } from "react";
import { Toggle } from "./toggle";
import { NavItem } from "./nav-item";

export default function Sidebar() {
    const [isExpand, setIsExpand] = useState(true);
    const routes = [
        {
            label: "Faculty",
            icon: Users,
        },
        {
            label: "Event",
            icon: PartyPopper,
        },
        {
            label: "Contribution",
            icon: FileSliders,
        }
    ]
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 mt-16">
            <div className="mb-2 p-4 flex justify-between">
                <Typography variant="h5" color="blue-gray">
                    Dashboard
                </Typography>
                <Toggle />
            </div>
            <List className="space-y-2 px-2 pt-4 lg:pt-0">
                {isExpand && (
                        routes.map((route) => (
                            <NavItem
                                label={route.label}
                                icon={route.icon}
                            />
                        ))
                )}
            </List>
        </Card>
    )
}