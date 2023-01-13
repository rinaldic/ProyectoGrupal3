import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogOut.module.css';


export default function LogOut() {
  const { logout } = useAuth0();

  return (
    <button className={s.btns} onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};
