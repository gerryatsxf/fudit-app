import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FoodListItem.module.scss";
import { BrowserAppContext, FuditApiContext } from "../../../../App";
// @ts-ignore
const FoodListItem = ({ food }) => {
  const navigate = useNavigate();
  const browserAppCtx = React.useContext(BrowserAppContext);
  const BASE_PATH = browserAppCtx.basePath;
  const fuditApiCtx = React.useContext(FuditApiContext);
  const PROTOCOL = fuditApiCtx.protocol;
  const HOST = fuditApiCtx.host;

  const handleClick = () => {
    navigate(`/${BASE_PATH}/app/foods/${food.id}`);
  };

  return (
    <div className={styles.food}>
      <a
        className={styles.nameLink}
        href={`/${BASE_PATH}/app/foods/${food.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        {food.name}
      </a>
    </div>
  );
};

export default FoodListItem;
