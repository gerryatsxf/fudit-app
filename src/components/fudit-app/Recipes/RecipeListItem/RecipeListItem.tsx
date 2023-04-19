import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecipeListItem.module.scss";
// @ts-ignore
const RecipeListItem = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/recipes/${recipe.id}`);
  };

  return (
    <div className={styles.recipe}>
      <a
        className={styles.nameLink}
        href={`/app/recipes/${recipe.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        {recipe.name}
      </a>
    </div>
  );
};

export default RecipeListItem;
