import React from "react";
import styles from "./RecipeCreate.module.scss";
import {
  Configuration,
  ConfigurationParameters,
  CreateRecipeRequestDto,
  RecipesApi,
} from "../../../../api";
import { useNavigate } from "react-router-dom";
import { recipesContext } from "../Recipes";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import { BrowserAppContext } from "../../../../App";
const RecipeCreate = () => {
  const navigate = useNavigate();
  const [createRecipeRequest, setCreateRecipeRequest] = React.useState({
    name: "",
    description: "",
    portions: [],
  } as CreateRecipeRequestDto);
  const recipesCtx = React.useContext(recipesContext);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const [createRequestLoading, setCreateRequestLoading] = React.useState(false);
  const token = localStorage.getItem("fudit_access_token");

  const handleNameChange = (event: any) => {
    setCreateRecipeRequest({
      ...createRecipeRequest,
      name: event.target.value,
    });
  };
  const handleDescriptionChange = (event: any) => {
    setCreateRecipeRequest({
      ...createRecipeRequest,
      description: event.target.value,
    });
  };
  const handleSave = () => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const recipesApi = new RecipesApi(new Configuration(config));
    setCreateRequestLoading(true);
    recipesApi
      .recipesControllerCreate(createRecipeRequest)
      .then((response: any) => {
        recipesApi.recipesControllerFindAll().then((response: any) => {
          const recipes = response.data.data.recipes;
          console.log("recipes: ", recipes);
          recipesCtx.setRecipes(recipes);
        });
        navigate(`/${BASE_PATH}/app/recipes/${response.data.data.recipe.id}`);
      })
      .catch((error: any) => {
        console.error("There was an error while updating the recipe.", error);
      })
      .finally(() => {
        setCreateRequestLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`/${BASE_PATH}/app/recipes`);
  };

  if (createRequestLoading) {
    return (
      <div className={`${styles.recipeUpdateContainer} ${styles.center}`}>
        <LoadingIndicator />
      </div>
    );
  } else {
    return (
      <div className={styles.recipeCreateContainer}>
        <h2>
          <span className={styles.recipeNameContainer}>
            <input
              type="text"
              value={createRecipeRequest.name}
              onChange={handleNameChange}
              className={styles.seamlessInput}
            />
          </span>
        </h2>
        <div className={styles.infoContainer}>
          <p>
            <span className={styles.descriptionLabel}>Description: </span>
            <span className={styles.recipeDescriptionContainer}>
              <input
                type="text"
                value={createRecipeRequest.description}
                onChange={handleDescriptionChange}
                className={styles.seamlessInput}
              />
            </span>
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.deleteButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
};
export default RecipeCreate;
