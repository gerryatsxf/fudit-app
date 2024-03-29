import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmailField from "./EmailField";
import classes from "./ForgotPassword.module.scss";
import { AuthContext } from "./UserAuthContainer";
import { BrowserAppContext } from "../../App";

const ForgotPassword: React.FC<any> = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;

  const onLogin = () => {
    navigate(`/${BASE_PATH}/login`);
  };
  function onSubmit(email: string) {
    console.log(email);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(email);
  }

  return (
    <form className={classes.forgotPassword} onSubmit={handleSubmit}>
      <h2>Hi, stranger...</h2>
      <p>check email pls</p>
      <EmailField></EmailField>
      <input type="submit" value="Send email" />
      <div className={classes.links}>
        <a onClick={() => onLogin()}>Login</a>
      </div>
    </form>
  );
};

export default ForgotPassword;
