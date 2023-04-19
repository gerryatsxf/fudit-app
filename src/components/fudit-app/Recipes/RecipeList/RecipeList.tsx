import React from "react";
import styles from "./RecipeList.module.scss";
import RecipeListItem from "../RecipeListItem/RecipeListItem";
// import { recipesContext } from "../Recipes";

type RecipeListProps = {
  recipes: any[];
  setRecipes: (newRecipes: any) => void;
};

// @ts-ignore
const RecipeList = ({ recipes, setRecipes }: RecipeListProps) => {
  // const recipesCtx = React.useContext(recipesContext);
  // const { setRecipes: contextSetRecipes } = React.useContext(recipesContext);
  return (
    <div className={styles.recipeList}>
      {recipes.map((recipe: any) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
