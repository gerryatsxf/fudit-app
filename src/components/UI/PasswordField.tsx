import React, { useState } from 'react'
import classes from './PasswordField.module.scss'


const PassworldField = (props: any) => {
    const [type, setType] = useState("password");
    const [text, setText] = useState("Show");
    
    function handleMouseDown() {
      setType("text");
      setText("Hide");
    }
    
    function handleMouseUp() {
      setType("password");
      setText("Show");
    }
    
    return (
        <div className={classes.passwordContainer}>
            <input type={type} id="password" placeholder="Password" />
            <button 
                className={classes.togglePassword} 
                type="button"         
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                {text} 
            </button>
        </div>
    );
}

export default PassworldField