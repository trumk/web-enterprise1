import { useState } from 'react';
import { signupFields } from "../../constants/formFields"
import FormAction from "./form-action";
import Input from "./form-input";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/apiRequest';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    const createAccount = {
      userName: signupState.userName,
      email: signupState.email,
      password: signupState.password
    };
    registerUser(createAccount, dispatch, navigate);
  }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
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
    )
}