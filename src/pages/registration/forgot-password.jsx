import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    EmailInput,
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import styles from "./universal-styles-registraton.module.css";
  import { recoverPasswordAction } from "../../services/actions/recover-password";
  
  export default function ForgotPassword() {
    const dispatch = useDispatch();
    const [value, setValue] = useState('bob@example.com')
    const onChange = e => {
    setValue(e.target.value)
    }
    const navigate = useNavigate();
    const recoverPassword = () => {
      dispatch(recoverPasswordAction(value))
      localStorage.setItem('flag', 'flag') //ставим флаг в локалсторэдж для экрана ввода проверочного кода
      navigate('/reset-password') // переходим на экран ввода проверочного кода
    }
     
    return (
      <div className={styles.container}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <form className={`${styles.form} text text_type_main-default`}>
          <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            placeholder="Логин"
            isIcon={false}
            extraClass="mb-6"
          />
          <Button onClick={recoverPassword} htmlType="button" type="primary" size="medium" extraClass="mb-20">
            Восстановить
          </Button>
        </form>
        <div className="text text_type_main-small mb-4">
          <span>Вспомнили пароль</span>
          <Button htmlType="button" type="secondary" size="small">
            Войти
          </Button>
        </div>
      </div>
    );
  }