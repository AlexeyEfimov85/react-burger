import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "../../types/hooks";
import {
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./universal-styles-registraton.module.css";
import { registerNewUserAction } from "../../services/actions/user-register";
import { refreshUserValueAction } from "../../services/actions/refresh-user";

export default function SignIn() {
  const dispatch = useDispatch();
  const [userValue, setUserValue] = useState({
    name: "",
    login: "",
    password: "",
  });
  const onClick = (e: any) => {
    e.preventDefault();
    dispatch(registerNewUserAction(userValue));
  };
  const inputRef: any = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form
        className={`${styles.form} text text_type_main-default`}
        onSubmit={(e) => onClick(e)}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setUserValue({ ...userValue, name: e.target.value })}
          value={userValue.name}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
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
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className="text text_type_main-small mb-4">
        <span>Уже зарегстрированы?</span>
        <Link to="/login">
          <Button htmlType="button" type="secondary" size="small">
            Войти
          </Button>
        </Link>
      </div>
    </div>
  );
}
