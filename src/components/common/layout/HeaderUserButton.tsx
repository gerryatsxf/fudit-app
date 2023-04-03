import React from 'react'
import classes from './HeaderUserButton.module.scss'
import userIcon from '../../../assets/user.svg'
import {UserContext} from "./RootContainer";
const HeaderUserButton = (props: any) => {
    const userCtx = React.useContext(UserContext);
    const user = userCtx.user ? userCtx.user : {firstName: '', lastName: ''};
    return (
        <button className={classes.button}>
            <span>
                <img src={userIcon} className={classes.icon} alt='User icon'/>
            </span>
            <span>{user.firstName} {user.lastName}</span>
        </button>
    )
}

export default HeaderUserButton