import React, { useEffect } from "react";
import logo from '../assets/logo.jpg'
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
  MobileNav,
  Badge,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, PowerOff, UserCircleIcon, Mail, PartyPopper, Users, FileSliders, CalendarDays, ShieldAlert, School, BarChart3, Contact, KeyRound, Settings, BellIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAllNotifications, getOneNotification, getSelf, logout } from "../../redux/apiRequest";
import { MobileNavItem } from "./mobile-nav";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNotification, setOpenNotification] = React.useState(false);
  const id = user?._id;
  const accessToken = user?.accessToken;
  const handleLogout = () => {
    logout(dispatch, id, navigate, accessToken);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const notification = useSelector((state) => state.contribution.getNotifications?.notifications);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllNotifications(accessToken));
    }
  }, [dispatch, user]);
  console.log(notification);
  const handleReadNotification = (id) => {
    setOpenNotification(false);
    if (user && user?.accessToken) {
      dispatch(getOneNotification(id, accessToken))
    }
  }
  const profileMenuItems = [];
  profileMenuItems.push({
    label: `${user?.role == "guest"? "Guest" : user?.email}`,
    icon: Mail
  },
  {
    label: "Sign Out",
    icon: PowerOff,
    action: handleLogout,
  })
  if (user?.role !== "guest") {
    profileMenuItems.splice(1, 0, {
      label: "My Profile",
      icon: UserCircleIcon,
      href: `/user/${user?._id}/profile`,
    });
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  useEffect(() => {
    if (user && user._id) {
      dispatch(getSelf(user._id));
    }
  }, [dispatch, user]);
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
      href: "/userContribution",
      icon: FileSliders,
      label: "My Contribution",
    },
  ];
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
  const handleNavigateByRole = () => {
    if (!user) {
        navigate("/");
    } else if (user.role === 'admin') {
        navigate('/admin/user');
    } else if (user.role === 'marketing manager') {
        navigate('/marketingManager');
    } else if (user.role === 'marketing coordinator') {
        navigate('/marketingCoordinator');
    } else if(user.role === 'user') {
        navigate('/dashboard');
    } else {
        navigate('/');
    }
}
  const profile = useSelector((state) => state.user.user?.user);
  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Button onClick={handleNavigateByRole} variant="text" className="flex items-center" size="sm">

            <Typography as="a" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
              <img src={logo} alt="logo" size="sm" className="mr-2 h-10" />
            </Typography>
          </Button>
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-x-1">
                <Link to="/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Sign up</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Menu open={openNotification} handler={setOpenNotification} placement="bottom-end">
                  {
                    notification?.filter(item => !item.viewed).length > 0 && (
                      <Badge color="red" className="ml-2 relative -right-12 z-10" content={notification?.filter(item => !item.viewed).length} />
                    )
                  }
                  <MenuHandler>
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto z-0"
                    >

                      <BellIcon className="h-6 w-6" />
                    </IconButton>

                  </MenuHandler>
                  <MenuList className="p-1 max-w-96">
                    {notification?.length > 0 ? (
                      notification?.slice(0, 5).map((item) => {
                        const isRead = !item?.viewed;
                        return (
                          <>
                            <Link to={item?.message.startsWith("Student") ? `/marketingCoordinator/contribution/${item.contributionID}/action` : `/myContribution/${item.contributionID}/detail`}>
                              <MenuItem
                                className={`flex items-center gap-2 rounded ${isRead
                                  ? "bg-yellow-500/10 focus:bg-yellow-500/10 active:bg-yellow-500/10"
                                  : ""
                                  }`}
                                onClick={() => handleReadNotification(item?._id)}
                              >
                                <Avatar src={item?.avatar} />
                                <p
                                  as="span"
                                  variant="small"
                                  className="line-clamp-2"
                                  color={isRead ? "font-bold" : "font-normal inherit"}
                                  dangerouslySetInnerHTML={{ __html: item?.message }}
                                />
                              </MenuItem>
                            </Link>
                          </>
                        )

                      })
                    ) : (
                      <Typography
                        as="span"
                        variant="small"
                        className="line-clamp-2"
                        color="font-normal inherit"
                      >
                        You don't have any notification
                      </Typography>
                    )
                    }

                  </MenuList>
                </Menu>
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                  <MenuHandler>
                    <Button
                      variant="text"
                      color="blue-gray"
                      className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                      {/* TODO: User avatar */}
                      <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={profile?.avatar}
                      />
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                          }`}
                      />
                    </Button>
                  </MenuHandler>
                  <MenuList className="p-1">
                    {profileMenuItems.map(({ label, icon, href, action }, key) => {
                      const isLastItem = key === profileMenuItems.length - 1;
                      return (
                        <Link to={href}>
                          <MenuItem
                            key={label}
                            onClick={() => {
                              closeMenu();
                              if (action) action();
                            }}
                            className={`flex items-center gap-2 rounded ${isLastItem
                              ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                              : ""
                              }`}
                          >
                            {React.createElement(icon, {
                              className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                              strokeWidth: 2,
                            })}
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal"
                              color={isLastItem ? "red" : "inherit"}
                            >
                              {label}
                            </Typography>
                          </MenuItem>
                        </Link>
                      );
                    })}
                  </MenuList>
                </Menu>
              </>
            )}

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>

        </div>
        <MobileNav open={openNav}>

          <div className="container mx-auto">
            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {
                routes.map((route) => (
                  <MobileNavItem
                    href={route.href}
                    key={route.label}
                    icon={route.icon}
                    label={route.label}
                  />
                ))
              }

            </ul>
            {!user && (
              <div className="flex items-center gap-x-1">
                <Link to="/login">
                  <Button fullWidth variant="text" size="sm" className="">
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button fullWidth variant="gradient" size="sm" className="">
                    <span>Sign in</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
