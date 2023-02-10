import React, { Fragment } from "react"
import classes from './RootContainer.module.scss'
import { BrowserRouter as Router, Routes , Route, Link } from 'react-router-dom';
import UserAuthContainer from "../UI/UserAuthContainer";

const RootContainer = (props: any) => {
    return (
        <div className={classes.rootContainer}>
            <Router>
                <Fragment>
                    <Routes>
                        <Route path='/' element={<UserAuthContainer/>}/>
                        <Route path='/register' element={<UserAuthContainer/>}/>
                        <Route path='/forgot-password' element={<UserAuthContainer/>}/>
                    </Routes >
                </Fragment>
            </Router>
        </div>
    )
}

export default RootContainer