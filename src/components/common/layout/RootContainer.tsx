import React, {createContext, Fragment, useState} from "react"
import classes from './RootContainer.module.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserAuthContainer from "../../auth/UserAuthContainer";
import BootstrapContainer from "../bootstrap/BootstrapContainer";
import FuditApp from "../../fudit-app/FuditApp";
import Header from "./Header";

export const UserContext = createContext({user: null, setUser: (user: any) => {}});
export const FuditLoadingContext = createContext({loading: true, setLoading: (loading: boolean) => {}});

const RootContainer = (props: any) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <UserContext.Provider value={{user, setUser}}>
                <FuditLoadingContext.Provider value={{loading, setLoading}}>
                    <Header></Header>
                    <div className={classes.rootContainer}>
                        <Router>
                            <Fragment>
                                <Routes>
                                    <Route path='/' element={<BootstrapContainer/>}/>
                                    <Route path='/login' element={<UserAuthContainer/>}/>
                                    <Route path='/register' element={<UserAuthContainer/>}/>
                                    <Route path='/forgot-password' element={<UserAuthContainer/>}/>
                                    <Route path='/app' element={<FuditApp/>}/>
                                </Routes >
                            </Fragment>
                        </Router>
                    </div>
                </FuditLoadingContext.Provider>
            </UserContext.Provider>
        </div>

    )
}

export default RootContainer