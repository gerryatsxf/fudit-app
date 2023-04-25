import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import {
  Configuration,
  ConfigurationParameters,
  RecipesApi,
} from "../../../../api";
import styles from "./RecipeDetail.module.scss";
import { recipesContext } from "../Recipes";
import RecipePortionsList from "../RecipePortionsList/RecipePortionsList";
import { BrowserAppContext, FuditApiContext } from "../../../../App";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const recipesCtx = React.useContext(recipesContext);
  const token = localStorage.getItem("fudit_access_token");
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const fuditApiCtx = React.useContext(FuditApiContext);
  const PROTOCOL = fuditApiCtx.protocol;
  const HOST = fuditApiCtx.host;
  const { recipeId } = useParams();
  if (!recipeId) {
    navigate(`/${BASE_PATH}/app/recipes`);
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    description: "",
    dietaryInfo: {
      kcalPerKg: 0,
      proteinsPerKg: 0,
      carbohydratesPerKg: 0,
      lipidsPerKg: 0,
      kcalPerLt: 0,
      proteinsPerLt: 0,
      carbohydratesPerLt: 0,
      lipidsPerLt: 0,
    },
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: `${PROTOCOL}://${HOST}`,
      accessToken: `${token}`,
    };
    const recipesApi = new RecipesApi(new Configuration(config));

    setLoading(true);
    recipesApi
      .recipesControllerFindOne(recipeId)
      .then((response: any) => {
        setRecipe(response.data.data.recipe);
      })
      .catch((error: any) => {
        console.error("There was an error while fetching the recipe.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [recipeId, token]);

  const handleClose = () => {
    const config: ConfigurationParameters = {
      basePath: `${PROTOCOL}://${HOST}`,
      accessToken: `${token}`,
    };
    const recipesApi = new RecipesApi(new Configuration(config));
    recipesApi.recipesControllerFindAll().then((response: any) => {
      const recipes = response.data.data.recipes;
      console.log("recipes: ", recipes);
      recipesCtx.setRecipes(recipes);
    });
    navigate(`/${BASE_PATH}/app/recipes`);
  };
  const handleDelete = () => {};
  const handleEdit = () => {
    navigate(`/${BASE_PATH}/app/recipes/${recipeId}/update`);
  };

  if (loading) {
    return (
      <div className={`${styles.recipeDetailsContainer} ${styles.center}`}>
        <LoadingIndicator />
      </div>
    );
  } else {
    return (
      <div className={styles.recipeDetailsContainer}>
        <h2>{recipe.name}</h2>
        <button className={styles.closeButton} onClick={handleClose}>
          Close
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>

        <br />

        <div className={styles.infoContainer}>
          <p>
            <span className={styles.descriptionLabel}>Description:</span>{" "}
            {recipe.description}
          </p>
          <RecipePortionsList recipe={recipe}></RecipePortionsList>
        </div>
      </div>
    );
  }
};

export default RecipeDetail;
