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
import { ProtectedRouteElement } from "./protected-route";
import { AllowedRouteElement } from "./allowed-route";
import  Modal  from '../../components/app/modal';
import { NotFound404 } from '../../pages/NotFound404';

export default function App() {
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
          element={<AllowedRouteElement element={<SignIn />} />}
        />
        <Route
          path="/register"
          element={<AllowedRouteElement element={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<AllowedRouteElement element={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<AllowedRouteElement element={<ResetPassword />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
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
