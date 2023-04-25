import React, { useContext, useEffect, useState } from "react";
import { foodsContext } from "../Foods";
import {
  Configuration,
  ConfigurationParameters,
  FoodsApi,
  UpdateFoodRequestDto,
} from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../FoodUpdate/FoodUpdate.module.scss";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import DietaryInfoUpdate from "../DietaryInfoEdit/DietaryInfoEdit";
import { BrowserAppContext, FuditApiContext } from "../../../../App";

const FoodUpdate = () => {
  // Initialize context and states
  const token = localStorage.getItem("fudit_access_token");
  const navigate = useNavigate();
  const { foodId } = useParams();
  const foodsCtx = useContext(foodsContext);
  const [updateRequestLoading, setUpdateRequestLoading] = useState(true);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const fuditApiCtx = React.useContext(FuditApiContext);
  const PROTOCOL = fuditApiCtx.protocol;
  const HOST = fuditApiCtx.host;
  const [updateFoodRequest, setUpdateFoodRequest] = useState({
    name: "",
    description: "",
    carbohydratesPerKg: 0,
    carbohydratesPerLt: 0,
    kcalPerKg: 0,
    kcalPerLt: 0,
    lipidsPerKg: 0,
    lipidsPerLt: 0,
    proteinsPerKg: 0,
    proteinsPerLt: 0,
  } as UpdateFoodRequestDto);

  useEffect(() => {
    const config: ConfigurationParameters = {
      basePath: `${PROTOCOL}://${HOST}`,
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));

    // Handle non-existing foodId
    if (!foodId) {
      navigate(`/${BASE_PATH}/app/foods`);
    } else {
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
        })
        .finally(() => {
          setUpdateRequestLoading(false);
        });
    }
  }, [foodId, navigate, setUpdateFoodRequest, token]);

  // Handle non-existing foodId
  if (!foodId) {
    navigate(`/${BASE_PATH}/app/foods`);
    return null;
  }

  const handleSave = () => {
    const config: ConfigurationParameters = {
      basePath: `${PROTOCOL}://${HOST}`,
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));
    setUpdateRequestLoading(true);
    foodsApi
      .foodsControllerUpdate(foodId, updateFoodRequest)
      .then((response: any) => {
        foodsApi.foodsControllerFindAll().then((response: any) => {
          const foods = response.data.data.foods;
          console.log("foods: ", foods);
          foodsCtx.setFoods(foods);
        });
        navigate(`/${BASE_PATH}/app/foods/${foodId}`);
      })
      .catch((error: any) => {
        console.error("There was an error while updating the food.", error);
      })
      .finally(() => {
        setUpdateRequestLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`/${BASE_PATH}/app/foods/${foodId}`);
  };

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
    return (
      <div className={`${styles.foodUpdateContainer} ${styles.center}`}>
        <LoadingIndicator />
      </div>
    );
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
            <span className={styles.foodDescriptionContainer}>
              <input
                type="text"
                value={updateFoodRequest.description}
                onChange={handleDescriptionChange}
                className={styles.seamlessInput}
              />
            </span>
          </p>
          <DietaryInfoUpdate
            editFoodRequest={updateFoodRequest}
            setEditFoodRequest={setUpdateFoodRequest}
          />
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
