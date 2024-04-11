import { Card, List } from "@material-tailwind/react";
import {
  FileSliders,
  PartyPopper,
  Users,
  Home,
  CalendarDays,
} from "lucide-react";
import { NavItem } from "./nav-item";
import { useLocation } from "react-router-dom";

export default function DefaultSidebar() {
  const location = useLocation();
  const guestRoutes = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/user",
      icon: Users,
      label: "User",
    },
    {
      href: "/event",
      icon: PartyPopper,
      label: "Event",
    },
    {
      href: "/contribution",
      icon: FileSliders,
      label: "Contribution",
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
  const isMarketingCoordinatorPage = window.location.pathname.startsWith(
    "/marketingCoordinator"
  );
  const isAdminPage = window.location.pathname.startsWith("/admin");
  let routes;

  if (isAdminPage) {
    routes = adminRoutes;
  } else if (isMarketingCoordinatorPage) {
    routes = marketingCoordinatorRoutes;
  } else {
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
