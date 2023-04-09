import React from "react";
import styles from "./DietaryInfo.module.scss";
// @ts-ignore
const DietaryInfo = ({ dietaryInfo }) => {
  return (
    <table className={styles.dietaryInfoTable}>
      <tbody>
        <tr>
          <td>kcalPerKg:</td>
          <td>{dietaryInfo.kcalPerKg}</td>
        </tr>
        <tr>
          <td>proteinsPerKg:</td>
          <td>{dietaryInfo.proteinsPerKg}</td>
        </tr>
        <tr>
          <td>carbohydratesPerKg:</td>
          <td>{dietaryInfo.carbohydratesPerKg}</td>
        </tr>
        <tr>
          <td>lipidsPerKg:</td>
          <td>{dietaryInfo.lipidsPerKg}</td>
        </tr>
        <tr>
          <td>kcalPerLt:</td>
          <td>{dietaryInfo.kcalPerLt}</td>
        </tr>
        <tr>
          <td>proteinsPerLt:</td>
          <td>{dietaryInfo.proteinsPerLt}</td>
        </tr>
        <tr>
          <td>carbohydratesPerLt:</td>
          <td>{dietaryInfo.carbohydratesPerLt}</td>
        </tr>
        <tr>
          <td>lipidsPerLt:</td>
          <td>{dietaryInfo.lipidsPerLt}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DietaryInfo;
