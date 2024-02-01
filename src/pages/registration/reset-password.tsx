import { useState, useRef, useEffect, FormEvent } from "react";
import { useDispatch } from "../../types/hooks";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./universal-styles-registraton.module.css";
import { setNewPasswordAction } from "../../services/actions/reset-password";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    passwordValue: "",
    codeValue: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => { if (inputRef && inputRef.current) { inputRef.current.focus() } }, 0);
    alert("Icon Click Callback");
  };

  const recoverPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setNewPasswordAction(value));
  };
  //проверка на наличие флага
  const navigate = useNavigate();
  useEffect(() => {
    const flag = localStorage.getItem("flag");
    if (!flag) {
      navigate("/forgot-password");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form
        className={`${styles.form} text text_type_main-default`}
        onSubmit={(e) => recoverPassword(e)}
      >
        <Input
          type={"text"}
          placeholder={"Введите новый пароль"}
          onChange={(e) =>
            setValue({ ...value, passwordValue: e.target.value })
          }
          value={value.passwordValue}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValue({ ...value, codeValue: e.target.value })}
          value={value.codeValue}
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
          Восстановить
        </Button>
      </form>
      <div className="text text_type_main-small mb-4">
        <span>Вспомнили пароль?</span>
        <Link to="/login">
          <Button htmlType="submit" type="secondary" size="small">
            Войти
          </Button>
        </Link>
      </div>
    </div>
  );
}
