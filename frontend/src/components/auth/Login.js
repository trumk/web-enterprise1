import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "./form-action";
import { useDispatch } from "react-redux";
import Input from "./form-input";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/apiRequest';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const authenticateUser = {
            email: loginState.email,
            password: loginState.password,
        };
        loginUser(authenticateUser, dispatch, navigate)
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}