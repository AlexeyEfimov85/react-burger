import styles from "./orders.module.css";
import { useSelector as selectorHook, TypedUseSelectorHook } from "react-redux"; 
import FeedCard from "../feed/feed-card";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../..";

export default function UserOrders() {
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const location = useLocation();
  const orders = useSelector((store) => store.userOrdersReducer.orders);
  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order: any, index: number) => (
        <Link key={index}
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
