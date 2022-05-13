import { useRef } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/slices/auth";
import s from "./LoginPage.module.scss";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const loginRef = useRef();
  const passRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      login: loginRef.current.value,
      password: passRef.current.value,
    };
    console.log(userData);

    localStorage.setItem('userName', userData.login);

    dispatch(logIn());
  };
  return (
    <form onSubmit={handleSubmit} className={s.form} action="">
      <div className={s.title}>Вход</div>
      <div>
        <input ref={loginRef} type="login" placeholder="Логин" required />
      </div>
      <div>
        <input ref={passRef} type="password" placeholder="Пароль" required />
      </div>
      <div>
        <button type="submit">Войти</button>
      </div>
    </form>
  );
};
