import React, { Fragment } from "react";
import { recipesContext } from "../Recipes";
import RecipePortionsListItem from "../RecipePortionsListItem/RecipePortionsListItem";

// @ts-ignore
const RecipePortionsList = ({ recipe }) => {
  //const recipesCtx = React.useContext(recipesContext);

  const portions = recipe.portions;
  console.log(portions);

  return (
    <div className="recipe-portions-list">
      <h2>Portions</h2>
      {/*<ul>*/}
      {portions.map((portion: any) => (
        <RecipePortionsListItem portion={portion} />
      ))}
      {/*</ul>*/}
    </div>
  );
};

export default RecipePortionsList;
