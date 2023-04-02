import React, {useContext, useState} from 'react'
import classes from './PasswordField.module.scss'
import Eye from '../common/icons/Eye'
import EyeSlash from '../common/icons/EyeSlash'
import {AuthContext} from "./UserAuthContainer";
interface PasswordFieldProps {
}

const PasswordField: React.FC<PasswordFieldProps> = () => {
  const authCtx = useContext(AuthContext);
  const value = authCtx.password;
  const setPassword = authCtx.setPassword;
  const [type, setType] = useState("password");
  const [eyeSlash, setEyeSlash] = useState("Show");
  
  function handleMouseDown() {
    setType("text");
    setEyeSlash("Hide");
  }
  
  function handleMouseUp() {
    setType("password");
    setEyeSlash("Show");
  }

  function getEyeSlash(){
    return (
      <EyeSlash></EyeSlash>
    )
  }

  function getEye(){
    return (
      <Eye></Eye>
    )
  }
  
  return (
    <div className={classes.passwordContainer}>
      <input 
        type={type} 
        id="password" 
        placeholder="Password" 
        value={value}
        onChange={(event) => {
            setPassword(event.target.value);
          }
        }
      />
      <button 
        className={classes.togglePassword} 
        type="button"         
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        { eyeSlash === 'Hide' ? getEye() : getEyeSlash() }
      </button>
    </div>
  );
}

export default PasswordField