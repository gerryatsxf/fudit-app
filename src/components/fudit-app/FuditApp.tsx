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
  const navigationMap = navigationCtx.navigationMap;
  const setNavigationMap = navigationCtx.setNavigationMap;

  Object.keys(navigationMap).forEach((key: string) => {
    //@ts-ignore
    navigationMap[key] = key === window.location.pathname;
  });
  setNavigationMap(navigationMap);

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
        <br/>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className={styles.fuditAppContainer}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <button
                className={`nav-button ${
                  navigationMap["/app/dietary-plans"]
                    ? styles.navButtonActive
                    : ""
                }`}
                onClick={() => navigate("/app/dietary-plans")}
              >
                Dietary Plans
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${
                  navigationMap["/app/meals"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate("/app/meals")}
              >
                Meals
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${
                  navigationMap["/app/foods"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate("/app/foods")}
              >
                Foods
              </button>
            </li>
            <li className={styles.settingsBtn}>
              <button
                className={`nav-button ${
                  navigationMap["/app/settings"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate("/app/settings")}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <br/>
        <Outlet />
      </div>
    );
  }
}

export default FuditApp;
