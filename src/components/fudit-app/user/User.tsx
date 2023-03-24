import React from 'react';
import {UserContext} from "../../common/layout/RootContainer";

function User() {
    const userCtx = React.useContext(UserContext);
    // @ts-ignore
    const {firstName, email, lastName, dateOfBirth} = userCtx.user;
    return (
        <div>
            <h2>User Info</h2>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Date of Birth: {dateOfBirth}</p>
        </div>
    );
}

export default User;
