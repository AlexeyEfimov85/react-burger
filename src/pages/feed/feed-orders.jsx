import { useEffect, useState } from "react";
import styles from "./feed-orders.module.css";
import { useSelector } from "react-redux";

export default function FeedOrders() {
  const orders = useSelector((store) => store.allOrdersReducer);
  const [totalOrders, setTotalOrders] = useState(1);
  const [totalTodayOrders, setTotalTodayOrders] = useState(1);
  useEffect(() => {
    setTotalOrders(orders.total);
    setTotalTodayOrders(orders.totalToday);
  }, [orders.total, orders.totalToday]);
  return (
    <div className={`${styles.orders} ml-15`}>
      <div className={styles.ordersList}>
        <div className={`${styles.ordersListHeading} mb-3`}>
          <p
            className={`${styles.readyOrdersListHeading} text text_type_main-medium`}
          >
            Готовы:
          </p>
          <p
            className={`${styles.processingOrdersListHeading} text text_type_main-medium`}
          >
            В работе:
          </p>
        </div>
        <div
          className={`${styles.ordersLists} text text_type_main-default mb-5`}
        >
          <ul className={styles.readyOrdersListItems}>
            {orders.orders.map((order, index) => {
              if (order.status === "done") {
                return <li key = {index}>{order.number}</li>;
              }
            })}
          </ul>
          <ul className={styles.processingOrdersListItems}>
            {orders.orders.map((order, index) => {
              if (order.status !== "done") {
                return <li key = {index}>{order.number}</li>;
              }
            })}
          </ul>
        </div>
      </div>
      <div className={`${styles.totalOrders} mb-5`}>
        <span className="text text_type_main-medium">
          Выполнено за все время:
        </span>
        <span className="text text_type_digits-large">{totalOrders}</span>
      </div>
      <div className={styles.totalTodayOrders}>
        <span className="text text_type_main-medium">
          Выполнено за сегодня:
        </span>
        <span className="text text_type_digits-large">{totalTodayOrders}</span>
      </div>
    </div>
  );
}
