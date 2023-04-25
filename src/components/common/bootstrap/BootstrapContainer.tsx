import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { FuditLoadingContext, UserContext } from "../layout/RootContainer";
import { Configuration, ConfigurationParameters, UsersApi } from "../../../api";
import { BrowserAppContext } from "../../../App";

function BootstrapContainer() {
  const navigate = useNavigate();
  const loadingCtx = React.useContext(FuditLoadingContext);
  const userCtx = React.useContext(UserContext);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;

  useEffect(() => {
    const token = localStorage.getItem("fudit_access_token");
    console.log("Access token found in local storage: ", token);

    if (token === null) {
      loadingCtx.setLoading(false);
      navigate(`/${BASE_PATH}/login`);
      console.log("Navigating to login");
      return;
    }

    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const usersApi = new UsersApi(new Configuration(config));

    usersApi
      .usersControllerGetProfile()
      .then((response) => {
        //@ts-ignore
        userCtx.setUser(response.data.data.user);
        userCtx.setToken(token);
        navigate(`/${BASE_PATH}/app`);
      })
      .catch((error) => {
        console.error("There was an error while validating token.", error);
        navigate(`/${BASE_PATH}/login`);
      })
      .finally(() => {
        loadingCtx.setLoading(false);
      });
  }, [loadingCtx, userCtx, navigate]);

  return <LoadingIndicator></LoadingIndicator>;
}

export default BootstrapContainer;
