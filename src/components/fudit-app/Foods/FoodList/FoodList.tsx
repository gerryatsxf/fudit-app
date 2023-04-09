import React from "react";
import styles from "./FoodList.module.scss";
import FoodListItem from "../FoodListItem/FoodListItem";

// @ts-ignore
const FoodList = ({ foods }) => {
  return (
    <div className={styles.foodList}>
      {foods.map((food: any) => (
        <FoodListItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
