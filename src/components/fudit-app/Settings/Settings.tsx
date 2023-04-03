import styles from "../DietaryPlans/DietaryPlans.module.scss";
import React from "react";
import { NavigationContext } from "../../common/layout/RootContainer";

const Settings = () => {
  return (
    <div>
      <h2 className={styles.title}>Settings</h2>
      <p>These are your app params. Ahoy!</p>
    </div>
  );
};

export default Settings;
