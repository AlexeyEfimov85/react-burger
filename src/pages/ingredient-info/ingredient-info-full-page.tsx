import styles from "./ingredient-info-full-page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../types/hooks";
import { Ingredient } from "../../types/types";


export function IngredientDetails() {
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();
  const { ingredientId } = useParams();
  const ingredients = useSelector(store => store.getIngredientsReducer.ingredients)
  const ingredientInStore = useSelector(store => store.setIngredientDetailsReducer.ingredient);
  let URLIngredient: Ingredient = {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: "",
    image_large: "",
    image_mobile: "",
    name: "",
    price: 0,
    proteins: 0,
    type: "",
    _id: ""
  };
  ingredients.forEach(function (item: Ingredient) {
    if (item._id === ingredientId) {
      URLIngredient = item;
    }
  });
  useEffect(() => {
    setCurrentIngredient(URLIngredient)
  }, [URLIngredient]);
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
