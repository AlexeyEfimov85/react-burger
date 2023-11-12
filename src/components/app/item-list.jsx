import React from "react";
import PropTypes from "prop-types";
import styles from "./item-list.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsAction } from "../../services/actions/burger-ingredient";
import { useDrag } from "react-dnd";
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';

export default function ItemList(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredientsAction())
  }, []);
  const data = useSelector((store) => store.getIngredientsReducer.ingredients);
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: data,
  });
  const arr = data.filter((element) => element.type === props.type);

  return (
    <ul className={styles.list}>
      {arr.map((listItem) => (
        <Item listItem={listItem} key={listItem._id} />
      ))}
    </ul>
  );
}

ItemList.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

function Item({ listItem }) {
  const count = useSelector(store => store.setIngredientCounterReducer.cart).map((item)=> {
    return item._id 
  }).reduce(function(acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
let counter = 0;
let idInCart;
  for (let id in count) {
    if (id === listItem._id) {
      counter = count[id]
      idInCart = id;
    }
  }
  const dispatch = useDispatch();
  const setIngredientDetails = (listItem) => {
    dispatch({ type: SET_INGREDIENT_DETAILS, ingredient: listItem });
  };
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: listItem,
  });
  return (
    <li
      ref={dragRef}
      onClick={() => setIngredientDetails(listItem)}
      className={styles.listItem}
      key={listItem._id}
    >
      <img src={listItem.image} alt={listItem.name} />
      <p className="text text_type_digits-default">
        {listItem.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{listItem.name}</p>
      {listItem._id === idInCart && (
        <Counter count={counter} size="default" extraClass="m-1" />
      )}
    </li>
  );
}
