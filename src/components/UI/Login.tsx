import React, { useState } from 'react'
import classes from './Login.module.scss'
import PassworldField from './PasswordField';
import EmailField from './EmailField';
const Login = (props: any) => {
    const [emailError, setEmailError] = useState("");

    function handleSubmit(event: any) {
      event.preventDefault();
      const emailInput = event.target.elements.email;
      if (!emailInput.validity.valid) {
        setEmailError("Invalid email address");
        console.log('invalid!')
        return;
      }
      setEmailError("");
      // submit form data
    }
    return (
        <form className={classes.login} onSubmit={handleSubmit}>
        <h2>Hi, stranger...</h2>
        <p>login pls</p>
        <EmailField></EmailField>
        <PassworldField></PassworldField>
        
        <input type="submit" value="Login" />
        <div className={classes.links}>
            <a href="#">Forgot password</a>
            <a href="#">Register</a>
        </div>
        </form>
    )
}

export default Login