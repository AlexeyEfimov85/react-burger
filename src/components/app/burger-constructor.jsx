import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "./order-details";
import Modal from "./modal";
import TotalOrder from "./total-order";
import { TotalPriceContext } from "../../services/burgerСonstructorContext";
import { getOrderDetailsAction } from "../../services/actions/order-details";
import { useDrop, useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
export default function BurgerConstructor({ draggableMain }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.setIsOpenReducer.isOpen);
  const data = useSelector((store) => store.setIngredientCounterReducer.cart);
  const [totalPrice, totalPriceDispatcher] = React.useReducer(
    reducer,
    priceInitialState,
    undefined
  );
  React.useEffect(() => {
    totalPriceDispatcher({ type: "set" });
  }, [data]);
  const arrMain = data.filter(
    (element) => element !== null && element.type !== "bun"
  );

  const arrBun = data.filter(
    (element) => element !== null && element.type === "bun"
  );
  let lastBunprice = 0;

  const lastBun = arrBun.pop();
  const allIngredientsInCart = React.useMemo(() => {
    return arrMain.concat(lastBun);
  }, [arrMain, lastBun]); //список ингредиентов в корзине для счетчика в ингредиентах
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({ type: "ADD_INGREDIENT", ingredient: item });
    },
  });
  React.useEffect(() => {
    if (allIngredientsInCart[0] !== undefined)
      dispatch({
        type: "INCREASE_INGREDIENT_COUNTER",
        ingredient: allIngredientsInCart,
      });
  }, [lastBun]);
  // подсчет суммы ингредиентов
  let mainIngredientsSum = 0;
  arrMain.forEach((item) => {
    mainIngredientsSum = mainIngredientsSum + item.price;
  });
  if (lastBun) {
    lastBunprice = lastBun.price * 2;
  }
  totalPriceSum = lastBunprice + mainIngredientsSum;
  //находим айди ингредиентов в корзине
  const selectedIngredients = data.filter((element) => element !== null);
  const selectedIngredientsIds = selectedIngredients.map(
    (element) => element._id
  );
  const openModal = () => {
    dispatch(getOrderDetailsAction(selectedIngredientsIds));
    dispatch({ type: "SET_OPEN" });
  };
  const moveCard = (dragIndex, hoverIndex) => {
    const dragIngredient = allIngredientsInCart[dragIndex];
    const newAllIngredientsInCart = [...allIngredientsInCart];
    newAllIngredientsInCart.splice(dragIndex, 1);
    newAllIngredientsInCart.splice(hoverIndex, 0, dragIngredient);
    dispatch({
      type: "CHANGE_ELEMENTS_ORDER",
      ingredient: newAllIngredientsInCart,
    });
  };
  return (
    <section className={`${styles.burgerConstructor} mt-15`}>
      <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
        <div
          className={styles.burgerConstructorAllElemenstWrapper}
          ref={dropRef}
        >
          <div className="ml-15">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={lastBun ? `${lastBun.name} (верх)` : "Пока здесь пусто"}
              price={lastBun ? lastBun.price : "Пока здесь пусто"}
              thumbnail={lastBun ? lastBun.image : "Пока здесь пусто"}
            />
          </div>
          <DndProvider backend={HTML5Backend}>
            <div
              className={`${styles.burgerConstructorMainElementWrapper} custom-scroll pr-1`}
            >
              <ul className={styles.list}>
                {arrMain.map((listItem, index) => (
                  <CartItem
                    listItem={listItem}
                    allIngredientsInCart={allIngredientsInCart}
                    index={index}
                    moveCard={moveCard}
                  />
                ))}
              </ul>
            </div>
          </DndProvider>
          <div className="ml-15">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={lastBun ? `${lastBun.name} (низ)` : "Пока здесь пусто"}
              price={lastBun ? lastBun.price : "Пока здесь пусто"}
              thumbnail={lastBun ? lastBun.image : "Пока здесь пусто"}
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
          <Modal>
            <OrderDetails />
          </Modal>
        )}
      </TotalPriceContext.Provider>
    </section>
  );
}

function CartItem({ listItem, allIngredientsInCart, index, moveCard }) {
  const ref = React.useRef(null);
    const [, drop] = useDrop({
    accept: "ing",
    hover (item, monitor)  {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      };
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      };
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
      console.log(item.index);
    },
  });
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: "ing",
    item: () => {
      return { listItem, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={styles.burgerConstructorMainElement}
     // style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        key={listItem._id}
        text={listItem.name}
        price={listItem.price}
        thumbnail={listItem.image}
        handleClose={() => {
          const result = allIngredientsInCart;
          result.splice(
            allIngredientsInCart.findIndex((a) => a === listItem),
            1
          );
          dispatch({
            type: "INCREASE_INGREDIENT_COUNTER",
            ingredient: [],
          });
          dispatch({
            type: "INCREASE_INGREDIENT_COUNTER",
            ingredient: result,
          });
        }}
      />
    </div>
  );
}
