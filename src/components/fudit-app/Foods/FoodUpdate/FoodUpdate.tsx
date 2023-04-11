import React, { useEffect } from "react";
import { foodsContext, updateFoodContext } from "../Foods";
import {
  Configuration,
  ConfigurationParameters,
  FoodsApi,
} from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../FoodUpdate/FoodUpdate.module.scss";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
const FoodUpdate = () => {
  const navigate = useNavigate();
  const foodsCtx = React.useContext(foodsContext);
  const updateFoodCtx = React.useContext(updateFoodContext);
  const updateFoodRequest = updateFoodCtx.updateFoodRequest;
  const setUpdateFoodRequest = updateFoodCtx.setUpdateFoodRequest;
  const [updateRequestLoading, setUpdateRequestLoading] = React.useState(false);
  const token = localStorage.getItem("fudit_access_token");
  const { foodId } = useParams();
  const isUpdateCase = window.location.pathname.includes(
    `/app/foods/${foodId}/update`
  );
  updateFoodCtx.setUserIsEditing(isUpdateCase);
  console.log("foodId: ", foodId);
  if (!foodId) {
    navigate("/app/foods");
    return null;
  }

  const handleSave = () => {
    setUpdateRequestLoading(true);
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));

    foodsApi
      .foodsControllerUpdate(foodId, updateFoodRequest)
      .then((response: any) => {
        foodsApi.foodsControllerFindAll().then((response: any) => {
          const foods = response.data.data.foods;
          console.log("foods: ", foods);
          foodsCtx.setFoods(foods);
        });
        navigate(`/app/foods/${foodId}`);
      })
      .catch((error: any) => {
        console.error("There was an error while updating the food.", error);
      })
      .finally(() => {
        setUpdateRequestLoading(false);
      });
  };
  const handleCancel = () => {
    navigate(`/app/foods/${foodId}`);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));

    foodsApi
      .foodsControllerFindOne(foodId)
      .then((response: any) => {
        const refresh = {
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
        setUpdateFoodRequest(refresh);
      })
      .catch((error: any) => {
        console.error("There was an error while fetching the food.", error);
      });
  }, [foodId, setUpdateFoodRequest, token]);

  const handleNameChange = (event: any) => {
    setUpdateFoodRequest({
      ...updateFoodRequest,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (event: any) => {
    setUpdateFoodRequest({
      ...updateFoodRequest,
      description: event.target.value,
    });
  };
  if (updateRequestLoading) {
    return <LoadingIndicator />;
  } else {
    return (
      <div className={styles.foodUpdateContainer}>
        <h2>
          <span className={styles.foodNameContainer}>
            <input
              type="text"
              value={updateFoodRequest.name}
              onChange={handleNameChange}
              className={styles.seamlessInput}
            />
          </span>
        </h2>
        <div className={styles.infoContainer}>
          <p>
            <span className={styles.descriptionLabel}>Description: </span>
            <span className={styles.foodNameContainer}>
              <input
                type="text"
                value={updateFoodRequest.description}
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
export default FoodUpdate;
