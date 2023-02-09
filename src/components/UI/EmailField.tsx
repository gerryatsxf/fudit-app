import React, { useState } from "react";
import classes from './EmailField.module.scss'

interface State {
  email: string;
  emailError: string;
}

const EmailField = (props: any) => {

    const [state, setState] = useState<State>({
        email: "",
        emailError: ""
    });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const email = event.currentTarget.value;
        const isValid = validateEmail(email);
        setState({
          email,
          emailError: isValid ? "" : "Invalid email address"
        });
    };
    
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };
  
    return (
        <div className={classes.emailContainer}>
            <input
                type="text"
                id="email"
                value={state.email}
                onChange={handleEmailChange}
                placeholder="Email"
            />
            <span className={classes.invalidEmailErrorMsg}>{state.emailError}</span>
        </div>
    );
}

export default EmailField