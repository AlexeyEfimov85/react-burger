import styles from "../feed/feed-card.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../types/hooks";
import { FC, useEffect, useState } from "react";
import { Order,Ingredient } from "../../types/types";

const FeedCard: FC<Order> = ({ order }) => {
  const orderIngredientsIds = order.ingredients;
  const ingredients = useSelector(
    (store) => store.getIngredientsReducer.ingredients
  );
  let orderIngredients: Ingredient[] = []; //так как с сервера приходят только id ингредиентов, нам для построения компонентов нужно получить данные ингредиента целиком
  orderIngredientsIds.forEach((orderIngredientId) => {
    ingredients.forEach((ingredient: Ingredient) => {
      if (orderIngredientId === ingredient._id) {
        orderIngredients.push(ingredient);
      }
    });
  });
  const orderIngredientsPrices = orderIngredients.map((orderIngredient) => {
    return orderIngredient.price;
  });

  return (
    <li className={`${styles.card} pl-6 pr-6 pb-6 pt-6`} >
      <div className={`${styles.cardHeader} mb-6`}>
        <p className={`${styles.orderNumber} text text_type_main-medium`}>
          #{order.number}
        </p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <p className={`${styles.cardHeading} text text_type_main-medium mb-6`}>
        {order.name}
      </p>
      <div className={styles.cardFooter}>
        <FeedCardIcons orderIngredients={orderIngredients} />
        <div className={`${styles.orderPrice} text text_type_digits-default`}>
          <span className="pr-2">
            {orderIngredientsPrices.reduce(function (prevVal, item) {
              return prevVal + item;
            })}{" "}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

type FeedCardIconsTypes = {
  orderIngredients: Ingredient[];
}

export const FeedCardIcons = ({ orderIngredients }: FeedCardIconsTypes) => {
  const [overlay, setOverlay] = useState(false);
  const [overlayNumber, setOverlayNumber] = useState(0);
  useEffect(() => {
    if (orderIngredients.length > 6) {
      setOverlay(true);
      setOverlayNumber(orderIngredients.length - 6);
    }
  }, [orderIngredients.length]);
  return (
    <div className={styles.cardImageWrapper}>
      {orderIngredients.map((orderIngredient: Ingredient, index: number) => {
        if (index < 6) {
          return (
            <div
              className={styles.cardImage}
              style={{ position: "relative", right: `calc(25px * ${index})` }}
              key={index}
            >
              <img
                className={styles.image}
                src={orderIngredient.image_mobile}
                alt={orderIngredient.name}
              ></img>
            </div>
          );
        }
      })}
      {overlay && (
        <div className={styles.overlay}>
          <span
            className={`${styles.overlayNumber} text text_type_digits-default`}
          >
            +{overlayNumber}
          </span>
        </div>
      )}
    </div>
  );
}

export default FeedCard;
