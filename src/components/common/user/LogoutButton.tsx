import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../layout/RootContainer";
import styles from "./LogoutButton.module.scss";
import { BrowserAppContext, FuditApiContext } from "../../../App";

const LogoutButton = () => {
  const navigate = useNavigate();
  const userCtx = React.useContext(UserContext);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const fuditApiCtx = React.useContext(FuditApiContext);
  const PROTOCOL = fuditApiCtx.protocol;
  const HOST = fuditApiCtx.host;
  const logout = () => {
    localStorage.removeItem("fudit_access_token");
    userCtx.setUser(null);
    userCtx.setToken(null);
    navigate(`/${BASE_PATH}/`);
  };
  return (
    <button className={styles.logoutButton} onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
