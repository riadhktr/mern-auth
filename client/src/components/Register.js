import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  
  const navigate = useNavigate();
 
  const [values, setValues] = useState({ name:"" , email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
    const generateSucess = (sucess)=>{
      toast.success(sucess,{
        position: "bottom-right"
      })
    }
  const handleSubmit = async (event) => {
    event.preventDefault();
   
      await axios.post(
        "http://localhost:5010/api/register",
        {
          ...values,
        },
        { withCredentials: true }
      ).then((response)=>{
        console.log(response);
        generateSucess('created with sucess')
        
      })
      .catch((err)=>{
        console.log(err.response.data);

        if(err.response.data.msg){
          console.log(err.response.data.msg);
          // setTest(err.response.data.msg)
          generateError(err.response.data.msg)
         }
        if(err.response.data.errors){
        
        err.response.data.errors.map(el=>{
        return generateError(el.msg) });
       } 
       
        
      })
      
      
       
      }
    
  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div>
          <label htmlFor="text">Name</label>
          <input
            type="text"
            name="name"
            placeholder="UserName"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <div>
          Already have an account ?<Link to="/login"> Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;