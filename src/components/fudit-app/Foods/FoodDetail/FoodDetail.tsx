import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import {
  Configuration,
  ConfigurationParameters,
  FoodsApi,
} from "../../../../api";
import styles from "./FoodDetail.module.scss";
import { foodsContext, updateFoodContext } from "../Foods";
import DietaryInfo from "../DietaryInfo/DietaryInfo";

const FoodDetail = () => {
  const navigate = useNavigate();
  const foodsCtx = React.useContext(foodsContext);
  const updateFoodCtx = React.useContext(updateFoodContext);
  const setUpdateFoodRequest = updateFoodCtx.setUpdateFoodRequest;
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
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));

    setLoading(true);
    foodsApi
      .foodsControllerFindOne(foodId)
      .then((response: any) => {
        setFood(response.data.data.food);
        const updateFoodRequest = {
          id: response.data.data.food.id,
          name: response.data.data.food.name,
          description: response.data.data.food.description,
          kcalPerKg: response.data.data.food.dietaryInfo.kcalPerKg,
          proteinsPerKg: response.data.data.food.dietaryInfo.proteinsPerKg,
          carbohydratesPerKg:
            response.data.data.food.dietaryInfo.carbohydratesPerKg,
          lipidsPerKg: response.data.data.food.dietaryInfo.lipidsPerKg,
          kcalPerLt: response.data.data.food.dietaryInfo.kcalPerLt,
          proteinsPerLt: response.data.data.food.dietaryInfo.proteinsPerLt,
          carbohydratesPerLt:
            response.data.data.food.dietaryInfo.carbohydratesPerLt,
          lipidsPerLt: response.data.data.food.dietaryInfo.lipidsPerLt,
        };
        setUpdateFoodRequest(updateFoodRequest);
      })
      .catch((error: any) => {
        console.error("There was an error while fetching the food.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [foodId, setUpdateFoodRequest, token]);

  const handleClose = () => {
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
  const handleDelete = () => {};
  const handleEdit = () => {
    navigate(`/app/foods/${foodId}/update`);
  };
  if (loading) {
    return (
      <div className={`${styles.foodDetailsContainer} ${styles.center}`}>
        <LoadingIndicator />
      </div>
    );
  } else {
    return (
      <div className={styles.foodDetailsContainer}>
        <h2>{food.name}</h2>
        <button className={styles.closeButton} onClick={handleClose}>
          Close
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={handleDelete} >
          Delete
        </button>

        <br />

        <div className={styles.infoContainer}>
          <p>
            <span className={styles.descriptionLabel}>Description:</span>{" "}
            {food.description}
          </p>
          <DietaryInfo dietaryInfo={food.dietaryInfo} />
        </div>
      </div>
    );
  }
};

export default FoodDetail;
