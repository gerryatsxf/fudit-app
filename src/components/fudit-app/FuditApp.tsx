import User from "./user/User";
import React, {useEffect} from 'react';
import LoadingIndicator from "../common/bootstrap/LoadingIndicator";
import {useNavigate} from "react-router-dom";
import {FuditLoadingContext, UserContext} from "../common/layout/RootContainer";

function FuditApp(){

    const navigate = useNavigate();
    const loadingCtx = React.useContext(FuditLoadingContext);
    const userCtx = React.useContext(UserContext);

    useEffect(() => {
        console.log('FuditApp',userCtx.user)
        if(userCtx.user === null){
            navigate("/");
            return;
        }
    }, [userCtx.user, navigate]);

    if(loadingCtx.loading){
        return (
            <LoadingIndicator></LoadingIndicator>
        )
    } else {
        return (
            <div>
                <h2>My App</h2>
                <p>Welcome to my app!</p>
                <User/>
            </div>
        );
    }
}

export default FuditApp;