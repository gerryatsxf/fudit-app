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
import { BrowserAppContext } from "../../App";

function FuditApp() {
  const navigationCtx = React.useContext(NavigationContext);
  const navigationMap = navigationCtx.navigationMap;
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const setNavigationMap = navigationCtx.setNavigationMap;

  Object.keys(navigationMap).forEach((key: string) => {
    //@ts-ignore
    navigationMap[key] = window.location.pathname.includes(key);
  });

  const navigate = useNavigate();
  const loadingCtx = React.useContext(FuditLoadingContext);
  const userCtx = React.useContext(UserContext);
  const isMyAccount = window.location.pathname.includes("/app/my-account");
  useEffect(() => {
    if (userCtx.user === null) {
      navigate(`/${BASE_PATH}/app/`);
      return;
    }
    setNavigationMap(navigationMap);
  }, [userCtx.user, navigate, navigationMap, setNavigationMap]);

  if (loadingCtx.loading) {
    return <LoadingIndicator></LoadingIndicator>;
  } else if (isMyAccount) {
    return (
      <div className={styles.fuditAppContainer}>
        <br />
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
                onClick={() => navigate(`/${BASE_PATH}/app/dietary-plans`)}
              >
                Dietary Plans
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${
                  navigationMap["/app/meals"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate(`/${BASE_PATH}/app/meals`)}
              >
                Meals
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${
                  navigationMap["/app/recipes"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate(`/${BASE_PATH}/app/recipes`)}
              >
                Recipes
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${
                  navigationMap["/app/foods"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate(`/${BASE_PATH}/app/foods`)}
              >
                Foods
              </button>
            </li>
            <li className={styles.settingsBtn}>
              <button
                className={`nav-button ${
                  navigationMap["/app/settings"] ? styles.navButtonActive : ""
                }`}
                onClick={() => navigate(`/${BASE_PATH}/app/settings`)}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <br />
        <Outlet />
      </div>
    );
  }
}

export default FuditApp;
