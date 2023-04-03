import React, {useContext} from "react";
import classes from './EmailField.module.scss'
import {RegisterContext} from "./UserAuthContainer";

interface LastNameFieldProps {}

const LastNameField: React.FC<LastNameFieldProps> = () => {
    const registerCtx = useContext(RegisterContext);
    const lastName = registerCtx.lastName;
    const lastNameError = registerCtx.lastNameError;
    const setLastName = registerCtx.setLastName;
    const setLastNameError = registerCtx.setLastNameError;
    const isEmpty = registerCtx.isEmptyName;
    const isValid = registerCtx.isValidName;
    return (
        <div className={classes.emailContainer}>
            <input
                type="text"
                value={lastName}
                onChange={(event) => {
                    setLastNameError("");
                    //@ts-ignore
                    if (!isValid(event.target.value) && !isEmpty(event.target.value)) {
                        setLastNameError("Invalid name");
                    }
                    setLastName(event.target.value);
                }}
                placeholder="Last name"
            />
            <span className={classes.invalidEmailErrorMsg}>{lastNameError}</span>
        </div>
    );
}

export default LastNameField