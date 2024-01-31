import styles from "./orders.module.css";
import { useSelector } from "../../types/hooks";
import FeedCard from "../feed/feed-card";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

type Order = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number | string;
  status: string;
  updatedAt: string;
  _id: string;
  children: ReactNode;
}

export default function UserOrders() {
  const location = useLocation();
  const orders = useSelector((store) => store.userOrdersReducer.orders);
  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order: Order, index: number) => (
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
