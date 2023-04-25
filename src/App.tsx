import "./App.css";
import React, { Fragment } from "react";
import RootContainer from "./components/common/layout/RootContainer";

export const BrowserAppContext = React.createContext<any>({
  browserApp: false,
  setBrowserApp: () => {},
  basePath: "",
  setBasePath: () => {},
});
export const FuditApiContext = React.createContext<any>({
  protocol: "http",
  setProtocol: () => {},
  host: "localhost:3002",
  setHost: () => {},
})
function App() {
  const [browserApp, setBrowserApp] = React.useState(false);
  const [basePath, setBasePath] = React.useState("fudit-app");
  const [protocol, setProtocol] = React.useState("http");
  const [host, setHost] = React.useState("localhost:3002");
  return (
    <Fragment>
      <BrowserAppContext.Provider
        value={{
          browserApp,
          setBrowserApp,
          basePath,
          setBasePath
        }}
      >
        <FuditApiContext.Provider
          value={{
            protocol,
            setProtocol,
            host,
            setHost
          }}
        >

        <RootContainer></RootContainer>
        </FuditApiContext.Provider>
      </BrowserAppContext.Provider>
    </Fragment>
  );
}

export default App;
