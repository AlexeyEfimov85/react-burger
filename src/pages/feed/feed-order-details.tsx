import styles from "./feed-order-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../../types/hooks";
import { useEffect, useState } from "react";
import { getOrderFromServerByNumber } from "../../services/actions/get-order-by-number";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { connect } from "../../services/orders-all/actions";
import { Order, TOrderContent, SelectedOrder, Ingredient } from "../../types/types";
const ALL_ORDER_FEED_URL = "wss://norma.nomoreparties.space/orders/all";


const FeedOrderDetails = ({orders}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connect(ALL_ORDER_FEED_URL));
  }, [])
  // с помощью хука useParams определяем номер заказа (взяв конец URL)
  // даллее берем из хранилища все заказы и находим нужный по номеру
  // если такого заказа нет то отсылаем action c номером заказа в URL на соответсвующий эндпоинт
  //const orders = useSelector((store) => store.allOrdersReducer.orders);
  const orderFromServerByNumber = useSelector(
    (store) => store.getOrderFromServerByNumberReducer.orders
  );
  const orderNumber: any = useParams().orderNumber;
  const [selectedOrder, setSelectedOrder] = useState<SelectedOrder>(null);
  console.log(selectedOrder)

  useEffect(() => {
    setSelectedOrder(
      orders.find((order: Order) => {
        return order.number === +orderNumber;
      })
    );
    const flag = orders.find((order: Order) => {
      return order.number === +orderNumber;
    });
    if (!flag) {
      dispatch(getOrderFromServerByNumber(orderNumber));
      setSelectedOrder(orderFromServerByNumber);
    }
    
  }, [selectedOrder, orders, orderNumber]);

  return selectedOrder ? (
    <div className={styles.wrapper}>
      <span
        className={`${styles.orderNumber} text text_type_digits-default mt-10 mb-10`}
      >
        #&nbsp;{selectedOrder.number}
      </span>
      <span className={`${styles.orderName} text text_type_main-medium mb-3`}>
        {selectedOrder.name}
      </span>
      <span className={`${styles.orderStatus} text text_type_main-small mb-15`}>
        {selectedOrder.status === "done" ? "Выполнен" : "Готовится"}
      </span>
      <span
        className={`${styles.orderContentHeadinmg} text text_type_main-medium mb-6`}
      >
        Состав
      </span>
      <OrderContent
        orderIngredientsIds={selectedOrder.ingredients}
        date={selectedOrder.createdAt}
      />
    </div>
  ) : (
    <span>Загрузка...</span>
  );
}

export function OrderContent({ orderIngredientsIds, date } : TOrderContent) {
  // чтобы отобразить каждый ингредиент один раз получим массив уникальных ID
  const uniqeOrderIngredientsIds = orderIngredientsIds.filter(function (
    orderIngredientId,
    index,
    array
  ) {
    return array.lastIndexOf(orderIngredientId) === index; // вернём уникальные элементы
  });
  const ingredients = useSelector(
    (store) => store.getIngredientsReducer.ingredients
  );
  let orderIngredients:any = []; //так как через пропсы приходят только id ингредиентов, нам для построения компонентов нужно получить данные ингредиента целиком
  uniqeOrderIngredientsIds.forEach((uniqeOrderIngredientId) => {
    ingredients.forEach((ingredient: Ingredient) => {
      if (uniqeOrderIngredientId === ingredient._id) {
        orderIngredients.push(ingredient);
      }
    });
  });
  let arr = orderIngredientsIds;
  let count: any = {};

  for (let elem of arr) {
    if (count[elem] === undefined) {
      count[elem] = 1;
    } else {
      count[elem]++;
    }
  }
  const orderIngredientsPrices = orderIngredients.map((orderIngredient: Ingredient) => {
    return orderIngredient.price;
  });
  return (
    <>
      <ul className={`${styles.orderContent} custom-scroll`}>
        {orderIngredients.map((orderIngredient: Ingredient, index: number) => {
          return (
            <li key={index} className={`${styles.orderContentItem} `}>
              <div
                className={styles.cardImage}
              >
                <img
                  className={styles.image}
                  src={orderIngredient.image_mobile}
                  alt={orderIngredient.name}
                ></img>
              </div>
              <span className={`${styles.name} text text_type_main-default mr-4`}>{orderIngredient.name}</span>
              <div className={`${styles.orderIngredientPrice} text text_type_digits-default mr-6`}>
              <span>{count[orderIngredient._id]} &nbsp;X&nbsp;</span>
              <span>&nbsp;{orderIngredient.price}&nbsp;&nbsp;<CurrencyIcon type="primary" /></span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.orderDateAndPrice} mt-10 mb-5`}>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(date)} />
        <span className="text text_type_digits-default">
          {orderIngredientsPrices.reduce(function (prevVal: number, item: number) {
            return prevVal + item;
          })}  &nbsp;<CurrencyIcon type="primary" />
        </span>
      </div>
    </>
  );
}


export default FeedOrderDetails;