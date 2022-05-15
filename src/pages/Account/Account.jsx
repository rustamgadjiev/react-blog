import { useState } from "react";
import s from "./Account.module.scss";

export const Account = () => {
  const userData = JSON.parse(
    localStorage.getItem("userData")
  );

  const [loginValue, setLoginValue] = useState(userData.login || "");
  const [passValue, setLPassValue] = useState(userData.password || "");

  const editLogin = () => {
    localStorage.setItem('userData', JSON.stringify({ ...userData, login: loginValue }))
  };
  const editPassword = () => {
    localStorage.setItem('userData', JSON.stringify({ ...userData, password: passValue }))
  };

  const handleLoginChange = (e) => setLoginValue(e.target.value);
  const handlePassChange = (e) => setLPassValue(e.target.value);

  return (
    <div className={s.account}>
      <div className={s.avatar}>
        <img src={userData.avatar} alt="" />
      </div>
      <div className={s.info}>
        <div className={s.item}>
          <input
            type="text"
            placeholder="login"
            value={loginValue}
            onChange={handleLoginChange}
          />
          <button onClick={editLogin}>Изменить логин</button>
        </div>
        <div className={s.item}>
          <input
            type="password"
            placeholder="login"
            value={passValue}
            onChange={handlePassChange}
          />
          <button onClick={editPassword}>Изменить пароль</button>
        </div>
      </div>
    </div>
  );
};
