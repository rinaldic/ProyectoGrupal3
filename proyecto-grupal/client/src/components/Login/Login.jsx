import React from "react";
import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validateLogin } from "./useLogin";
import * as actions from "../../redux/actions/productsActions";
import logo from "../../img/logo.JPG";
import { Link } from "react-router-dom";
import LogIn from "../Auth0/LogIn";

const Login = ({ children, modalOpen, closeLogin }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  const space = "\u00A0";

  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }));
    let dataErrors = validateLogin(user);
    setErrors((prevState) => dataErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataErrors = validateLogin(user);
    setErrors((prevState) => dataErrors);

    if (Object.keys(dataErrors).length === 0) {
      dispatch(actions.loginUser(user));
      // setUser(initialState);
    }
  };

  return (
    <article
      className={`modal ${modalOpen && "login_open"}`}
      onClick={closeLogin}
    >
      <div className="modal_container" onClick={handleModalContainerClick}>
        <div className="logo_container">
          <h3>CloudyBuy</h3>
          <img className="logo_image" src={logo} alt="logo" />
        </div>
        <button className="modal_close btns_close" onClick={closeLogin}>
          X
        </button>
        <form className="formCard" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">
            E-mail
            <input
              className="inputCard"
              type="email"
              value={user.email}
              name="email"
              onChange={(e) => handleOnChange(e)}
            />
            {errors.email && <p className="danger">{errors.email}</p>}
          </label>
          <label className="password_input" htmlFor="">
            Password:
            <input
              className="inputCard"
              type="password"
              value={user.password}
              name="password"
              onChange={(e) => handleOnChange(e)}
            />
            {errors.password && <p className="danger">{errors.password}</p>}
          </label>
          <button className="btns" type="submit" onClick={errors.password && closeLogin}>
            Login with Email
          </button>
        </form>

        <div className="formCard">
          
          <LogIn />
        </div>

        <div className="sing_redirection">
          <spam>
            ¿Forgot password? {space}
            <Link className="register_link" to={"/passReset"}>
              Reset Password
            </Link>
          </spam>
        </div>
        <div className="sing_redirection">
          <spam>
            Don't have an account? {space}
            <Link className="register_link" to={"/register"}>
              Sign Up Here
            </Link>
          </spam>
        </div>

        

        {/* {children} */}
      </div>
    </article>
  );
};

export default Login;
