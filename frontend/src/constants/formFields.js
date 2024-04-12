const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"text",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address or username"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"userName",
        id:"userName",
        name:"userName",
        type:"text",
        autoComplete:"userName",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"password",
        isRequired:true,
        placeholder:"Password"   
    }
]


export {loginFields,signupFields}