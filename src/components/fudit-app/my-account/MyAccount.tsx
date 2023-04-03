import React from "react";
import { UserContext } from "../../common/layout/RootContainer";
import LogoutButton from "../LogoutButton/LogoutButton";

const MyAccount = () => {
  const userCtx = React.useContext(UserContext);
  console.log('inside my account', userCtx.user)
  const user = userCtx.user ? userCtx.user : { firstName: "", lastName: "", email: "", dateOfBirth: "" };
  return (
    <div>
      <br></br>
      <h2>My Account</h2>
      <p>First name: {user.firstName}</p>
      <p>Last name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Date of birth: {user.dateOfBirth}</p>
      <br></br>
      <p>In case you need to go out:</p>
      <LogoutButton></LogoutButton>
    </div>
  )
}
export default MyAccount;