import styles from "./feed.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import FeedCard from "./feed-card";
import FeedOrders from "./feed-orders";

export default function Feed() {
  const location = useLocation();
  const orders = useSelector((store) => store.allOrdersReducer.orders);
  return (
    <>
      <h1 className={`${styles.heading} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div className={styles.componentsWrapper}>
        <div className={`${styles.list} custom-scroll pr-2`}>
          {orders.map((order, index) => (
            <Link key = {index}
              to={`/feed/${order.number}`}
              className={styles.link}
              state={{ background: location }} // заполняем background - если он заполнен, то компонент открывается в модалке, это реализовано в отдельном роуте в App
            >
              <FeedCard order={order}  key={order.number} />
            </Link>
          ))}
        </div>
        <FeedOrders order={orders} />
      </div>
    </>
  );
}
