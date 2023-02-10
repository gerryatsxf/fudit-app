import React from "react";
import classes from './EmailField.module.scss'

interface EmailFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
    setError: any;
    isValid: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, error, setError, isValid }) => {
    return (
        <div className={classes.emailContainer}>
            <input
                type="text"
                id="email"
                value={value}
                onChange={(event) => {
                    setError("");
                    //@ts-ignore
                    if (!isValid(event.target.value)) {
                      setError("Invalid email");
                    }
                    onChange(event);
                  }}
                placeholder="Email"
            />
            <span className={classes.invalidEmailErrorMsg}>{error}</span>
        </div>
    );
}

export default EmailField