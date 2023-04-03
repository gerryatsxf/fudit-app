import React, { Fragment } from "react";
import classes from "./Header.module.scss";
import HeaderUserButton from "./HeaderUserButton";
import { UserContext } from "./RootContainer";
const Header = () => {
  const userCtx = React.useContext(UserContext);

  const loggedInBadge = (user: any | null) => {
    if (user !== null) {
      return <HeaderUserButton></HeaderUserButton>;
    }
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <span className={classes.headerModule}>
          <span className={classes.headerModuleId}>id</span>entity
        </span>
        {loggedInBadge(userCtx.user)}
      </header>
    </Fragment>
  );
};

export default Header;
