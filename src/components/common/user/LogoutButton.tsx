import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../layout/RootContainer";
import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const navigate = useNavigate();
  const userCtx = React.useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("fudit_access_token");
    userCtx.setUser(null);
    userCtx.setToken(null);
    navigate("/");
  };
  return (
    <button className={styles.logoutButton} onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
