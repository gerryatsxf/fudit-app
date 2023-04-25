import React from "react";
import styles from "./DietaryInfoEdit.module.scss";

// @ts-ignore
const DietaryInfoEdit = ({ editFoodRequest, setEditFoodRequest }) => {
  const handleFoodDietaryInfoFieldChange = (field: string, value: number) => {
    const request = { ...editFoodRequest };
    request[field] = value;
    setEditFoodRequest(request);
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
    <table className={styles.dietaryInfoEditTable}>
      <tbody>
        {dietaryInfoField(editFoodRequest.kcalPerKg, "kcalPerKg", units.kcal)}
        {dietaryInfoField(
          editFoodRequest.proteinsPerKg,
          "proteinsPerKg",
          units.proteins
        )}
        {dietaryInfoField(
          editFoodRequest.carbohydratesPerKg,
          "carbohydratesPerKg",
          units.carbohydrates
        )}
        {dietaryInfoField(
          editFoodRequest.lipidsPerKg,
          "lipidsPerKg",
          units.lipids
        )}
        {dietaryInfoField(editFoodRequest.kcalPerLt, "kcalPerLt", units.kcal)}
        {dietaryInfoField(
          editFoodRequest.proteinsPerLt,
          "proteinsPerLt",
          units.proteins
        )}
        {dietaryInfoField(
          editFoodRequest.carbohydratesPerLt,
          "carbohydratesPerLt",
          units.carbohydrates
        )}
        {dietaryInfoField(
          editFoodRequest.lipidsPerLt,
          "lipidsPerLt",
          units.lipids
        )}
      </tbody>
    </table>
  );
};

export default DietaryInfoEdit;
