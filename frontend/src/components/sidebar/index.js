import { Card, List } from "@material-tailwind/react";
import {
  FileSliders,
  PartyPopper,
  Users,
  CalendarDays,
  School,
  BarChart3
} from "lucide-react";
import { NavItem } from "./nav-item";
import { useLocation } from "react-router-dom";

export default function DefaultSidebar() {
  
  const guestRoutes = [
    {
      href: "/",
      icon: Users,
      label: "Faculty",
    },
    {
      href: "/event",
      icon: PartyPopper,
      label: "Event",
    },
    {
      href: "/userContribution",
      icon: FileSliders,
      label: "My Contribution",
    },
  ];
  const adminRoutes = [
    {
      href: "/admin/user",
      icon: Users,
      label: "Manage User",
    },
    {
      href: "/admin/faculty",
      icon: CalendarDays,
      label: "Manage Faculty",
    },
    {
      href: "/admin/event",
      icon: PartyPopper,
      label: "Manage Event",
    },
    {
      href: "/admin/contribution",
      icon: FileSliders,
      label: "Manage Contribution",
    },
  ];
  const marketingCoordinatorRoutes = [
    {
      href: "/marketingCoordinator/contribution",
      icon: FileSliders,
      label: "Manage Contribution",
    },
  ];

  const marketingManagerRoutes = [
    {
      href: "/marketingManager/faculty",
      icon: School,
      label: "Faculties",
    },
    {
      href: "/marketingManager",
      icon: BarChart3,
      label: "Analytics",
    }
  ];

  const isMarketingCoordinatorPage = window.location.pathname.startsWith(
    "/marketingCoordinator"
  );
  const isMarketingManagerPage = window.location.pathname.startsWith(
    "/marketingManager"
  );
  const isAdminPage = window.location.pathname.startsWith("/admin");
  let routes;

  if (isAdminPage) {
    routes = adminRoutes;
  } else if (isMarketingCoordinatorPage) {
    routes = marketingCoordinatorRoutes;
  } else if (isMarketingManagerPage){
    routes = marketingManagerRoutes;
  } else{
    routes = guestRoutes;
  }
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl">
      <List>
        {routes.map((route) => (
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
