import React, { Fragment } from "react";
import styles from "./DietaryInfo.module.scss";
// @ts-ignore

const DietaryInfo = ({ dietaryInfo }) => {
  const kgConfig = {
    kcal: +dietaryInfo.kcalPerKg,
    proteins: +dietaryInfo.proteinsPerKg,
    carbohydrates: +dietaryInfo.carbohydratesPerKg,
    lipids: +dietaryInfo.lipidsPerKg,
  };
  const ltConfig = {
    kcal: +dietaryInfo.kcalPerLt,
    proteins: +dietaryInfo.proteinsPerLt,
    carbohydrates: +dietaryInfo.carbohydratesPerLt,
    lipids: +dietaryInfo.lipidsPerLt,
  };

  const setupTableRows = (config: any) => {
    const { kcal, proteins, carbohydrates, lipids } = config;
    const units = {
      kcal: "kcal",
      proteins: "grams",
      carbohydrates: "grams",
      lipids: "grams",
    };

    if (
      kcal &&
      proteins &&
      carbohydrates &&
      lipids &&
      kcal > 0 &&
      proteins > 0 &&
      carbohydrates > 0 &&
      lipids > 0
    ) {
      return (
        <Fragment>
          <tr>
            <td>kcalPerKg:</td>
            <td>{kcal}</td>
            <td>({units.kcal})</td>
          </tr>
          <tr>
            <td>proteinsPerKg:</td>
            <td>{proteins}</td>
            <td>({units.proteins})</td>
          </tr>
          <tr>
            <td>carbohydratesPerKg:</td>
            <td>{carbohydrates}</td>
            <td>({units.carbohydrates})</td>
          </tr>
          <tr>
            <td>lipidsPerKg:</td>
            <td>{lipids}</td>
            <td>({units.lipids})</td>
          </tr>
        </Fragment>
      );
    } else {
      return;
    }
  };

  return (
    <table className={styles.dietaryInfoTable}>
      <tbody>
        {setupTableRows(kgConfig)}
        {setupTableRows(ltConfig)}
      </tbody>
    </table>
  );
};

export default DietaryInfo;
