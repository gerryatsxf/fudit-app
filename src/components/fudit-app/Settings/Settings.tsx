import React from "react";
import styles from "./Settings.module.scss";
import SettingsButton from "./SettingsButton/SettingsButton";

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Settings</h2>
      <p>These are your app params. Ahoy!</p>
      <br/>
      <SettingsButton></SettingsButton>
    </div>
  );
};

export default Settings;
