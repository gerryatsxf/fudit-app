import React from "react";
import classes from "./HeaderUserButton.module.scss";
import userIcon from "../../../assets/user.svg";
import { UserContext } from "./RootContainer";
import { useNavigate } from "react-router-dom";
import { BrowserAppContext } from "../../../App";

const HeaderUserButton = (props: any) => {
  const navigate = useNavigate();
  const userCtx = React.useContext(UserContext);
  const user = userCtx.user ? userCtx.user : { firstName: "", lastName: "" };
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  return (
    <button
      className={classes.button}
      onClick={() => {
        navigate(`/${BASE_PATH}/app/my-account`);
      }}
    >
      <span>
        <img src={userIcon} className={classes.icon} alt="User icon" />
      </span>
      <span>
        {user.firstName} {user.lastName}
      </span>
    </button>
  );
};

export default HeaderUserButton;
