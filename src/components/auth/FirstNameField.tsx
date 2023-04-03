import React, {useContext} from "react";
import classes from './EmailField.module.scss'
import {RegisterContext} from "./UserAuthContainer";

interface FirstNameFieldProps {}

const FirstNameField: React.FC<FirstNameFieldProps> = () => {
    const registerCtx = useContext(RegisterContext);
    const firstName = registerCtx.firstName;
    const firstNameError = registerCtx.firstNameError;
    const setFirstName = registerCtx.setFirstName;
    const setFirstNameError = registerCtx.setFirstNameError;
    const isEmpty = registerCtx.isEmptyName;
    const isValid = registerCtx.isValidName;
    return (
        <div className={classes.emailContainer}>
            <input
                type="text"
                value={firstName}
                onChange={(event) => {
                    setFirstNameError("");
                    //@ts-ignore
                    if (!isValid(event.target.value) && !isEmpty(event.target.value)) {
                        setFirstNameError("Invalid name");
                    }
                    setFirstName(event.target.value);
                  }}
                placeholder="First name"
            />
            <span className={classes.invalidEmailErrorMsg}>{firstNameError}</span>
        </div>
    );
}

export default FirstNameField