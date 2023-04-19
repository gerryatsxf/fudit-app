import React from "react";
import styles from "./RecipePortionsListItem.module.scss";

// @ts-ignore
const RecipePortionsListItem = ({ portion }) => {
  return (
    <div className={styles.portionListItem}>
      <p>
        ({portion.quantity} {portion.units.name}) - {portion.food.name}
      </p>
    </div>
  );
};

export default RecipePortionsListItem;
