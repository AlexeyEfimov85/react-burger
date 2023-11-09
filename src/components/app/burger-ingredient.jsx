import styles from "./burger-ingredient.module.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from './tabs';
import Article from "./article";
import ItemList from "./item-list";
import { SET_CURRENT_TAB_ONE, SET_CURRENT_TAB_TWO, SET_CURRENT_TAB_THREE } from '../../services/actions/tab';
import { SET_CLOSE } from '../../services/actions/modal';
import { DELETE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import Modal from "./modal";
import { IngredientDetails } from "./ingridient-details";
export default function BurgerIngredients() {
  const currentIngredient = useSelector(
    (store) => store.setIngredientDetailsReducer.ingredient
  );
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({type: DELETE_INGREDIENT_DETAILS})
    dispatch({type: SET_CLOSE})
}
  useEffect(()=> {
    const container = document.querySelector('.custom-scroll');
    container.addEventListener('scroll', ()=>{
      if(container.scrollTop <= 300) {
        dispatch({type: SET_CURRENT_TAB_ONE})
      } else if(container.scrollTop > 300 && container.scrollTop <= 800) {
        dispatch({type: SET_CURRENT_TAB_TWO})
      } else if(container.scrollTop > 800) {
        dispatch({type: SET_CURRENT_TAB_THREE})
      }
    })
  },[])
  return (
    <section className={styles.sectionBurgerIngredients}>
      <h1 className="text text_type_main-large">Соберите бургер </h1>
      <Tabs />
      <div className={`${styles.ingredientsWrapper} custom-scroll`}>
        <Article text={"Булки"}>
          <ItemList  type="bun"  />
        </Article>
        <Article text={"Соусы"}>
          <ItemList  type="sauce"  />
        </Article>
        <Article text={"Начинки"}>
          <ItemList  type="main"  />
        </Article>
        <>
                {currentIngredient && (
                  <Modal onClose = {closeModal}>
                    <IngredientDetails />
                  </Modal>
                )}
              </>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  children: PropTypes.any
};
