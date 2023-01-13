import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from '../../redux/actions/productsActions';
import s from './Register.module.css';
import logo  from '../../img/logo.JPG';
import validateData from "./RegisterValidateData";
import Swal from "sweetalert2"

export default function Register() {

  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {
    name: '',
    surname: '',
    password: '',
    adress: '',
    email: '',
    origin: 'passwdUser'
  }
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
    let dataErrors = validateData(user)
    setErrors(prevState => (dataErrors))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataErrors = validateData(user)
    setErrors(prevState => (dataErrors))

    if (Object.keys(dataErrors).length === 0) {
      dispatch(actions.signNewUser(user))
      
      Swal.fire({
        title: 'New User created!',
        //text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Continue'
      })
      setUser(initialState)
      history.push('/')
    }

  }
  
  return (
    <div className={s.container}>
      <section className={s.section1}>
        <div className={s.logo}>
          <img src={logo} alt="LOGO" className={s.logo}/>
          <h3>CloudyBuy</h3>
        </div>
        <div className={s.section1_h2}>
          <h2 >Welcome to the Store!</h2>
        </div>
        <div>
          <h2>Fulfill your dreams buying the products you want</h2>
        </div>
      </section>

      <section className={s.section2}>
        <div className={s.content}>
          <h2>Sign Up</h2>
          <form className={s.formCard} onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">
              Name:
              <input className={s.inputCard} type="text" value={user.name} name='name' onChange={e => handleOnChange(e)}/>
              {errors.name && (<p className={s.danger}>{errors.name}</p>)}
            </label>
            <label htmlFor="">
              LastName:
              <input className={s.inputCard} type="text" value={user.surname} name='surname' onChange={e => handleOnChange(e)}/>
              {errors.surname && (<p className={s.danger}>{errors.surname}</p>)}
            </label>
            <label htmlFor="">
              Password:
              <input className={s.inputCard} type="password" value={user.password} name= 'password' onChange={e => handleOnChange(e)}/>
              {errors.password && (<p className={s.danger}>{errors.password}</p>)}
            </label>
            <label htmlFor="">
              Address:
              <input className={s.inputCard} type="test" value={user.adress} name='adress' onChange={e => handleOnChange(e)}/>
              {errors.adress && (<p className={s.danger}>{errors.adress}</p>)}
            </label>  
            <label htmlFor="">
              E-mail:
              <input className={s.inputCard} type="email" value={user.email} name='email' onChange={e => handleOnChange(e)}/>
              {errors.email && (<p className={s.danger}>{errors.email}</p>)}
            </label>
            <button className={s.btns} type="submit">Sign Up</button>
          </form>
        </div>
      </section>
    </div>

  )
}
