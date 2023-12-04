import styles from "./ingredient-info-full-page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request, baseUrl } from "../../utils/burger-api";
import { useSelector } from "react-redux";

export function IngredientDetails() {
  const [currentIngredient, setCurrentIngredient] = useState();
  const { ingredientId } = useParams();
  const ingredientInStore = useSelector(store => store.setIngredientDetailsReducer.ingredient);
  async function getIngredients() {
    try {
      await request(`${baseUrl + "/ingredients"}`).then((object) => {
        let URLIngredient = {}; 
        object.data.forEach(function (item) {
          if(item._id === ingredientId) {
            URLIngredient = item;
          }
        });
        ingredientInStore ? setCurrentIngredient(ingredientInStore) : (setCurrentIngredient(URLIngredient))
      });
    } catch (err) {
      console.log(err);
    }
  }
 
  useEffect(() => {
    getIngredients();
  }, []);
  return (
    <div className={styles.ingredientDetails}>
      {currentIngredient ? (
        <>
          <p
            className={`${styles.modalHeading} text text_type_main-large ml-10 mt-10`}
          >
            Детали ингридиента
          </p>
          <img
            src={currentIngredient.image}
            alt={currentIngredient.image}
            className={styles.ingredientDetailsPicture}
          ></img>
          <p className="text text_type_main-medium mt-4">
            {currentIngredient.name}
          </p>
          <div
            className={`${styles.ingredientParameters} text text_type_main-default text_color_inactive`}
          >
            <p className={styles.ingredientParameter}>
              <span>Калории,ккал</span>
              <span>{currentIngredient.calories}</span>
            </p>
            <p className={styles.ingredientParameter}>
              <span>Белки,&nbsp;г</span>
              <span>{currentIngredient.proteins}</span>
            </p>
            <p className={styles.ingredientParameter}>
              <span>Жиры,&nbsp;г</span>
              <span>{currentIngredient.fat}</span>
            </p>
            <p className={styles.ingredientParameter}>
              <span>Углеводы,&nbsp;г</span>
              <span>{currentIngredient.carbohydrates}</span>
            </p>
          </div>
        </>
      ) : (
        <div>loader</div>
      )}
    </div>
  );
}
