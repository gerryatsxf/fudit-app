import React, { useEffect, useState } from "react";
import styles from "./Foods.module.scss";
import { Configuration, ConfigurationParameters, FoodsApi } from "../../../api";
import { UserContext } from "../../common/layout/RootContainer";
import LoadingIndicator from "../../common/bootstrap/LoadingIndicator";
import FoodList from "./FoodList/FoodList";
import { Outlet } from "react-router-dom";

export const foodsContext = React.createContext<any>({
  foods: [],
  setFoods: () => {},
});

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const userCtx = React.useContext(UserContext);

  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${userCtx.token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));

    foodsApi
      .foodsControllerFindAll()
      .then((response) => {
        console.log(response);
        //@ts-ignore
        setFoods(response.data.data.foods);
      })
      .catch((error) => {
        console.error("There was an error while fetching foods.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userCtx.token]);

  const handleSetFoods = (newFoods: any) => {
    setFoods(newFoods);
  };

  if (loading) return <LoadingIndicator></LoadingIndicator>;
  else {
    return (
      <foodsContext.Provider value={{ foods, setFoods: handleSetFoods }}>
        <div className={styles.foodsContainer}>
          <h2 className={styles.title}>Foods</h2>
          <FoodList foods={foods} setFoods={handleSetFoods} />
          <Outlet />
        </div>
      </foodsContext.Provider>
    );
  }
};

export default Foods;
