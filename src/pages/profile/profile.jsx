/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { logoutAction } from "../../services/actions/logout";
import { SIGN_IN_SUCCESS } from "../../services/actions/auth";
import {  refreshUserValueAction } from "../../services/actions/refresh-user";
import { changeUserValueAction } from "../../services/actions/change-user-value";

export default function Profile() {
  const user = useSelector(store => store.signInReducer.user)
  console.log(user)
  const [buttonsShowValue, setButtonsShowValue] = useState(false); // для отображения кнопок сохранить && отмена
  const [userValue, setUserValue] = useState({
    name: user.name,
    email: user.email,
    password: "*****",
  });
  const onNameChange = (e) => {
    setUserValue({ ...userValue, name: e.target.value });
    setButtonsShowValue(true);
  };
  const onEmailChange = (e) => {
    setUserValue({ ...userValue, email: e.target.value });
    setButtonsShowValue(true);
  };
  const onPasswordChange = (e) => {
    setUserValue({ ...userValue, password: e.target.value });
    setButtonsShowValue(true);
  };
  // делаем иконку инпутов кликабильной
  const inputNameRef = useRef(null);
  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
  };
  const inputEmailRef = useRef(null); // выяснить почему  у <EmailInput /> нет свойства ref
  const onIconEmailClick = () => {
    setTimeout(() => inputEmailRef.current.focus(), 0);
  };
  const inputPasswordRef = useRef(null);
  const onIconPasswordClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };

  useEffect(() => {
    dispatch(refreshUserValueAction())
  }, []);

  const dispatch = useDispatch();
  // выход из профиля: отсылаем асинхронный экшн, очищаем данные пользователя в хранилище
  const signOut = () => {
    dispatch(logoutAction());
    dispatch({
      type : SIGN_IN_SUCCESS,
      user : null,
      isAuthChecked: false
    })
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // изменение данных пользователя
  const changeUser = () => {
    dispatch(changeUserValueAction(userValue));
    dispatch(refreshUserValueAction())
    setButtonsShowValue(false);
  };

  const cancelChanges = () => {
    setButtonsShowValue(false);
    setUserValue({...userValue, name : user.name, email : user.email })
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
          <NavLink
            className={`${styles.link} text text_type_main-default text_color_inactive`}
          >
            <h3 className={styles.linkText}>История заказов</h3>
          </NavLink>
          <NavLink
            onClick={signOut}
            className={`${styles.link} text text_type_main-default text_color_inactive`}
          >
            <h3 className={styles.linkText}>Выход</h3>
          </NavLink>
          <p className="mt-20 mb-0 text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
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
          <EmailInput
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
      </div>
    </>
  );
}
