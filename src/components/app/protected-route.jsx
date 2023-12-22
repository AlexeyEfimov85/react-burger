import { useLocation, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.signInReducer.user);
  const isAuthChecked = useSelector((store) => store.signInReducer.isAuthChecked);
  const location = useLocation();
  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  } 

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
); 