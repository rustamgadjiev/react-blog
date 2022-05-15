import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/slices/auth";
import userAva from "../../assets/images/user-avatar.jpg";
import s from "./LoginPage.module.scss";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const [isLoginChange, setIsLoginChange] = useState(false);
  const [isPassChange, setIsPassChange] = useState(false);

  const isPassLength = (password) => {
    if (password.length >= 8) {
      return true;
    }
    return false;
  };
  const isDigitPass = (password) => {
    for (const i of password) {
      if (i === " ") continue;
      if ((+i >= 0 && +i) || +i === 0) {
        return true;
      }
    }
    return false;
  };
  const isUpperCasePass = (password) => {
    for (const i of password) {
      if (i === " ") continue;
      if ((+i >= 0 && +i) || +i === 0) continue;
      if (i === i.toUpperCase()) {
        return true;
      }
    }
    return false;
  };
  const isLoginLength = (login) => {
    if (login.length >= 5) {
      return true;
    }
    return false;
  };

  const validatePassword =
    isPassLength(passValue) &&
    isDigitPass(passValue) &&
    isUpperCasePass(passValue);
  const validateLogin = isLoginLength(loginValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword && validateLogin) {
      const userData = {
        avatar: userAva,
        login: loginValue,
        password: passValue,
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      dispatch(logIn());
    }
  };

  const handleLoginChange = (e) => {
    setIsLoginChange(true);
    setLoginValue(e.target.value);
  };
  const handlePassChange = (e) => {
    setIsPassChange(true);
    setPassValue(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className={s.form} action="">
      <div className={s.title}>Вход</div>
      <div>
        <input
          className={`${
            isLoginChange ? (validateLogin ? s.green__border : s.red__border) : ""
          }`}
          type="login"
          placeholder="Логин"
          value={loginValue}
          onChange={handleLoginChange}
          required
        />
      </div>
      <div className={s.errors}>
        <ul>
          {isLoginChange === validateLogin || (
            <li>Логин должен содержать не менее 5 символов</li>
          )}
        </ul>
      </div>
      <div>
        <input
          className={`${
            isPassChange
              ? validatePassword
                ? s.green__border
                : s.red__border
              : ""
          }`}
          type="password"
          placeholder="Пароль"
          value={passValue}
          onChange={handlePassChange}
          required
        />
      </div>
      <div className={s.errors}>
        <ul>
          {isPassChange === isPassLength(passValue) || (
            <li>Пароль должен содержать не менее 8 символов</li>
          )}
          {isPassChange === isDigitPass(passValue) || (
            <li>Пароль должен содержать цифру</li>
          )}
          {isPassChange === isUpperCasePass(passValue) || (
            <li>Пароль должен содержать заглавные буквы</li>
          )}
        </ul>
      </div>
      <div>
        <button type="submit">Войти</button>
      </div>
    </form>
  );
};
