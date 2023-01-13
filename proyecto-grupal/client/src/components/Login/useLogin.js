import { useState } from "react";

export const useLogin = (initialValue = false) => {
  const [modalOpen, setModalOpen] = useState (initialValue);
  
  
  const openLogin = () => setModalOpen(true)
  const closeLogin = () => setModalOpen(false)

  return [modalOpen, openLogin, closeLogin]

}

export const useType = (initialValue = false) => {
  const [userLoged, setUserLoged] = useState (initialValue)

  const loged = () => setUserLoged (true)

  return [userLoged, loged]
}

export const validateLogin = (data) => {
  
  let errors = {};
  
  if (data.email === '') {
    errors.email = 'Must specify an email'
  }
  if (data.password === '') {
    errors.password = 'Must specify a password'
  }
  
  return errors
}