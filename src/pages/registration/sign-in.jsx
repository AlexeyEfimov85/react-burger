import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  useState } from "react";
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
  
  const signIn = () => {
    dispatch(signInAction(userValue));
  };


  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={`${styles.form} text text_type_main-default`}>
        <EmailInput
          onChange={(e) =>
            setUserValue({ ...userValue, login: e.target.value })
          }
          //value={value}
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
          //value={value}
          name={"name"}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
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
