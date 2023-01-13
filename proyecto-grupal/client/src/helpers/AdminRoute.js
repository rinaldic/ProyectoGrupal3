import React from "react";
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest}) => {

  function hasJWT() {
    //check if user has JWT token
    let flagJWT = sessionStorage.getItem("token") ? true : false;
    return flagJWT
  }

  function isAdmin() {
    let flagAdmin = sessionStorage.getItem("isAdmin");
    return flagAdmin
  }

  return (
    <Route {...rest}
      render={props => (
        (hasJWT() && (isAdmin() === "true")) ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      )}
    />
  )

}

export default AdminRoute;