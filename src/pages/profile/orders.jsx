import styles from "./orders.module.css";
import { useSelector } from "react-redux";
import FeedCard from "../feed/feed-card";
import { Link, useLocation } from "react-router-dom";

export default function UserOrders() {
  const location = useLocation();
  const orders = useSelector((store) => store.userOrdersReducer.orders);
  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order, index) => (
        <Link key = {index}
        to={`/profile/orders/${order.number}`}
        className={styles.link}
        state={{ background: location }} // заполняем background - если он заполнен, то компонент открывается в модалке, это реализовано в отдельном роуте в App
      >
        <FeedCard order={order} key={order.number} />
        </Link>
      ))}
    </div>
  );
}
