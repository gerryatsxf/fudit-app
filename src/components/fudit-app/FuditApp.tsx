import styles from "./FuditApp.module.scss";
import React, { useEffect } from "react";
import LoadingIndicator from "../common/bootstrap/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import {
  FuditLoadingContext,
  NavigationContext,
  UserContext,
} from "../common/layout/RootContainer";
import { Outlet } from "react-router-dom";

function FuditApp() {
  const navigationCtx = React.useContext(NavigationContext);
  const navigation = navigationCtx.navigation;
  const userInSettings = window.location.pathname.includes("/app/in-settings");

  const navigate = useNavigate();
  const loadingCtx = React.useContext(FuditLoadingContext);
  const userCtx = React.useContext(UserContext);
  const isMyAccount = window.location.pathname.includes("/app/my-account");
  useEffect(() => {
    console.log("FuditApp", userCtx.user);
    if (userCtx.user === null) {
      navigate("/");
      return;
    }
  }, [userCtx.user, navigate]);

  if (loadingCtx.loading) {
    return <LoadingIndicator></LoadingIndicator>;
  } else if (isMyAccount) {
    return (
      <div className={styles.fuditAppContainer}>
        <h2>Recipe Helper app</h2>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className={styles.fuditAppContainer}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <button onClick={() => navigate("/app/dietary-plans")}>
                Dietary Plans
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/app/meals")}>Meals</button>
            </li>
            <li>
              <button onClick={() => navigate("/app/foods")}>Foods</button>
            </li>
            <li className={styles.settingsBtn}>
              <button onClick={() => navigate("/app/settings")}>
                Settings
              </button>
            </li>
          </ul>
        </nav>

        <h2>Recipe Helper app</h2>

        <Outlet />
      </div>
    );
  }
}

export default FuditApp;
