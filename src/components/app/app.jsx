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
import Modal from "../../components/app/modal";
import { NotFound404 } from "../../pages/NotFound404";
import Feed from "../../pages/feed/feed";
import FeedOrderDetails from "../../pages/feed/feed-order-details";
import { getIngredientsAction } from "../../services/actions/burger-ingredient";
import { refreshUserValueAction } from "../../services/actions/refresh-user";
import { connect } from "../../services/orders-all/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ALL_ORDER_FEED_URL = "wss://norma.nomoreparties.space/orders/all";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsAction());
    dispatch(refreshUserValueAction());
    dispatch(connect(ALL_ORDER_FEED_URL));
  }, [dispatch]);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
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
        <Route path="/feed/:orderNumber" element={<FeedOrderDetails />} />
        <Route path="/profile/orders" element={<OnlyAuth component={<Profile />} />} />
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
                <FeedOrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

function Main() {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients></BurgerIngredients>
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}
