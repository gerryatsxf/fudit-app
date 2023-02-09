import React, { Fragment } from 'react'
import classes from './Header.module.scss'
import HeaderUserButton from './HeaderUserButton'
const Header = (props: any) => {
    return <Fragment>
        <header className={classes.header} >
            <span className={classes.headerModule}>
                <span className={classes.headerModuleId}>id</span>entity
            </span>
            <HeaderUserButton></HeaderUserButton>
        </header>
    </Fragment>
}

export default Header