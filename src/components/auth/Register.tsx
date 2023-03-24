import React from 'react'
import classes from './Register.module.scss'
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import {Link, useNavigate} from 'react-router-dom';
import {AuthenticationApi, Configuration, ConfigurationParameters, UserRegistrationDto} from "../../api";
import LoadingIndicator from "../common/bootstrap/LoadingIndicator";

const Register: React.FC<any> = ({ email, password, onLogin, setEmail, setPassword, setAccessToken, emailError, setEmailError, isValidEmail, isEmptyEmail, navigate}) => {
    //const navigate = useNavigate();
    const [registerRequestLoading, setRegisterRequestLoading] = React.useState(false);
  function onSubmit(email: string, password: string){
    console.log('Submitting the following pair: ', {email, password})
    createUser(email, password)
  }
  
  function handleSubmit(event: any) {
    event.preventDefault();

    onSubmit(email, password);
  }

  function createUser(email: string, password: string){
      setRegisterRequestLoading(true);
      const config: ConfigurationParameters = {basePath: `http://localhost:3002`};
      const authApi = new AuthenticationApi(new Configuration(config))
      const requestBody: UserRegistrationDto = {
          email: Math.random() + email, // TODO: REMOVE RANDOM NUMBER GENERATION AFTER TESTING IS FINISHED
          password: password,
          dateOfBirth: '2022',
          firstName: '',
          lastName: ''
      }

      authApi.authControllerRegister(requestBody).then((response) => {
          console.log('Registration successful.', response.data)
          //@ts-ignore
          localStorage.setItem('fudit_access_token', response.data.access_token)
          console.log('Access token saved to local storage.')
          navigate("/");
      }).catch((error) => {
          console.error('There was an error while validating registering user.', error);
      })
      // TODO: UNCOMMENT WHEN LOADING INDICATOR FOR REGISTER HAS BEEN IMPLEMENTED
      .finally(() => {
          setRegisterRequestLoading(false);
      });
  }

  if(registerRequestLoading){
      return (
          <LoadingIndicator></LoadingIndicator>
      )
  }

  return (
    <form className={classes.register} onSubmit={handleSubmit}>
      <h2>Hi, stranger...</h2>
      <p>register pls</p>
      <EmailField
        value={email}
        onChange={(event) => {
          //@ts-ignore
          setEmail(event.target.value);
        }}
        error={emailError}
        setError={setEmailError}
        isValid={isValidEmail}
        isEmpty={isEmptyEmail}
      ></EmailField>
      <PasswordField
        value={password}
        onChange={(event) => {
          //@ts-ignore
          setPassword(event.target.value);
        }}
      ></PasswordField>
      <input type="submit" value="Register" />
      <div className={classes.links}>
        <Link to='/' onClick={() => onLogin({ email, password })}>
          Login
        </Link>
      </div>
    </form>
  )
}

export default Register