import { useEffect, useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "./form-action";
import { useDispatch, useSelector } from "react-redux";
import Input from "./form-input";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/apiRequest';
import { Option, Select } from '@material-tailwind/react';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const msg = useSelector((state) => state.auth?.msg);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    
    
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const authenticateUser = {
            email: loginState.email,
            password: loginState.password,
        };
        loginUser(authenticateUser, dispatch)
    }
    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "admin") {
                navigate("/admin/user");
            } else if (currentUser.role === "marketing coordinator"){
                navigate("/marketingCoordinator");
            } else if (currentUser.role === "marketing manager") {
                navigate("/marketingManager")
            } else{
                navigate("/dashboard")
            }
        }
    }, [currentUser, navigate]);
    
    return(
        <>
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
        <Select>
            <Option value="">Faculty Name</Option>
        </Select>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
      </>
    )
}