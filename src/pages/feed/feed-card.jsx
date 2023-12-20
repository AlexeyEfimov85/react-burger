import styles from "../feed/feed-card.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FeedCard({ order }) {
  const location = useLocation();
  const orderNumber = order["number"];
  const orderIngredientsIds = order.ingredients;
  const ingredients = useSelector(
    (store) => store.getIngredientsReducer.ingredients
  );

  let orderIngredients = []; //так как с сервера приходят только id ингредиентов, нам для построения компонентов нужно получить данные ингредиента целиком
  orderIngredientsIds.forEach((orderIngredientId) => {
    ingredients.forEach((ingredient) => {
      if (orderIngredientId === ingredient._id) {
        orderIngredients.push(ingredient);
      }
    });
  });
  const orderIngredientsPrices = orderIngredients.map((orderIngredient) => {
    return orderIngredient.price;
  });

  return (
    <Link
      to={`/feed/${orderNumber}`}
      className={styles.link}
      state={{ background: location }} // заполняем background - если он заполнен, то компонент открывается в модалке, это реализовано в отдельном роуте в App
    >
      <li className={`${styles.card} pl-6 pr-6 pb-6 pt-6`}>
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
    </Link>
  );
}

export function FeedCardIcons({ orderIngredients }) {
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
      {orderIngredients.map((orderIngredient, index) => {
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
