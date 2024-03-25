import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function VerifyAccount() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [open, setOpen] = React.useState(false);

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
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Signup
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>OTPInput</DialogHeader>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}