import "./App.css";
import React, { Fragment } from "react";
import RootContainer from "./components/common/layout/RootContainer";

export const BrowserAppContext = React.createContext<any>({
  browserApp: false,
  setBrowserApp: () => {},
  basePath: "",
  setBasePath: () => {},
});

function App() {
  const [browserApp, setBrowserApp] = React.useState(false);
  const [basePath, setBasePath] = React.useState("fudit-app");
  return (
    <Fragment>
      <BrowserAppContext.Provider
        value={{ browserApp, setBrowserApp, basePath, setBasePath }}
      >
        <RootContainer></RootContainer>
      </BrowserAppContext.Provider>
    </Fragment>
  );
}

export default App;
