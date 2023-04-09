import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import {
  Configuration,
  ConfigurationParameters,
  FoodsApi,
} from "../../../../api";
import styles from "./FoodDetail.module.scss";
import { foodsContext } from "../Foods";

const FoodDetail = () => {
  const navigate = useNavigate();
  const foodsCtx = React.useContext(foodsContext);

  const token = localStorage.getItem("fudit_access_token");
  const { foodId } = useParams();
  console.log("foodId: ", foodId);
  if (!foodId) {
    navigate("/app/foods");
    // return <LoadingIndicator />;
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [food, setFood] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));

    setLoading(true);
    foodsApi
      .foodsControllerFindOne(foodId)
      .then((response: any) => {
        setFood(response.data.data.food);
      })
      .catch((error: any) => {
        console.error("There was an error while fetching the food.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [foodId, token]);

  const handleBack = () => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));
    foodsApi.foodsControllerFindAll().then((response: any) => {
      const foods = response.data.data.foods;
      console.log("foods: ", foods);
      foodsCtx.setFoods(foods);
    });
    navigate("/app/foods");
  };

  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <div>
        <h2>{food.name}</h2>
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>

        <p>{food.description}</p>
        <p>Price: ${food.price}</p>
      </div>
    );
  }
};

export default FoodDetail;
