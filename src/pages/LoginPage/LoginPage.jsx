import { useRef } from "react";
import s from "./LoginPage.module.scss";

export const LoginPage = ({ setIsLoggedIn }) => {
  const loginRef = useRef();
  const passRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      login: loginRef.current.value,
      password: passRef.current.value,
    };

    console.log(userData);

    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
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
