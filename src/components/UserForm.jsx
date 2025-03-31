import React, { useState } from "react";
import "../styles/styles.css"


const UserForm = ({setUser}) => {
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        password:"",
        income:""
    });

    const [errors, setErrors] = useState({});
    const [msg, setMsg]= useState(false);

    const handleChange = (event) => setUserData({...userData,[event.target.name]: event.target.value});

    const validateEmail = (email) => {
        if(!email) return "email is required";
        if(!email.endsWith(".com")) return"email must end with .com";
        return "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let validationErrors = {};


        if (!userData.name) validationErrors.name = "Name is Required";
        if (!userData.email) validationErrors.email = "email is Required";

        const emailError = validateEmail(userData.email);
        if(emailError) validationErrors.email =emailError;


        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!userData.password) validationErrors.password = "Password is required";
        else if (!passwordRegex.test(userData.password)) {
          validationErrors.password = "Password must be at least 8 characters long containing numbers, letters, and special characters";
        }

        if(!userData.income) {
            validationErrors.income = "income is required";
        }else if (isNaN(userData.income) || userData.income <=0) {
            validationErrors.income = "Income must  be a positive numbers";
        }

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
        }else{
            setErrors({});
            setMsg(true);



            setTimeout(() => {
                setMsg(false);
            }, 3000);

            localStorage.setItem("user",JSON.stringify(userData));
            setUser(userData);
        }
       
    };



return (
    <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">User details</h2>
        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
        {errors.name && <p className="error">{errors.name}</p>}
        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
        {errors.email && <p className="error">{errors.email}</p>}
        <input type="password" placeholder="password" name="password" onChange={handleChange}/>
        {errors.password && <p className="error">{errors.password}</p>}
        <input type="number" placeholder="Monthly Income" name="income" onChange={handleChange}/>
        {errors.income   && <p className="error">{errors.income}</p>}
        <button type="submit">Save</button>
      
        {msg && <p className="success"> User saved successfully!</p>}

    </form>
);

  
}

export default UserForm;

