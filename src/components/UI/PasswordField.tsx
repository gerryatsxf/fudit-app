import React, { useState } from 'react'
import classes from './PasswordField.module.scss'
import eyeIcon from '../../assets/eye-solid.svg'
import eyeSlashIcon from '../../assets/eye-slash-solid.svg'

interface PasswordFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange }) => {
    
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
      <span>
          <img src={eyeSlashIcon} className={classes.icon} alt='User icon'/>
      </span>
    )
  }

  function getEye(){
    return (
      <span>
          <img src={eyeIcon} className={classes.icon} alt='User icon'/>
      </span>
    )
  }
  
  return (
    <div className={classes.passwordContainer}>
      <input 
        type={type} 
        id="password" 
        placeholder="Password" 
        value={value}
        onChange={onChange}
      />
      <button 
        className={classes.togglePassword} 
        type="button"         
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        { eyeSlash == 'Hide' ? getEye() : getEyeSlash() }
      </button>
    </div>
  );
}

export default PasswordField