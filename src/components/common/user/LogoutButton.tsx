import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../layout/RootContainer";
import styles from "./LogoutButton.module.scss";
import { BrowserAppContext } from "../../../App";

const LogoutButton = () => {
  const navigate = useNavigate();
  const userCtx = React.useContext(UserContext);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
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
