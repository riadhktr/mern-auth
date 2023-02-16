import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../store/authSlice";
const Welcome = () => {
const user = useSelector(state=> state.user)
console.log('user',user);
const dispatch = useDispatch()
const navigate = useNavigate()
const token=localStorage.getItem('token');

const fetchData = async()=>{
  await axios.get('http://localhost:5010/api/profile',{headers:{Authorization:token}}).then((response)=>{
    console.log('current user',response);
    dispatch(setUser(response.data.currentUser))
  }).catch(err=>{
    console.log(err);
  })
}
const logout = ()=>{
  localStorage.removeItem('token');
  navigate('/login')

}

useEffect(()=>{
   fetchData()
},[])


  return (
    <div>
      <button onClick={()=>logout()} >logout</button>
      <h1>{`you are welcome ${user.name}`}</h1>
      <h2> email: {`${user.email}`}</h2>
      <h2> _id: {`${user._id}`}</h2>
    </div>
  )
}

export default Welcome