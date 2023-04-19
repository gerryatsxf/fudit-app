import React, { useContext, useEffect, useState } from "react";
import { recipesContext } from "../Recipes";
import {
  Configuration,
  ConfigurationParameters,
  RecipesApi,
  UpdateRecipeRequestDto,
} from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RecipeUpdate.module.scss";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
// import DietaryInfoUpdate from "../DietaryInfoEdit/DietaryInfoEdit";

const RecipeUpdate = () => {
  // Initialize context and states
  const token = localStorage.getItem("fudit_access_token");
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const recipesCtx = useContext(recipesContext);
  const [updateRequestLoading, setUpdateRequestLoading] = useState(true);
  const [updateRecipeRequest, setUpdateRecipeRequest] = useState({
    name: "",
    description: "",
    portions: [],
  } as UpdateRecipeRequestDto);

  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const recipesApi = new RecipesApi(new Configuration(config));

    // Handle non-existing recipeId
    if (!recipeId) {
      navigate("/app/recipes");
    } else {
      recipesApi
        .recipesControllerFindOne(recipeId)
        .then((response: any) => {
          const refresh = {
            name: response.data.data.recipe.name,
            description: response.data.data.recipe.description,
            portions: response.data.data.recipe.portions,
          };
          setUpdateRecipeRequest(refresh);
        })
        .catch((error: any) => {
          console.error("There was an error while fetching the recipe.", error);
        })
        .finally(() => {
          setUpdateRequestLoading(false);
        });
    }
  }, [recipeId, navigate, setUpdateRecipeRequest, token]);

  // Handle non-existing recipeId
  if (!recipeId) {
    navigate("/app/recipes");
    return null;
  }

  const handleSave = () => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const recipesApi = new RecipesApi(new Configuration(config));
    setUpdateRequestLoading(true);
    recipesApi
      .recipesControllerUpdate(recipeId, updateRecipeRequest)
      .then((response: any) => {
        recipesApi.recipesControllerFindAll().then((response: any) => {
          const recipes = response.data.data.recipes;
          console.log("recipes: ", recipes);
          recipesCtx.setRecipes(recipes);
        });
        navigate(`/app/recipes/${recipeId}`);
      })
      .catch((error: any) => {
        console.error("There was an error while updating the recipe.", error);
      })
      .finally(() => {
        setUpdateRequestLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`/app/recipes/${recipeId}`);
  };

  const handleNameChange = (event: any) => {
    setUpdateRecipeRequest({
      ...updateRecipeRequest,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (event: any) => {
    setUpdateRecipeRequest({
      ...updateRecipeRequest,
      description: event.target.value,
    });
  };

  if (updateRequestLoading) {
    return (
      <div className={`${styles.recipeUpdateContainer} ${styles.center}`}>
        <LoadingIndicator />
      </div>
    );
  } else {
    return (
      <div className={styles.recipeUpdateContainer}>
        <h2>
          <span className={styles.recipeNameContainer}>
            <input
              type="text"
              value={updateRecipeRequest.name}
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
                value={updateRecipeRequest.description}
                onChange={handleDescriptionChange}
                className={styles.seamlessInput}
              />
            </span>
          </p>
          {/*<DietaryInfoUpdate*/}
          {/*  editRecipeRequest={updateRecipeRequest}*/}
          {/*  setEditRecipeRequest={setUpdateRecipeRequest}*/}
          {/*/>*/}
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
export default RecipeUpdate;
