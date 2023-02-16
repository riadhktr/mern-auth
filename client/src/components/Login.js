import React, { useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function Login() {
  
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "top-center",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    
       await axios.post(
        "http://localhost:5010/api/signIn",
        {
          ...values,
        },
        { withCredentials: true }
        
      ).then((response)=>{
        
        localStorage.setItem('token',response.data.token)
        // dispatch(setUser(response.data))
        navigate("/welcome")
      }).catch((err)=>{
        console.log('eror',err.response.data)
        const error = err.response.data.msg
         generateError(error)
      })
     
      
    
  };
  return (
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <span>
          Don't have an account ?<Link to="/"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;