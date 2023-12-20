import styles from "./orders.module.css";
import { useSelector } from "react-redux";
import FeedCard from "../feed/feed-card";

export default function UserOrders() {
  const orders = useSelector((store) => store.userOrdersReducer.orders);
  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order) => (
        <FeedCard order={order} key={order.number} />
      ))}
    </div>
  );
}
