import React from 'react'
import classes from './Login.module.scss'

const Login = (props: any) => {
    return (
        <form className={classes.login}>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <input type="text" placeholder="User Name" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Log In" />
        <div className={classes.links}>
            <a href="#">Forgot password</a>
            <a href="#">Register</a>
        </div>
        </form>
    )
}

export default Login