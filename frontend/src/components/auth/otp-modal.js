import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.jpg';
import FormAction from "./form-action";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { verifyAccount } from '../../redux/apiRequest';



export const OTPModal = ({open, onClose, email}) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputRef = useRef(null);

    const handleOnChange = (event, index) => {
        const { value } = event.target;
        const newOTP = [...otp];
        newOTP[index] = value.substring(value.length - 1);
  
        if (!value) setActiveOTPIndex(index - 1);
        else setActiveOTPIndex(index + 1);
  
        setOtp(newOTP);
      };
    const handleOnKeyDown = (event, index) => {
        const { key } = event;
        if (key === 'Backspace') setActiveOTPIndex(index - 1);
      };
      useEffect(() => {
        inputRef.current?.focus();
      }, [activeOTPIndex]);
      const handleVerify = (e)=>{
        e.preventDefault();
        const verifyUser = {
            email: email,
            otp: otp.join(""),
        };
        verifyAccount(verifyUser, dispatch, navigate)
    }
  return (
    <Dialog open={open} onClose={onClose}>
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Enter your OTP
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            <img
              alt=""
              className="h-28 w-28"
              src={logo} />
            <Typography color="red" variant="h5">
              Your OTP will be sent to {email}
            </Typography>
            <form onSubmit={handleVerify}>
              <div className="flex justify-center items-center space-x-2">
                {otp.map((_, index) => (
                  <React.Fragment key={index}>
                    <input
                      ref={index === activeOTPIndex ? inputRef : null}
                      type="number"
                      className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                      onChange={(e) => handleOnChange(e, index)}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      value={otp[index]}
                    />
                    {index === otp.length - 1 ? null : (
                      <span className="w-2 py-0.5 bg-gray-400" />
                    )}
                  </React.Fragment>
                ))}

              </div>
              <FormAction handleSubmit={handleVerify} text="Submit"/>
            </form>
            <Typography color="black" variant="p">
              Already verify? Go to <Link to="/terms" className="font-medium text-purple-600 hover:text-purple-500">
                next step
            </Link>
            </Typography>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="red" onClick={onClose}>
              Close
              </Button>
          </DialogFooter>
        </Dialog>
  )
}
