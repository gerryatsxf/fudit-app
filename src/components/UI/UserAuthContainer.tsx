import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";

const UserAuthContainer: React.FC = () => {
  
  const isValidEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) 
  const isEmptyEmail = (email: string) => email === '';

  const LOGIN = 'login'
  const REGISTER = 'register'
  const FORGOT = 'forgot-password'

  const [view, setView] = useState(LOGIN);

  const [email, setEmail] = useState('');
  // const [emptyEmail, setEmptyEmail] = useState(isEmptyEmail(email));
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(isValidEmail(email) || isEmptyEmail(email) ? "" : "Invalid email");

  if (view == REGISTER) {
    return <Register 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      // @ts-ignore
      onLogin={({ email, password }) => setView(LOGIN) & setEmail(email) & setPassword(password)}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
    />;
  } else if (view == LOGIN) {
    return <Login 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      // @ts-ignore
      onRegister={({ email, password }) => setView(REGISTER) & setEmail(email) & setPassword(password)} 
      // @ts-ignore
      onForgot={({ email }) => setView(FORGOT) & setEmail(email)} 
      emailError={emailError}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
    />;
  } else if (view == FORGOT) {
    console.log(FORGOT)
    return <ForgotPassword 
      email={email} 
      setEmail={setEmail}
      emailError={emailError}
      // @ts-ignore
      onLogin={({ email, password }) => setView(LOGIN) & setEmail(email) & setPassword(password)}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
    />;
  } else {
    return <Login 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      // @ts-ignore
      onRegister={({ email, password }) => setView(REGISTER) & setEmail(email) & setPassword(password)} 
      emailError={emailError}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
    />;
  }
    

};
  
export default UserAuthContainer;