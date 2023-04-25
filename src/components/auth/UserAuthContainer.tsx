import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import { useLocation } from "react-router-dom";
import { BrowserAppContext, FuditApiContext } from "../../App";

export const AuthContext = React.createContext({
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  isValidEmail: (email: string) => {},
  isEmptyEmail: (email: string) => {},
  isValidPassword: (password: string) => {},
  isEmptyPassword: (password: string) => {},
  setEmail: (email: string) => {},
  setPassword: (password: string) => {},
  setEmailError: (emailError: string) => {},
  setPasswordError: (passwordError: string) => {},
});

export const RegisterContext = React.createContext({
  firstName: "",
  firstNameError: "",
  lastName: "",
  lastNameError: "",
  isEmptyName: (name: string) => {},
  isValidName: (name: string) => {},
  setFirstName: (firstName: string) => {},
  setFirstNameError: (firstNameError: string) => {},
  setLastName: (lastName: string) => {},
  setLastNameError: (lastNameError: string) => {},
});

const UserAuthContainer: React.FC<any> = () => {
  const location = useLocation();
  const authViewCase = location.pathname.substring(1);

  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const fuditApiCtx = React.useContext(FuditApiContext);
  const PROTOCOL = fuditApiCtx.protocol;
  const HOST = fuditApiCtx.host;
  const LOGIN = `${BASE_PATH}/login`;
  const REGISTER = `${BASE_PATH}/register`;
  const FORGOT = `${BASE_PATH}/forgot-password`;

  const isValidEmail = (email: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const isEmptyEmail = (email: string) => email === "";

  const isValidPassword = (password: string) => password.length >= 6;
  const isEmptyPassword = (password: string) => password === "";
  const isEmptyName = (name: string) => name === "";
  const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(
    isValidEmail(email) || isEmptyEmail(email) ? "" : "Invalid email"
  );
  const [passwordError, setPasswordError] = useState(
    isValidPassword(password) || isEmptyPassword(password)
      ? ""
      : "Password must be at least 6 characters"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const renderAuthView = (authViewCase: string) => {
    if (authViewCase === REGISTER) {
      return <Register />;
    } else if (authViewCase === LOGIN) {
      return <Login />;
    } else if (authViewCase === FORGOT) {
      console.log(FORGOT);
      return <ForgotPassword />;
    } else {
      return <Login />;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        emailError,
        passwordError,
        isValidEmail,
        isEmptyEmail,
        isValidPassword,
        isEmptyPassword,
        setEmail,
        setPassword,
        setEmailError,
        setPasswordError,
      }}
    >
      <RegisterContext.Provider
        value={{
          firstName,
          firstNameError,
          lastName,
          lastNameError,
          isEmptyName,
          isValidName,
          setFirstName,
          setFirstNameError,
          setLastName,
          setLastNameError,
        }}
      >
        {renderAuthView(authViewCase)}
      </RegisterContext.Provider>
    </AuthContext.Provider>
  );
};

export default UserAuthContainer;
