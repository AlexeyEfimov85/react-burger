import React, { FC, PropsWithChildren  } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "./order-details";
import Modal from "./modal";
import TotalOrder from "./total-order";
import { getOrderDetailsAction } from "../../services/actions/order-details";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SET_OPEN, SET_CLOSE } from "../../services/actions/modal";
import {
  INCREASE_INGREDIENT_COUNTER,
  ADD_INGREDIENT,
  CHANGE_ELEMENTS_ORDER,
} from "../../services/actions/ingredient-counter";
import { GET_ORDERDETAILS_SUCCESS } from "../../services/actions/order-details";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ListItem } from "../../types/types";
import { useSelector, useDispatch } from "../../types/hooks";


const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.setIsOpenReducer.isOpen);
  const data = useSelector((store) => store.setIngredientCounterReducer.cart);
  let totalPrice = 0;
  totalPrice = data
    .map((listitem: ListItem) => {
      if (listitem.type === "bun") {
        return listitem.price * 2;
      } else {
        return listitem.price;
      }
    })
    .reduce(function (previosValue: number, item: number) {
      return previosValue + item;
    }, 0);
  const closeModal = () => {
    dispatch({ type: SET_CLOSE });
    dispatch({
      type: INCREASE_INGREDIENT_COUNTER,
      ingredient: [],
    });
    dispatch({
      type: GET_ORDERDETAILS_SUCCESS,
      orderDetails: null,
    });
  };
  const arrMain = data.filter(
    (element: ListItem) => element !== null && element.type !== "bun"
  );

  const arrBun = data.filter(
    (element: ListItem) => element !== null && element.type === "bun"
  );

  const lastBun = arrBun.pop();
  const allIngredientsInCart = React.useMemo(() => {
    return arrMain.concat(lastBun);
  }, [arrMain, lastBun]); //список ингредиентов в корзине для счетчика в ингредиентах
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: object) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {
          ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
          key: uuidv4(), // и добавляем в объект новое поле, которое потом будет использовано в `key`
        },
      });
    },
  });
  React.useEffect(() => {
    if (allIngredientsInCart[0] !== undefined)
      dispatch({
        type: INCREASE_INGREDIENT_COUNTER,
        ingredient: allIngredientsInCart,
      });
  }, [lastBun]);

  const selectedIngredients = data.filter((element: ListItem) => element !== null);
  const selectedIngredientsIds = selectedIngredients.map(
    (element: ListItem) => element._id
  );
  const navigate = useNavigate();
  const openModal = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getOrderDetailsAction(selectedIngredientsIds));
      dispatch({ type: SET_OPEN });
    }
  };
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragIngredient = allIngredientsInCart[dragIndex];
    const newAllIngredientsInCart = [...allIngredientsInCart];
    newAllIngredientsInCart.splice(dragIndex, 1);
    newAllIngredientsInCart.splice(hoverIndex, 0, dragIngredient);
    dispatch({
      type: CHANGE_ELEMENTS_ORDER,
      ingredient: newAllIngredientsInCart,
    });
  };
  return (
    <section className={`${styles.burgerConstructor} mt-15`}>
      <div className={styles.burgerConstructorAllElemenstWrapper} ref={dropRef}>
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
              {arrMain.map((listItem: ListItem, index: number) => (
                <CartItem
                  listItem={listItem}
                  allIngredientsInCart={allIngredientsInCart}
                  index={index}
                  moveCard={moveCard}
                  key={listItem.key}
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
        <TotalOrder price={totalPrice}></TotalOrder>
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
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

type CartItems = {
  listItem: ListItem;
  allIngredientsInCart: object[];
  index: number;
  moveCard: (arg0: number, arg1: number) => void;
}

const CartItem:FC<PropsWithChildren<CartItems>> = ({ listItem, allIngredientsInCart, index, moveCard }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [, drop] = useDrop({
    accept: "ing",
    hover(item: ListItem, monitor) {
      if (!ref.current) {
        return;
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
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      // Get pixels to the top
      if(clientOffset){
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;}
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
            type: INCREASE_INGREDIENT_COUNTER,
            ingredient: [],
          });
          dispatch({
            type: INCREASE_INGREDIENT_COUNTER,
            ingredient: result,
          });
        }}
      />
    </div>
  );
}

export default BurgerConstructor;
