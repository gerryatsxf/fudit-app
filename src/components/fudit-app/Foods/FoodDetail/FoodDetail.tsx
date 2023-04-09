import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../common/bootstrap/LoadingIndicator";
import { Configuration, ConfigurationParameters, FoodsApi } from "../../../../api";

const FoodDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("fudit_access_token");
  const { foodId } = useParams();
  console.log("foodId: ", foodId)
  if (!foodId) {
    navigate("/app/foods");
    // return <LoadingIndicator />;
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [food, setFood] = useState({
    id: '',
    name: '',
    description: '',
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

  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <div>
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p>Price: ${food.price}</p>
      </div>
    );
  }


};

export default FoodDetail;
