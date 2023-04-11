import React from "react";
import styles from "./DietaryInfoUpdate.module.scss";

// @ts-ignore
const DietaryInfoUpdate = ({ updateFoodRequest, setUpdateFoodRequest }) => {

  const handleFoodDietaryInfoFieldChange = (field: string, value: number) => {
    const request = { ...updateFoodRequest };
    request[field] = value;
    setUpdateFoodRequest(request);
  };
  const units = {
    kcal: "kcal",
    proteins: "grams",
    carbohydrates: "grams",
    lipids: "grams",
  };

  const dietaryInfoField = (value: any, field: any, unit: any) => {
    return (
      <tr>
        <td>{field}:</td>
        <td className={styles.foodDietaryInfoFieldContainer}>
          <input
            type="number"
            value={value ? value.toString() : 0}
            onChange={(event) => {
              handleFoodDietaryInfoFieldChange(field, +event.target.value);
            }}
            className={styles.seamlessInput}
          />
        </td>
        <td>({unit})</td>
      </tr>
    );
  };
  return (
    <table className={styles.dietaryInfoUpdateTable}>
      <tbody>
        {dietaryInfoField(updateFoodRequest.kcalPerKg, "kcalPerKg", units.kcal)}
        {dietaryInfoField(
          updateFoodRequest.proteinsPerKg,
          "proteinsPerKg",
          units.proteins
        )}
        {dietaryInfoField(
          updateFoodRequest.carbohydratesPerKg,
          "carbohydratesPerKg",
          units.carbohydrates
        )}
        {dietaryInfoField(
          updateFoodRequest.lipidsPerKg,
          "lipidsPerKg",
          units.lipids
        )}
        {dietaryInfoField(updateFoodRequest.kcalPerLt, "kcalPerLt", units.kcal)}
        {dietaryInfoField(
          updateFoodRequest.proteinsPerLt,
          "proteinsPerLt",
          units.proteins
        )}
        {dietaryInfoField(
          updateFoodRequest.carbohydratesPerLt,
          "carbohydratesPerLt",
          units.carbohydrates
        )}
        {dietaryInfoField(
          updateFoodRequest.lipidsPerLt,
          "lipidsPerLt",
          units.lipids
        )}
      </tbody>
    </table>
  );
};

export default DietaryInfoUpdate;
