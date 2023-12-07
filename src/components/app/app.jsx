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
import  Modal  from '../../components/app/modal';
import { NotFound404 } from '../../pages/NotFound404';
import { getIngredientsAction } from '../../services/actions/burger-ingredient';
import { refreshUserValueAction } from '../../services/actions/refresh-user';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getIngredientsAction())
    dispatch(refreshUserValueAction())

  }, [dispatch])
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
        <Route
          path="/login"
          element={<OnlyUnAuth component={<SignIn />} />}
        />
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
        <Route
          path="/profile"
          element={<OnlyAuth component={<Profile />} />}
        />
      <Route path='/ingredients/:ingredientId'
               element={<IngredientDetails />} /> 
      <Route path="*" element={<NotFound404 />} />
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
