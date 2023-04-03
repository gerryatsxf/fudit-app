import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../layout/RootContainer";

const LogoutButton = () => {
  const navigate = useNavigate();
  const userCtx = React.useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("fudit_access_token");
    userCtx.setUser(null);
    navigate("/");
  };
  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
