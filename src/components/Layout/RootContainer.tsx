import React from "react"
import classes from './RootContainer.module.scss'
import Router from "../UI/Router"

const RootContainer = (props: any) => {
    return (
        <div className={classes.rootContainer}>
            <Router></Router>
        </div>
    )
}

export default RootContainer