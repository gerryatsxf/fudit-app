import React, { useContext } from "react";
import classes from "./Register.module.scss";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import { useNavigate } from "react-router-dom";
import {
  AuthenticationApi,
  Configuration,
  ConfigurationParameters,
  UserRegistrationDto,
} from "../../api";
import LoadingIndicator from "../common/bootstrap/LoadingIndicator";
import { AuthContext, RegisterContext } from "./UserAuthContainer";
import FirstNameField from "./FirstNameField";
import LastNameField from "./LastNameField";
import { BrowserAppContext } from "../../App";

const Register: React.FC<any> = () => {
  const navigate = useNavigate();
  const [registerRequestLoading, setRegisterRequestLoading] =
    React.useState(false);
  const authCtx = useContext(AuthContext);
  const registerCtx = useContext(RegisterContext);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;

  const firstName = registerCtx.firstName;
  const lastName = registerCtx.lastName;
  const email = authCtx.email;
  const password = authCtx.password;
  const onLogin = () => {
    navigate(`/${BASE_PATH}/login`);
  };
  function onSubmit(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    console.log("Submitting the following pair: ", { email, password });
    createUser(firstName, lastName, email, password);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(firstName, lastName, email, password);
  }

  function createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    setRegisterRequestLoading(true);
    const config: ConfigurationParameters = {
      basePath: `http://localhost:3002`,
    };
    const authApi = new AuthenticationApi(new Configuration(config));
    const requestBody: UserRegistrationDto = {
      email: Math.random() + email, // TODO: REMOVE RANDOM NUMBER GENERATION AFTER TESTING IS FINISHED
      password: password,
      dateOfBirth: "2022",
      firstName: firstName,
      lastName: lastName,
    };

    authApi
      .authControllerRegister(requestBody)
      .then((response) => {
        console.log("Registration successful.", response.data);
        //@ts-ignore
        localStorage.setItem("fudit_access_token", response.data.access_token);
        console.log("Access token saved to local storage.");
        navigate(`/${BASE_PATH}/`);
      })
      .catch((error) => {
        console.error(
          "There was an error while validating registering user.",
          error
        );
      })
      // TODO: UNCOMMENT WHEN LOADING INDICATOR FOR REGISTER HAS BEEN IMPLEMENTED
      .finally(() => {
        setRegisterRequestLoading(false);
      });
  }

  if (registerRequestLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <form className={classes.register} onSubmit={handleSubmit}>
      <h2>Hi, stranger...</h2>
      <p>register pls</p>
      <FirstNameField></FirstNameField>
      <LastNameField></LastNameField>
      <EmailField></EmailField>
      <PasswordField></PasswordField>
      <input type="submit" value="Register" />
      <div className={classes.links}>
        <a onClick={() => onLogin()}>Login</a>
      </div>
    </form>
  );
};

export default Register;
