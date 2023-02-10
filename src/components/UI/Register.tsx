import React, { useState } from 'react'
import classes from './Register.module.scss'
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import { Link } from 'react-router-dom';

const Register: React.FC<any> = ({ email, password, onLogin, setEmail, setPassword, emailError, setEmailError, isValidEmail}) => {
  
  function onSubmit(email: string, password: string){
    console.log(email, password)
  }
  
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(email, password);
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