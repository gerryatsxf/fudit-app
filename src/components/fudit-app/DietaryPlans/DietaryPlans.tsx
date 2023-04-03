import React from "react";
import styles from "./DietaryPlans.module.scss";

function DietaryPlans() {
  const plans = [
    "Vegetarian",
    "Vegan",
    "Ketogenic",
    "Paleo",
    "Gluten-free",
    "Low-carb",
    "Intermittent fasting",
    "Mediterranean",
    "DASH",
    "Flexitarian",
  ];

  return (
    <div>
      <h2 className={styles.title}>Dietary Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan}>{plan}</li>
        ))}
      </ul>
    </div>
  );
}

export default DietaryPlans;
