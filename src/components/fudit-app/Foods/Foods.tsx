import React, { useEffect, useState } from "react";
import styles from "./Foods.module.scss";

export const FoodsContext = React.createContext({
  foods: [],
}
);

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
    <div className={styles.foodsContainer}>
      <h2 className={styles.title}>Foods</h2>
      {foods.map((food: any) => (
        <p>{food}</p>
      ))}
    </div>
  );
};
export default Foods;
