/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "../../types/hooks";
import { NavLink, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { logoutAction } from "../../services/actions/logout";
import { SIGN_IN_SUCCESS } from "../../services/actions/auth";
import { refreshUserValueAction } from "../../services/actions/refresh-user";
import { changeUserValueAction } from "../../services/actions/change-user-value";
import UserOrders from "./orders";

type TProfileForm = {
  email: string;
  name: string;
} | null;

export default function Profile() {
  const user: TProfileForm = useSelector(store => store.signInReducer.user)
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUserValueAction());
  }, [])
  // выход из профиля: отсылаем асинхронный экшн, очищаем данные пользователя в хранилище
  const signOut = () => {
    dispatch(logoutAction());
    dispatch({
      type: SIGN_IN_SUCCESS,
      user: null,
      isAuthChecked: false
    })
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.linkContainer} mr-15`}>
          <NavLink
            className={`${styles.link} text text_type_main-default text_color_inactive`}
            to="/profile"
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "",
              };
            }}
          >
            <h3 className={styles.linkText}>Профиль</h3>
          </NavLink>
          <NavLink to="/profile/orders"
            className={`${styles.link} text text_type_main-default text_color_inactive`}
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "",
              };
            }}
          >
            <h3 className={styles.linkText}>История заказов</h3>
          </NavLink>
          <NavLink
            to=''
            onClick={signOut}
            className={`${styles.link} text text_type_main-default text_color_inactive`}
          >
            <h3 className={styles.linkText}>Выход</h3>
          </NavLink>
          {(location.pathname === "/profile") ? (<p className="mt-20 mb-0 text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>) : (<p className="mt-20 mb-0 text text_type_main-default text_color_inactive">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>)}

        </div>

        {(location.pathname === "/profile" && user) ? (<ProfileForm user={user} />) : (<UserOrders />)}
      </div>
    </>
  );
}

type TProfileFormm = {
  user: {
    email: string;
    name: string;
  }
}

export function ProfileForm({ user }: TProfileFormm) {
  const dispatch = useDispatch();
  const [buttonsShowValue, setButtonsShowValue] = useState(false); // для отображения кнопок сохранить && отмена

  const [userValue, setUserValue] = useState({
    name: user.name,
    email: user.email,
    password: "*****",
  });

  const onNameChange = (e: { target: { value: string; }; }) => {
    setUserValue({ ...userValue, name: e.target.value });
    setButtonsShowValue(true);
  };
  const onEmailChange = (e: { target: { value: string; }; }) => {
    setUserValue({ ...userValue, email: e.target.value });
    setButtonsShowValue(true);
  };
  const onPasswordChange = (e: { target: { value: string; }; }) => {
    setUserValue({ ...userValue, password: e.target.value });
    setButtonsShowValue(true);
  };
  const changeUser = () => {
    dispatch(changeUserValueAction(userValue));
    dispatch(refreshUserValueAction())
    setButtonsShowValue(false);
  };
  const cancelChanges = () => {
    setButtonsShowValue(false);
    setUserValue({ ...userValue, name: user.name, email: user.email })
  };
  // делаем иконку инпутов кликабильной
  const inputNameRef: any = useRef<HTMLInputElement>(null);
  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
  };
  const inputEmailRef: any = useRef<HTMLInputElement>(null); // выяснить почему  у <EmailInput /> нет свойства ref
  const onIconEmailClick = () => {
    setTimeout(() => inputEmailRef.current.focus(), 0);
  };
  const inputPasswordRef: any = useRef<HTMLInputElement>(null);
  const onIconPasswordClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };
  // изменение данных пользователя



  return (
    <div>
      <Input
        ref={inputNameRef}
        icon={"EditIcon"}
        onIconClick={onIconNameClick}
        value={userValue.name}
        placeholder={"Имя"}
        extraClass="mb-6"
        onChange={onNameChange}
      />
      <Input
        onChange={onEmailChange}
        icon={"EditIcon"}
        onIconClick={onIconEmailClick}
        value={userValue.email}
        placeholder={"Логин"}
        extraClass="mb-6"
      />
      <Input
        onChange={onPasswordChange}
        ref={inputPasswordRef}
        icon={"EditIcon"}
        onIconClick={onIconPasswordClick}
        value={userValue.password}
        placeholder={"Пароль"}
        extraClass="mb-6"
      />
      {buttonsShowValue && (
        <Button
          htmlType="button"
          type="secondary"
          size="small"
          onClick={cancelChanges}
        >
          Отмена
        </Button>
      )}
      {buttonsShowValue && (
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass="ml-2"
          onClick={changeUser}
        >
          Сохранить
        </Button>
      )}
    </div>
  )
}