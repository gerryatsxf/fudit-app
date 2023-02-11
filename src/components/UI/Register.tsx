import React, { useState } from 'react'
import classes from './Register.module.scss'
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Register: React.FC<any> = ({ email, password, onLogin, setEmail, setPassword, emailError, setEmailError, isValidEmail, isEmptyEmail, navigate}) => {
  
  function onSubmit(email: string, password: string){
    console.log(email, password)
    createUser(email, password)
  }
  
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(email, password);
  }

  function createUser(email: string, password: string){
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential)
        // ...
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ..
      });
  }

  return (
    <form className={classes.register} onSubmit={handleSubmit}>
      <h2>Hi, stranger...</h2>
      <p>register pls</p>
      <EmailField
        value={email}
        onChange={(event) => {
          //@ts-ignore
          setEmail(event.target.value);
        }}
        error={emailError}
        setError={setEmailError}
        isValid={isValidEmail}
        isEmpty={isEmptyEmail}
      ></EmailField>
      <PasswordField
        value={password}
        onChange={(event) => {
          //@ts-ignore
          setPassword(event.target.value);
        }}
      ></PasswordField>
      <input type="submit" value="Register" />
      <div className={classes.links}>
        <Link to='/' onClick={() => onLogin({ email, password })}>
          Login
        </Link>
      </div>
    </form>
  )
}

export default Register