import React from "react";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => {

  function hasJWT() {
    //check if user has JWT token
    console.log('token',localStorage.getItem("token") )
    let flag = sessionStorage.getItem("token") ? true : false;
    return flag
  }

  return (
    <Route {...rest}
      render={props => (
        hasJWT() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      )}
    />
  )

}

export default PrivateRoute;
