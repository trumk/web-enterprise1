import React, { useEffect, useRef, useState } from 'react';
import { signupFields } from "../../constants/formFields"
import FormAction from "./form-action";
import Input from "./form-input";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { registerUser, verifyAccount } from '../../redux/apiRequest';
import logo from '../assets/logo.jpg';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [openNotification, setOpenNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

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

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSuccess = () => {
    setOpenNotification(true);
  };

  const handleClose = () => {
    setOpenNotification(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createAccount = {
      userName: signupState.userName,
      email: signupState.email,
      password: signupState.password
    };
    registerUser(createAccount, dispatch, handleSuccess);
  }

  const handleVerify = (e)=>{
      e.preventDefault();
      const verifyUser = {
          email: signupState.email,
          otp: otp.join(""),
      };
      verifyAccount(verifyUser, dispatch, navigate)
  }
  const verifyUser = {
    email: signupState.email,
    otp: otp.join(""),
};
console.log(verifyUser);
  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {
            fields.map(field =>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />

            )
          }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      <Dialog open={openNotification} onClose={() => setOpenNotification(false)}>
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
            Your OTP will be sent to {signupState.email}
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
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="red" onClick={handleClose}>
            Close
            </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}