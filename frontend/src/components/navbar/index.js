import React, { useEffect } from "react";
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
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, PowerOff, UserCircleIcon } from "lucide-react";
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import { createAxios } from "../../redux/createInstance";
import {jwtDecode} from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";
import { getSelf, logout } from "../../redux/apiRequest";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = axios.create();
  const id = user?._id;
  const accessToken = user?.accessToken;

  const handleLogout = () => {
    logout(dispatch, id, navigate, accessToken, axiosJWT);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      href: `/user/${user?._id}/profile`,
    },
    {
      label: "Sign Out",
      icon: PowerOff,
      action: handleLogout,
    },
  ];
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";
  //const isMarketingCoordinator = user && user.role == "marketing coordinator";
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  useEffect(() => {
    if(user && user._id) {
      dispatch(getSelf(user._id));
    }
  }, [dispatch, user]);
  const refreshToken = async () => {
    try{
      const res = await axios.post("http://localhost:5503/refresh", 
      {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log("Error:", error);
    }
  }
  axiosJWT.interceptors.request.use(
    async (config) => {
      const decodedToken = jwtDecode(user.accessToken);
      let date = new Date();
      if(decodedToken.exp < date.getTime() / 1000) {
        const data = refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = `Bearer ${data.accessToken}`;
      }
      return config;
    }, (err) => {
      return Promise.reject(err);
    }

  )
  const profile = useSelector((state) => state.user.user?.user);
  return (
    <div className="max-h-[768px] w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            <Avatar src={logo} alt="logo" size="sm" className="mr-2" />
            </Typography>
            <Typography
              as="a"
              href="/"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            >
              Web Enterprise
            </Typography>
          </div>
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
            ) : isAdmin ? (
              <>
                <Link to="/admin/faculty">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Admin mode</span>
                  </Button>
                </Link>
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
                          onClick={()=> {
                            closeMenu();
                            if(action) action()
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
            ) : isUser && (
              <>
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
                            onClick={() =>{
                              closeMenu();
                              if(action) action();
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
      </Navbar>
    </div>
  );
}