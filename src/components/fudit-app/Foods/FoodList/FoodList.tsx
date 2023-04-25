import React from "react";
import styles from "./FoodList.module.scss";
import FoodListItem from "../FoodListItem/FoodListItem";
// import { foodsContext } from "../Recipes";

type FoodListProps = {
  foods: any[];
  setFoods: (newFoods: any) => void;
};

// @ts-ignore
const FoodList = ({ foods, setFoods }: FoodListProps) => {
  // const foodsCtx = React.useContext(foodsContext);
  // const { setFoods: contextSetFoods } = React.useContext(foodsContext);
  return (
    <div className={styles.foodList}>
      {foods.map((food: any) => (
        <FoodListItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
