import React from "react";
import styles from "./FoodCreate.module.scss";
import DietaryInfoUpdate from "../DietaryInfoEdit/DietaryInfoEdit";
import {
  Configuration,
  ConfigurationParameters,
  CreateFoodRequestDto,
  FoodsApi,
} from "../../../../api";
import DietaryInfoEdit from "../DietaryInfoEdit/DietaryInfoEdit";
import { useNavigate } from "react-router-dom";
import { foodsContext } from "../Foods";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import { BrowserAppContext } from "../../../../App";
const FoodCreate = () => {
  const navigate = useNavigate();
  const [createFoodRequest, setCreateFoodRequest] = React.useState({
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
  } as CreateFoodRequestDto);
  const foodsCtx = React.useContext(foodsContext);
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;

  const [createRequestLoading, setCreateRequestLoading] = React.useState(false);
  const token = localStorage.getItem("fudit_access_token");

  const handleNameChange = (event: any) => {
    setCreateFoodRequest({ ...createFoodRequest, name: event.target.value });
  };
  const handleDescriptionChange = (event: any) => {
    setCreateFoodRequest({
      ...createFoodRequest,
      description: event.target.value,
    });
  };
  const handleSave = () => {
    const config: ConfigurationParameters = {
      basePath: "http://localhost:3002",
      accessToken: `${token}`,
    };
    const foodsApi = new FoodsApi(new Configuration(config));
    setCreateRequestLoading(true);
    foodsApi
      .foodsControllerCreate(createFoodRequest)
      .then((response: any) => {
        foodsApi.foodsControllerFindAll().then((response: any) => {
          const foods = response.data.data.foods;
          console.log("foods: ", foods);
          foodsCtx.setFoods(foods);
        });
        navigate(`/${BASE_PATH}/app/foods/${response.data.data.food.id}`);
      })
      .catch((error: any) => {
        console.error("There was an error while updating the food.", error);
      })
      .finally(() => {
        setCreateRequestLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`/${BASE_PATH}/app/foods`);
  };

  if (createRequestLoading) {
    return (
      <div className={`${styles.foodUpdateContainer} ${styles.center}`}>
        <LoadingIndicator />
      </div>
    );
  } else {
    return (
      <div className={styles.foodCreateContainer}>
        <h2>
          <span className={styles.foodNameContainer}>
            <input
              type="text"
              value={createFoodRequest.name}
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
                value={createFoodRequest.description}
                onChange={handleDescriptionChange}
                className={styles.seamlessInput}
              />
            </span>
          </p>
          <DietaryInfoEdit
            editFoodRequest={createFoodRequest}
            setEditFoodRequest={setCreateFoodRequest}
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
export default FoodCreate;
