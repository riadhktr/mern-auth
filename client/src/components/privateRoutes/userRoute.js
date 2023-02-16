import React from 'react'
import {Navigate,useLocation,Outlet} from 'react-router-dom';


const UserRoute = () => {
    const location = useLocation();
    return (
    
        localStorage.getItem('token')  ?(
           <Outlet/>
        ) : (< Navigate to='/login' state={{from : location}} replace/>)
    
  )

}

export default UserRoute;