import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./universal-styles-registraton.module.css";
import { signInAction } from "../../services/actions/auth";

export default function SignIn() {
  const dispatch = useDispatch();
  const [userValue, setUserValue] = useState({
    login: "",
    password: "",
  });

  const signIn = (e) => {
    e.preventDefault();
    dispatch(signInAction(userValue));
  };

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form
        className={`${styles.form} text text_type_main-default`}
        onSubmit={(e) => signIn(e)}
      >
        <EmailInput
          onChange={(e) =>
            setUserValue({ ...userValue, login: e.target.value })
          }
          value={userValue.login}
          name={"email"}
          placeholder="Логин"
          isIcon={false}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={(e) =>
            setUserValue({ ...userValue, password: e.target.value })
          }
          icon={"ShowIcon"}
          value={userValue.password}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={signIn}
        >
          Войти
        </Button>
      </form>
      <div className="text text_type_main-small mb-4">
        <span>Вы - новый пользователь?</span>
        <Link to="/register">
          <Button htmlType="button" type="secondary" size="small">
            Зарегистрироваться
          </Button>
        </Link>
      </div>
      <div className="text text_type_main-small">
        <span>Забыли пароль?</span>
        <Link to="/forgot-password">
          <Button htmlType="button" type="secondary" size="small">
            Восстановить пароль
          </Button>
        </Link>
      </div>
    </div>
  );
}
