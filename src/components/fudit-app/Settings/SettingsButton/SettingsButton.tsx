import React from 'react';
import { FaCog } from 'react-icons/fa';

const SettingsButton = () => {
  const onClick = () => {
    console.log('Settings button clicked');
  }
  return (
    <button onClick={onClick}>
      <FaCog /> Settings
    </button>
  );
};

export default SettingsButton;
