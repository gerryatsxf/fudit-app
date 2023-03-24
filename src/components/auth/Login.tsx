import React from 'react'
import classes from './Login.module.scss'
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC<any> = ({ email, password, onRegister, onForgot, setEmail, setPassword, emailError, setEmailError, isValidEmail, isEmptyEmail, navigate}) => {

  const auth = getAuth();

  function onSubmit(email: string, password: string){
    console.log(email, password)
    loginUser(email, password)
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(email, password);
  }

  function loginUser(username: string, password: string){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  
  return (
    <form className={classes.login} onSubmit={handleSubmit}>
      <h2>Hi, stranger...</h2>
      <p>login pls</p>
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
      <input type="submit" value="Login" />
      <div className={classes.links}>
        <Link to='/forgot-password' onClick={() => onForgot({ email, password })}>
          Forgot password
        </Link>
        <Link to='/register' onClick={() => onRegister({ email, password })}>
          Register
        </Link>
      </div>
    </form>
  )
}

export default Login