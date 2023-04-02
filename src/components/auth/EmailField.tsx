import React, {useContext} from "react";
import classes from './EmailField.module.scss'
import {AuthContext} from "./UserAuthContainer";

interface EmailFieldProps {}

const EmailField: React.FC<EmailFieldProps> = () => {
    const authCtx = useContext(AuthContext);
    const email = authCtx.email;
    const setEmail = authCtx.setEmail;
    const emailError = authCtx.emailError;
    const setEmailError = authCtx.setEmailError;
    const isValid = authCtx.isValidEmail;
    const isEmpty = authCtx.isEmptyEmail;
    return (
        <div className={classes.emailContainer}>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => {
                    setEmailError("");
                    console.log('on changing')
                    //@ts-ignore
                    if (!isValid(event.target.value) && !isEmpty(event.target.value)) {
                        setEmailError("Invalid email");
                    }
                    setEmail(event.target.value);
                  }}
                placeholder="Email"
            />
            <span className={classes.invalidEmailErrorMsg}>{emailError}</span>
        </div>
    );
}

export default EmailField