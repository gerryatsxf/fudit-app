import React, { Fragment } from "react";
import classes from "./Header.module.scss";
import HeaderUserButton from "./HeaderUserButton";
import { UserContext } from "./RootContainer";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const userCtx = React.useContext(UserContext);
  const navigate = useNavigate();
  const loggedInBadge = (user: any | null) => {
    if (user !== null) {
      return <HeaderUserButton></HeaderUserButton>;
    }
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <span className={classes.headerModule} onClick={()=>{navigate('/app')}}>
          <span className={classes.headerModuleId}>id</span>entity
        </span>
        {loggedInBadge(userCtx.user)}
      </header>
    </Fragment>
  );
};

export default Header;
