import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../../../redux/apiRequest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ChangePassword() {
  const userId = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const changePasswordStatus = useSelector((state) => state.auth.changePassword);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user?._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    console.log(user?._id);
    try {
      await dispatch(changeUserPassword(user?._id, user?.accessToken, data, dispatch, navigate));
    } catch (error) {
      console.log("Error:", error);
    }
  }
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-5 ml-5 w-full">
          <Card color="transparent" shadow={false}>
              <Typography color="blue-gray" variant="h4">
                Change Password
              </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Curent password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  New Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Confirm Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <Button className="mt-6" fullWidth onClick={handleSubmit}>
                Save
              </Button>
            </form>
          </Card>
        </div>

      </div>

    </>
  );
}