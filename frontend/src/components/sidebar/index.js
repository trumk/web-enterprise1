import { Card, List } from "@material-tailwind/react";
import {
  FileSliders,
  PartyPopper,
  Users,
  CalendarDays,
  School,
  BarChart3,
  ShieldAlert,
  Contact,
  KeyRound,
  Settings
} from "lucide-react";
import { NavItem } from "./nav-item";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DefaultSidebar() {

  const guestRoutes = [
    {
      href: "/contributions",
      icon: PartyPopper,
      label: "All Contributions",
    },
    {
      href: "/dashboard",
      icon: Users,
      label: "Faculty",
    },
    {
      href: "/myContribution",
      icon: FileSliders,
      label: "My Contribution",
    },
  ];
  const user = useSelector((state) => state.auth.login.currentUser);
    const userRoutes = [
      {
        href: `/user/${user?._id}/profile`,
        icon: Contact,
        label: 'Profile'
      },
      {
        href: `/user/${user?._id}/changePassword`,
        icon: KeyRound,
        label: 'Authenticate'
      },
      {
        href: `/user/${user?._id}/edit`,
        icon: Settings,
        label: 'Settings'
      }
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
      href: "/marketingCoordinator",
      icon: FileSliders,
      label: "Manage Contribution",
    },
    {
      href: "/marketingCoordinator/exception",
      icon: ShieldAlert,
      label: "Exception Contribution",
    }
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
  const isUserPage = window.location.pathname.startsWith("/user");
  let routes;

  if (isAdminPage) {
    routes = adminRoutes;
  } else if (isMarketingCoordinatorPage) {
    routes = marketingCoordinatorRoutes;
  } else if (isMarketingManagerPage) {
    routes = marketingManagerRoutes;
  } else if (isUserPage) {
    routes = userRoutes;
  } else {
    routes = guestRoutes;
  }
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Card className="hidden md:block sticky top-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-gray-300">
      <List>
        {routes.map((route) => (
          <NavItem
            key={route.path}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isActive={currentPath === route.href}
          />
        ))}
      </List>
    </Card>
  );
}
