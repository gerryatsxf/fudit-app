import React, { useEffect, useState } from "react";
import styles from "../DietaryPlans/DietaryPlans.module.scss";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const getFoods = async () => {
    const foods = [
      "Avocado",
      "Salmon",
      "Kale",
      "Sweet Potato",
      "Quinoa",
      "Greek Yogurt",
      "Blueberries",
      "Almonds",
      "Oatmeal",
      "Dark Chocolate",
    ];
    return foods;
  };
  useEffect(() => {
    const loadFoods = async () => {
      const foods = await getFoods();
      //@ts-ignore
      setFoods(foods);
    };
    loadFoods();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>Foods</h2>
      {foods.map((food: any) => (
        <p>{food}</p>
      ))}
    </div>
  );
};
export default Foods;
