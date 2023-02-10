import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const UserAuthContainer: React.FC = () => {
  
  const isValidEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  const LOGIN = 'login'
  const REGISTER = 'register'

  const [view, setView] = useState(LOGIN);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(isValidEmail(email) || email == '' ? "" : "Invalid email");

  if (view == REGISTER) {
    return <Register 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      // @ts-ignore
      onLogin={({ email, password }) => setView(LOGIN) & setEmail(email) & setPassword(password)}
    />;
  } else if (view == LOGIN) {
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
    />;
  }
    

};
  
export default UserAuthContainer;