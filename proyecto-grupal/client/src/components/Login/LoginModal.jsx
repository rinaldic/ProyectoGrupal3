import { useLogin } from "./useLogin";
import { useState } from "react";
import Login from "./Login";
import "./LoginModal.css";

const LoginModal = () => {
  const [modalOpen, openLogin, closeLogin] = useLogin(false);
 

  function handleLogin() {
    if (!sessionStorage.getItem("token")) {
      openLogin();
    } else {
      
      sessionStorage.removeItem("token");
    }
  }

  return (
    <div>
      <button onClick={handleLogin} className="btns">Login</button>

      <Login modalOpen={modalOpen} closeLogin={closeLogin} />
    </div>
  );
};

export default LoginModal;
