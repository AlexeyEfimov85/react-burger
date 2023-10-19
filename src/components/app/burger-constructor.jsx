import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { OrderDetails } from "./order-details";
import Modal from "./modal";
import TotalOrder from "./total-order";
//import MainElements from "./main-elements";totalPriceSum
//import  {DataContext} from '../../services/appContext';
import { IngredientContext } from "../../services/burgerIngredientContext";
import { TotalPriceContext } from "../../services/burgerСonstructorContext";
const priceInitialState = { price: 0 };
let totalPriceSum = 0;
function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { price: totalPriceSum };
    case "reset":
      return priceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}
export default function BurgerConstructor() {
  const [totalPrice, totalPriceDispatcher] = React.useReducer(
    reducer,
    priceInitialState,
    undefined
  );
  const handleSetPrice = () => {
    totalPriceDispatcher({ type: "set" });
  };
  const handleResetetPrice = () => {
    totalPriceDispatcher({ type: "reset" });
  };
  const IngredientDetails = React.useContext(IngredientContext);
  const [orderNumber, setOrderNumber] = React.useState([]);
  const [state, setState] = React.useState([]); // в этом стейте накапливаем выбранные ингредиенты
  //const data = React.useContext(DataContext);
  React.useEffect(() => {
    const getIngredients = () => {
      setState([...state, IngredientDetails]);
      totalPriceDispatcher({ type: "set" });
    };
    getIngredients();
  }, [IngredientDetails]);
  const arrMain = state.filter(
    (element) =>
      element.currentIngredient !== null &&
      element.currentIngredient.type !== "bun"
  );
  const listItems = arrMain.map((listItem) => (
    <div
      className={styles.burgerConstructorMainElement}
      key={listItem.currentIngredient._id}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={listItem.currentIngredient.name}
        price={listItem.currentIngredient.price}
        thumbnail={listItem.currentIngredient.image}
      />
    </div>
  ));

  const arrBun = state.filter(
    (element) =>
      element.currentIngredient !== null &&
      element.currentIngredient.type === "bun"
  );
  let lastBunprice = 0;
  const lastBun = arrBun.pop();
  // подсчет суммы ингредиентов
  let mainIngredientsSum = 0;
  arrMain.forEach((item) => {
    mainIngredientsSum = mainIngredientsSum + item.currentIngredient.price;
  });
  if (lastBun) {
    lastBunprice = lastBun.currentIngredient.price * 2;
  }
  totalPriceSum = lastBunprice + mainIngredientsSum;

  const [isOpen, setIsOpen] = React.useState(false);
  const selectedIngredients = state.filter(
    (element) => element.currentIngredient !== null
  );
  const selectedIngredientsIds = selectedIngredients.map(
    (element) => element.currentIngredient._id
  );
  const openModal = () => {
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ingredients: selectedIngredientsIds,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => {
        setOrderNumber(data.order.number);
      })
      .catch((err) => console.log(err));
      setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <section className={`${styles.burgerConstructor} mt-15`}>
      <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
        <div className={styles.burgerConstructorAllElemenstWrapper}>
          <div className="ml-15">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={
                lastBun
                  ? `${lastBun.currentIngredient.name} (верх)`
                  : "Пока здесь пусто"
              }
              price={
                lastBun ? lastBun.currentIngredient.price : "Пока здесь пусто"
              }
              thumbnail={
                lastBun ? lastBun.currentIngredient.image : "Пока здесь пусто"
              }
            />
          </div>
          <div
            className={`${styles.burgerConstructorMainElementWrapper} custom-scroll pr-1`}
          >
            <ul className={styles.list}>{listItems}</ul>
          </div>
          <div className="ml-15">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={
                lastBun
                  ? `${lastBun.currentIngredient.name} (низ)`
                  : "Пока здесь пусто"
              }
              price={
                lastBun ? lastBun.currentIngredient.price : "Пока здесь пусто"
              }
              thumbnail={
                lastBun ? lastBun.currentIngredient.image : "Пока здесь пусто"
              }
            />
          </div>
        </div>
        <div className={`${styles.totalWrapper} mt-10 mb-15`}>
          <TotalOrder price={totalPrice.price}></TotalOrder>
          <Button
            onClick={openModal}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
        {isOpen && (
          <Modal onClick={closeModal}>
            <OrderDetails orderNumber = {orderNumber} />
          </Modal>
        )}
      </TotalPriceContext.Provider>
    </section>
  );
}

//BurgerConstructor.propTypes = {
// data: PropTypes.array,
// };
