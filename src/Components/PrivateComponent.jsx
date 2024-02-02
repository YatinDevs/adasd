import React from "react";
import{Navigate,Outlet} from "react-router-dom";

const PrivateComponent =()=>
{
    const auth = localStorage.getItem('user');     //check user Authentication in local storage

    return auth ? <Outlet />:<Navigate to = "/login" /> // if authenticate : outlet- nested routes , otherwise navigate to login 
   
}
export default PrivateComponent;


