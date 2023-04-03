import React, { useEffect } from "react";
import styles from "../DietaryPlans/DietaryPlans.module.scss";

const Meals = () => {
  const [meals, setMeals] = React.useState([]);
  const getMeals = async () => {
    const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
    return meals;
  };

  useEffect(() => {
    const loadMeals = async () => {
      const meals = await getMeals();
      //@ts-ignore
      setMeals(meals);
    };
    loadMeals();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>Meals</h2>

      {meals}
    </div>
  );
};

export default Meals;
