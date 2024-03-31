import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
   
  export function ChangePassword() {
    const userId = useParams();
    console.log(userId);
    return (
        <>
        <NavbarDefault/>
        <div className="flex gap-6">
            <DefaultSidebar/>
            <div className="w-full flex justify-center">
            <Card color="transparent" shadow={false}>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Curent password
            </Typography>
            <Input
            type="password"
              size="lg"
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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button className="mt-6" fullWidth>
            Save
          </Button>
        </form>
      </Card>
            </div>
       
        </div>
        
      </>
    );
  }