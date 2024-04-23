import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Checkbox, Select, Option, Typography } from '@material-tailwind/react';
import { loginUser, getFacultyLogin } from '../../redux/apiRequest';
import { loginFields } from '../../constants/formFields';
import FormAction from './form-action';
import Input from './form-input';

import { loginUser } from '../../redux/apiRequest';
import { Option, Select } from '@material-tailwind/react';


export default function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });
  const [isGuest, setIsGuest] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const faculty = useSelector((state) => state.user?.getFacultyLogin?.data);

  useEffect(() => {
    if (currentUser) {
        if (currentUser.role === "admin") {
            navigate("/admin/user");
        } else if (currentUser.role === "marketing coordinator"){
            navigate("/marketingCoordinator");
        } else if (currentUser.role === "marketing manager") {
            navigate("/marketingManager")
        } else if (currentUser.role === "guest") {
            navigate("/guest")
        } else{
            navigate("/dashboard")
        }
    }
}, [currentUser, navigate]);

  useEffect(() => {
    dispatch(getFacultyLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isGuest) {
      const firstFaculty = faculty?.Faculty[0];
      setSelectedFaculty(firstFaculty?._id);
    } else {
      setSelectedFaculty(null);
    }

  }, [isGuest, faculty]);

  const handleCheckboxChange = () => {
    setIsGuest(!isGuest);
  };

  const handleSelectChange = (value) => {
    setSelectedFaculty(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const authenticateUser = isGuest 
      ? { email: selectedFaculty, password: selectedFaculty }
      : { email: loginState.email, password: loginState.password };

    loginUser(authenticateUser, dispatch);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        {loginFields.map((field) => (
          <Input
            key={field.id}
            handleChange={(e) => {
              setLoginState({ ...loginState, [field.id]: e.target.value });
            }}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            type={field.type}
            isRequired={!isGuest}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          checked={isGuest}
          onChange={handleCheckboxChange}
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              Login as guest
            </Typography>
          }
        />

        {isGuest && (
          <div className="flex-1">
            <Select
              value={selectedFaculty} // Thiết lập giá trị mặc định
              onChange={handleSelectChange}
            >
              {faculty?.Faculty.map((item) => (
                <Option key={item?._id} value={item?._id}>
                  {item?.facultyName}
                </Option>
              ))}
            </Select>
          </div>
        )}

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
  );
}
