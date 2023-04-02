import React, {useState} from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import {useLocation} from "react-router-dom";

const LOGIN = 'login'
const REGISTER = 'register'
const FORGOT = 'forgot-password'

export const AuthContext = React.createContext(
      {
        email: '',
        password: '',
        emailError: '',
        isValidEmail: (email: string) => {},
        isEmptyEmail: (email: string) => {},
        setEmail: (email: string) => {},
        setPassword: (password: string) => {},
        setEmailError: (emailError: string) => {}
      }
    );

const UserAuthContainer: React.FC<any> = () => {

  // const userCtx = React.useContext(UserContext);
  // const loadingCtx = React.useContext(FuditLoadingContext);

  const location = useLocation();
  const authViewCase = location.pathname.substring(1);


  const isValidEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) 
  const isEmptyEmail = (email: string) => email === '';


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(isValidEmail(email) || isEmptyEmail(email) ? "" : "Invalid email");

  const renderAuthView = (authViewCase: string) => {
    if (authViewCase === REGISTER) {
      return <Register/>;
    } else if (authViewCase === LOGIN) {
      return <Login/>;
    } else if (authViewCase === FORGOT) {
      console.log(FORGOT)
      return <ForgotPassword/>;
    } else {
      return <Login/>;
    }
  }

  return (
      <AuthContext.Provider value={{email, password, emailError, isValidEmail, isEmptyEmail, setEmail, setPassword, setEmailError}}>
          {renderAuthView(authViewCase)}
      </AuthContext.Provider>
  )

};
  
export default UserAuthContainer;