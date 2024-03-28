  import React, { useState } from 'react';
  import { signupFields } from "../../constants/formFields"
  import FormAction from "./form-action";
  import Input from "./form-input";
  import { useDispatch } from "react-redux";
  import { registerUser } from '../../redux/apiRequest';
import { OTPModal } from './otp-modal';

  const fields = signupFields;
  let fieldsState = {};

  fields.forEach(field => fieldsState[field.id] = '');

  export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const [openNotification, setOpenNotification] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSuccess = () => {
      setOpenNotification(true);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const createAccount = {
        userName: signupState.userName,
        email: signupState.email,
        password: signupState.password
      };
    
      registerUser(createAccount, dispatch, handleSuccess)
    }
    

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
        <OTPModal open={openNotification} onClose={() => setOpenNotification(false)} email={signupState.email}/>
      </>
    )
  }