import React, { createContext, Fragment, useState } from "react";
import classes from "./RootContainer.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthContainer from "../../auth/UserAuthContainer";
import BootstrapContainer from "../bootstrap/BootstrapContainer";
import FuditApp from "../../fudit-app/FuditApp";
import Header from "./Header";
import MyAccount from "../../fudit-app/my-account/MyAccount";

export const UserContext = createContext({
  user: null,
  setUser: (user: any) => {},
});
export const FuditLoadingContext = createContext({
  loading: true,
  setLoading: (loading: boolean) => {},
});
export const AuthViewContext = React.createContext({
  authView: "",
  setAuthView: (authView: string) => {},
});

const RootContainer = (props: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState("");

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <FuditLoadingContext.Provider value={{ loading, setLoading }}>
          <AuthViewContext.Provider value={{ authView, setAuthView }}>
            <Router>
            <Header></Header>
            <div className={classes.rootContainer}>
              {/*<Router>*/}
                <Fragment>
                  <Routes>
                    <Route path="/" element={<BootstrapContainer />} />
                    <Route path="login" element={<UserAuthContainer />} />
                    <Route path="register" element={<UserAuthContainer />} />
                    <Route path="forgot-password" element={<UserAuthContainer />} />
                    <Route path="app" element={<FuditApp />}>
                      <Route path="my-account" element={<MyAccount />} />
                    </Route>
                  </Routes>
                </Fragment>
              {/*</Router>*/}
            </div>
            </Router>
          </AuthViewContext.Provider>
        </FuditLoadingContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default RootContainer;
