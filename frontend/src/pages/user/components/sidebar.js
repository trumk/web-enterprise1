import {
    Card,
    List,
  } from "@material-tailwind/react";
  import {
    FileSliders, PartyPopper, Users, Home, Contact, KeyRound
  } from "lucide-react";
import { NavItem } from "./nav-item";
import { useSelector } from "react-redux";
   
  export default function DefaultSidebar() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const routes = [
      {
        href: `/user/${user?._id}/profile`,
        icon: Contact,
        label: 'Profile'
      },
      {
        href: `/user/${user?._id}/changePassword`,
        icon: KeyRound,
        label: 'Authenticate'
      }
    ];
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl">
        <List>
          {routes.map((route)=>(
            <NavItem
            key={route.path}
            href={route.href}
            icon={route.icon}
            label={route.label}
            />
          ))}
        </List>
      </Card>
    );
  }