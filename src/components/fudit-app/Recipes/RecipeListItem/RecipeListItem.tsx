import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecipeListItem.module.scss";
import { BrowserAppContext } from "../../../../App";
// @ts-ignore
const RecipeListItem = ({ recipe }) => {
  const navigate = useNavigate();
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;

  const handleClick = () => {
    navigate(`/${BASE_PATH}/app/recipes/${recipe.id}`);
  };

  return (
    <div className={styles.recipe}>
      <a
        className={styles.nameLink}
        href={`/${BASE_PATH}/app/recipes/${recipe.id}`}
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
