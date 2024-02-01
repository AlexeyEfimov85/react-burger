import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./app-header";
import BurgerIngredients from "./burger-ingredient";
import BurgerConstructor from "./burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IngredientDetails } from "../../pages/ingredient-info/ingredient-info-full-page";
import SignIn from "../../pages/registration/sign-in";
import Register from "../../pages/registration/register";
import ForgotPassword from "../../pages/registration/forgot-password";
import ResetPassword from "../../pages/registration/reset-password";
import Profile from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import Modal from "./modal";
import { NotFound404 } from "../../pages/NotFound404";
import Feed from "../../pages/feed/feed";
import FeedOrderDetails from "../../pages/feed/feed-order-details";
import { getIngredientsAction } from "../../services/actions/burger-ingredient";
import { refreshUserValueAction } from "../../services/actions/refresh-user";
import { connect, disconnect } from "../../services/orders-all/actions";
import {
  connectUserOrders,
  disconnectUserOrders,
} from "../../services/orders-user/actions";
import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../../types/hooks";


const ALL_ORDER_FEED_URL = "wss://norma.nomoreparties.space/orders/all";
const USER_ORDER_URL = "wss://norma.nomoreparties.space/orders";

const App: FC = () => {
  const allOrders = useSelector((store) => store.allOrdersReducer.orders);
  const allOrdersStatus = useSelector((store) => store.allOrdersReducer.status);
  const userOrders = useSelector((store) => store.userOrdersReducer.orders);
  const userOrdersStatus = useSelector(
    (store) => store.userOrdersReducer.status
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const token: string | null = localStorage.getItem("accessToken");
  let allOrdersWs = false;
  if (location.pathname.includes("feed")) {
    allOrdersWs = true;
  }
  let tokenWithoutBearer = null;
  if (token) {
    tokenWithoutBearer = token.slice(7, token.length);
  }

  const URL = `${USER_ORDER_URL}?token=${tokenWithoutBearer}`;

  let userOrdersWs = false;
  if (location.pathname.includes("profile/orders")) {
    userOrdersWs = true;
  }

  useEffect(() => {
    dispatch(getIngredientsAction());
    dispatch(refreshUserValueAction());

    if (allOrdersWs) {
      dispatch(connect(ALL_ORDER_FEED_URL));
    }
    if (!allOrdersWs && allOrdersStatus === "ONLINE") {
      dispatch(disconnect());
    }
    if (userOrdersWs) {
      dispatch(connectUserOrders(URL));
    }
    if (!userOrdersWs && userOrdersStatus === "ONLINE") {
      dispatch(disconnectUserOrders());
    }
  }, [dispatch, allOrdersWs, userOrdersWs]);

  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = (): void => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="/react-burger/" element={<Main />} />
        <Route path="/login" element={<OnlyUnAuth component={<SignIn />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="*" element={<NotFound404 />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:orderNumber"
          element={<FeedOrderDetails orders={allOrders} />}
        />
        <Route
          path="/profile/orders/:orderNumber"
          element={
            <OnlyAuth component={<FeedOrderDetails orders={userOrders} />} />
          }
        />
        <Route
          path="/profile/orders"
          element={<OnlyAuth component={<Profile />} />}
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:orderNumber"
            element={
              <Modal onClose={handleModalClose}>
                <FeedOrderDetails orders={allOrders} />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:orderNumber"
            element={
              <OnlyAuth
                component={
                  <Modal onClose={handleModalClose}>
                    <FeedOrderDetails orders={userOrders} />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients></BurgerIngredients>
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default App;