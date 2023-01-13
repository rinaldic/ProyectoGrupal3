import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import s from './LogIn.module.css';


export default function LogIn() {
  const { loginWithRedirect } = useAuth0();
  const history = useHistory()

  const login = () => {
    localStorage.setItem('url',history.location.pathname)
    loginWithRedirect()
  }

  return (
    <>
      <button className={s.btns} onClick={ login }>
          LogIn with Social
      </button>
    </>
  )

}

