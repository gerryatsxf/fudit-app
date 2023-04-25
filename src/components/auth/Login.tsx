import React, { useContext } from "react";
import classes from "./Login.module.scss";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./UserAuthContainer";
import { BrowserAppContext } from "../../App";

const Login: React.FC<any> = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;
  const password = authCtx.password;
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;

  const onRegister = () => {
    navigate(`/${BASE_PATH}/register`);
  };

  const onForgot = () => {
    navigate(`/${BASE_PATH}/forgot-password`);
  };
  function onSubmit(email: string, password: string) {
    console.log(email, password);
    loginUser(email, password);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(email, password);
  }

  function loginUser(username: string, password: string) {
    // TODO: MAKE API CALL TO LOGIN USER
  }

  return (
    <form className={classes.login} onSubmit={handleSubmit}>
      <h2>Hi, stranger...</h2>
      <p>login pls</p>
      <EmailField></EmailField>
      <PasswordField></PasswordField>
      <input type="submit" value="Login" />
      <div className={classes.links}>
        <a onClick={() => onForgot()}>Forgot password</a>
        <a onClick={() => onRegister()}>Register</a>
      </div>
    </form>
  );
};

export default Login;
