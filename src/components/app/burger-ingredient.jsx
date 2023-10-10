import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import React from "react";
import Modal from "./modal";
import { IngredientDetails } from "./ingridient-details";
import Tabs from './tabs';
import Article from "./article";
import ItemList from "./item-list";

export default function BurgerIngredients({ data }) {
  const [currentIngredient, setcurrentIngredient] = React.useState(null);
  const closeModal = () => {
    setcurrentIngredient(null);
  };
  return (
    <section className={styles.sectionBurgerIngredients}>
      <h1 className="text text_type_main-large">Соберите бургер </h1>;
      <Tabs />
      <div className={`${styles.ingredientsWrapper} custom-scroll`}>
        <Article text={"Булки"}>
          <ItemList data={data} type="bun" onClick={setcurrentIngredient} />
        </Article>
        <Article text={"Соусы"}>
          <ItemList data={data} type="sauce" onClick={setcurrentIngredient} />
        </Article>
        <Article text={"Начинки"}>
          <ItemList data={data} type="main" onClick={setcurrentIngredient} />
        </Article>
      </div>

      {currentIngredient && (
        <Modal onClick={closeModal}>
          <IngredientDetails
            name={currentIngredient.name}
            src={currentIngredient.image}
            calories={currentIngredient.calories}
            proteins={currentIngredient.proteins}
            fat={currentIngredient.fat}
            carbohydrates={currentIngredient.carbohydrates}
          />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
};
