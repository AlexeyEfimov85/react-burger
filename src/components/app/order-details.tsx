import { FC, useEffect, useState } from "react";
import styles from "./order-details.module.css";
import { useSelector as selectorHook, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../..";

export const OrderDetails: FC = () => {
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const orderNumber = useSelector(
    (store) => store.getOrderDetailsReducer.orderDetails
  );
  return orderNumber ? (
    <div className={styles.orderDetails}>
      <span className="mt-30 mb-8 text text_type_digits-large">
        {orderNumber}
      </span>
      <span className="mb-15 text text_type_main-medium">
        идентификатор заказа
      </span>
      <div className={styles.done}></div>
      <span className="mt-15 mb-2 text text_type_main-small">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  ) : (
    <div className={styles.orderDetails}><CountDown /></div>
  );
}

const CountDown: FC = () => {
  const [showTimeLeft, setShowTimeLeft] = useState(15)

  useEffect(() => {
    let timeLeft = showTimeLeft
    const countdownTimer = setInterval(function () {
      setShowTimeLeft(timeLeft--)
      if (timeLeft <= 0)
        clearInterval(countdownTimer)
    }, 1000);
  }, [])

  return <p className={`${styles.countDown} text text_type_digits-medium`}>Ожидайте&nbsp;{showTimeLeft}&nbsp;секунд</p>;
}
