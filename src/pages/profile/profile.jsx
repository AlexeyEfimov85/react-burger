/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { logoutAction } from "../../services/actions/logout";
import { fetchWithRefresh, baseUrl, checkResponse } from "../../utils/burger-api";

export default function Profile() {
  const [buttonsShowValue, setButtonsShowValue] = useState(false); // для отображения кнопок сохранить && отмена
  const [userValue, setUserValue] = useState({
    name: '',
    email: '',
    password: '*****'
  });
  const onNameChange = e => {
    setUserValue({...userValue, name: e.target.value})
    setButtonsShowValue(true)
  } 
  const onEmailChange = e => {
    setUserValue({...userValue, email: e.target.value})
    setButtonsShowValue(true)
  }
  const onPasswordChange = e => {
    setUserValue({...userValue, password: e.target.value})
    setButtonsShowValue(true)
  }
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
  //отправляем запрос на сервер для получения данных пользователя, в then подставляем данные
  useEffect(() => {
    fetchWithRefresh(`${baseUrl + "/auth/user"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      setUserValue({...userValue, name: res.user.name, email: res.user.email})
    });
  }, []);

  const dispatch = useDispatch();
  // выход из профиля: отсылаем асихронный экшн, очищаем данные пользователя в хранилище
  const signOut = () => {
    dispatch(logoutAction());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // изменение данных пользователя
   const changeUser = () => {
  return fetch(`${baseUrl + "/auth/user"}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      name: userValue.name, 
      email: userValue.email, 
      password: userValue.password,
    }),
  }).then(checkResponse);
}
const saveChanges = async () => {
  await changeUser();
  fetchWithRefresh(`${baseUrl + "/auth/user"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => {
    setUserValue({...userValue, name: res.user.name, email: res.user.email})
  });
  setButtonsShowValue(false)
}
const cancelChanges = () => {
  fetchWithRefresh(`${baseUrl + "/auth/user"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => {
    setUserValue({...userValue, name: res.user.name, email: res.user.email})
  });
  setButtonsShowValue(false)
}

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
            ref={inputEmailRef}
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
            <Button htmlType="button" type="secondary" size="small" onClick={cancelChanges}>
              Отмена
            </Button>
          )}
          {buttonsShowValue && (
            <Button
              htmlType="button"
              type="primary"
              size="small"
              extraClass="ml-2"
              onClick={saveChanges}
            >
              Сохранить
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
