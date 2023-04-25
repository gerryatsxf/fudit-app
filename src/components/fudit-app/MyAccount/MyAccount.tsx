import React from "react";
import { UserContext } from "../../common/layout/RootContainer";
import LogoutButton from "../../common/user/LogoutButton";

import styles from "./MyAccount.module.scss";

const MyAccount = () => {
  const userCtx = React.useContext(UserContext);
  const user = userCtx.user
    ? userCtx.user
    : { firstName: "", lastName: "", email: "", dateOfBirth: "" };
  return (
    <div className={styles.myAccountContainer}>
      <h2>My Account</h2>
      <p>First name: {user.firstName}</p>
      <p>Last name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Date of birth: {user.dateOfBirth}</p>
      <br></br>
      <LogoutButton></LogoutButton>
    </div>
  );
};
export default MyAccount;
