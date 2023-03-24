import React from 'react';
import { Link } from 'react-router-dom';
import EmailField from './EmailField';
import classes from './ForgotPassword.module.scss'

const ForgotPassword: React.FC<any> = ({email, setEmail, onLogin, emailError, setEmailError, isValidEmail, isEmptyEmail}) => {

    function onSubmit(email: string){
        console.log(email)
    }
    
    function handleSubmit(event: any) {
        event.preventDefault();
        onSubmit(email);
    }
      
    return (
        <form className={classes.forgotPassword} onSubmit={handleSubmit}>
            <h2>Hi, stranger...</h2>
            <p>check email pls</p>
            <EmailField
                value={email}
                onChange={(event) => {
                    //@ts-ignore
                    setEmail(event.target.value);
                }}
                error={emailError}
                setError={setEmailError}
                isValid={isValidEmail}
                isEmpty={isEmptyEmail}
            ></EmailField>
            <input type="submit" value="Send email" />
            <div className={classes.links}>
                <Link to='/' onClick={() => onLogin({ email:'', password:'' })}>
                    Login
                </Link>
            </div>
        </form>  
    )



}

export default ForgotPassword