import React, {useEffect, useState} from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import {FuditLoadingContext, UserContext} from "../common/layout/RootContainer";

const authViewCtx = React.createContext({view: '', setView: (view: string) => {}});

const UserAuthContainer: React.FC = () => {
  
  const isValidEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) 
  const isEmptyEmail = (email: string) => email === '';

  // TODO: REDIRECT TO APP IF ACCESS TOKEN IS PRESENT

  const LOGIN = 'login'
  const REGISTER = 'register'
  const FORGOT = 'forgot-password'
  const navigate = useNavigate();
  const [view, setView] = useState(LOGIN);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(isValidEmail(email) || isEmptyEmail(email) ? "" : "Invalid email");
  const [accessToken, setAccessToken] = useState(null);

  const userCtx = React.useContext(UserContext);
  const loadingCtx = React.useContext(FuditLoadingContext);

  useEffect(() => {

    const token = localStorage.getItem('fudit_access_token');
    console.log('Access token found in local storage: ', token)

    // if (token !== null) {
    //   // loadingCtx.setLoading(false);
    //   navigate("/");
    //   return;
    // } else {
    //   loadingCtx.setLoading(false);
    // }
    //
    // const config: ConfigurationParameters = {basePath:'http://localhost:3002',accessToken: `${token}`};
    // const usersApi = new UsersApi(new Configuration(config));
    //
    // usersApi.usersControllerGetProfile().then((response) => {
    //   //@ts-ignore
    //   userCtx.setUser(response.data.data.user)
    //   navigate("/app")
    // }).catch((error) => {
    //   console.error('There was an error while validating token.', error);
    //   navigate("/login");
    // })
    // .finally(() => {
    //   loadingCtx.setLoading(false);
    // });

  }, [loadingCtx, userCtx, navigate]);



  // if (loadingCtx.loading) {
  //   return (
  //       <LoadingIndicator></LoadingIndicator>
  //   );
  // } else
    if (view === REGISTER) {
    return <Register 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      setAccessToken={setAccessToken}
      // @ts-ignore
      onLogin={({ email, password }) => setView(LOGIN) & setEmail(email) & setPassword(password)}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
      navigate={navigate}
    />;
  } else if (view === LOGIN) {
    return <Login 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      setAccessToken={setAccessToken}
        // @ts-ignore
      onRegister={({ email, password }) => setView(REGISTER) & setEmail(email) & setPassword(password)} 
      // @ts-ignore
      onForgot={({ email }) => setView(FORGOT) & setEmail(email)} 
      emailError={emailError}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
      navigate={navigate}
    />;
  } else if (view === FORGOT) {
    console.log(FORGOT)
    return <ForgotPassword 
      email={email} 
      setEmail={setEmail}
      emailError={emailError}
      // @ts-ignore
      onLogin={({ email, password }) => setView(LOGIN) & setEmail(email) & setPassword(password)}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
    />;
  } else {
    return <Login 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      // @ts-ignore
      onRegister={({ email, password }) => setView(REGISTER) & setEmail(email) & setPassword(password)} 
      emailError={emailError}
      setEmailError={setEmailError}
      isValidEmail={isValidEmail}
      isEmptyEmail={isEmptyEmail}
      navigate={navigate}
    />;
  }
    

};
  
export default UserAuthContainer;