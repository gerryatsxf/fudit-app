import React, { useEffect } from "react";
import styles from "./Meals.module.scss";
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
    <div className={styles.mealsContainer}>
      <h2>Meals</h2>

      {meals}
    </div>
  );
};

export default Meals;
