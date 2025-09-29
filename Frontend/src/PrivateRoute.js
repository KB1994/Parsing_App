import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { isLogin } from "./Authentification";
import SignIn from "./Components/SignIn"

const PrivateRoute = ({children}) => {
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
 
      return isLogin() ? children :  <Navigate to='/' push='true' />  
    

};

export default PrivateRoute;
