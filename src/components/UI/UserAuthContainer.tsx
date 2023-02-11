import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwI3X68ztEHWjew38ifcrCxiDT-Qm3EeE",
  authDomain: "fudit-9b983.firebaseapp.com",
  projectId: "fudit-9b983",
  storageBucket: "fudit-9b983.appspot.com",
  messagingSenderId: "347145460975",
  appId: "1:347145460975:web:136889857ca1f8ba2a0f1a",
  measurementId: "G-PK42PBC2R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const UserAuthContainer: React.FC = () => {
  
  const isValidEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) 
  const isEmptyEmail = (email: string) => email === '';

  const LOGIN = 'login'
  const REGISTER = 'register'
  const FORGOT = 'forgot-password'
  const navigate = useNavigate();
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
      navigate={navigate}
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
      navigate={navigate}
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
      navigate={navigate}
    />;
  }
    

};
  
export default UserAuthContainer;