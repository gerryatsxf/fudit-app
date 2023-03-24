import React from 'react'
import classes from './HeaderUserButton.module.scss'
import user from '../../../assets/user.svg'
const HeaderUserButton = (props: any) => {
    return (
        <button className={classes.button}>
            <span>
                <img src={user} className={classes.icon} alt='User icon'/>
            </span>
            <span>Gerry</span>
        </button>
    )
}

export default HeaderUserButton