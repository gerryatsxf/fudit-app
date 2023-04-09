import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FoodListItem.module.scss";
// @ts-ignore
const FoodListItem = ({ food  }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/foods/${food.id}`);
  };

  return (
    <div className={styles.food}>
      <a
        className={styles.nameLink}
        href={`/app/foods/${food.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        {food.name}
      </a>
    </div>
  );
};

export default FoodListItem;