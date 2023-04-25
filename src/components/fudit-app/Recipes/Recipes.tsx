import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.scss";
import {
  Configuration,
  ConfigurationParameters,
  RecipesApi,
} from "../../../api";
import { UserContext } from "../../common/layout/RootContainer";
import LoadingIndicator from "../../common/bootstrap/LoadingIndicator";
import RecipeList from "./RecipeList/RecipeList";
import { Outlet, useNavigate } from "react-router-dom";
import { BrowserAppContext, FuditApiContext } from "../../../App";

export const recipesContext = React.createContext<any>({
  recipes: [],
  setRecipes: () => {},
});
export const portionsContext = React.createContext<any>({
  portions: [],
  setPortions: () => {},
});
const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [portions, setPortions] = useState([]);
  const [loading, setLoading] = useState(true);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const fuditApiCtx = React.useContext(FuditApiContext);
  const PROTOCOL = fuditApiCtx.protocol;
  const HOST = fuditApiCtx.host;
  const userCtx = React.useContext(UserContext);

  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: `${PROTOCOL}://${HOST}`,
      accessToken: `${userCtx.token}`,
    };
    const recipesApi = new RecipesApi(new Configuration(config));

    recipesApi
      .recipesControllerFindAll()
      .then((response) => {
        console.log(response);
        //@ts-ignore
        setRecipes(response.data.data.recipes);
      })
      .catch((error) => {
        console.error("There was an error while fetching recipes.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userCtx.token]);

  const handleSetRecipes = (newRecipes: any) => {
    setRecipes(newRecipes);
  };

  if (loading) return <LoadingIndicator></LoadingIndicator>;
  else {
    return (
      <recipesContext.Provider
        value={{ recipes, setRecipes: handleSetRecipes }}
      >
        <portionsContext.Provider value={{ portions, setPortions }}>
          <div className={styles.recipesContainer}>
            <h2 className={styles.title}>Recipes</h2>
            <RecipeList recipes={recipes} setRecipes={handleSetRecipes} />
            <br />
            <button
              className={styles.createButton}
              onClick={() => navigate(`/${BASE_PATH}/app/recipes/create`)}
            >
              Create
            </button>
            <br />
            <Outlet />
          </div>
        </portionsContext.Provider>
      </recipesContext.Provider>
    );
  }
};

export default Recipes;
