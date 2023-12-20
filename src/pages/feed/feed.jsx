import styles from "./feed.module.css";
import { useEffect } from "react";
import { connect } from "../../services/orders-all/actions";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./feed-card";
import FeedOrders from "./feed-orders";


export default function Feed() {
  const orders = useSelector((store) => store.allOrdersReducer.orders);
  return (
    <>
    <h1 className={`${styles.heading} text text_type_main-large`}>Лента заказов</h1>
    <div className={styles.componentsWrapper}>
      <div className={`${styles.list} custom-scroll pr-2`}>
        {orders.map((order) => (
          <FeedCard order={order} key={order.number} />
        ))}
      </div>
      <FeedOrders order={orders} />
    </div>
    </>
  );
}
