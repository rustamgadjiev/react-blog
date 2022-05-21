import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editData, selectUserData } from "../../store/slices/user";
import { ReactComponent as EyeIcon } from '../../assets/images/icons/eye.svg';
import s from "./Account.module.scss";

export const Account = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const [loginValue, setLoginValue] = useState(userData.login || "");
  const [passValue, setLPassValue] = useState(userData.password || "");
  const [emailValue, setEmailValue] = useState(userData.email || "");
  const [nameValue, setNameValue] = useState(userData.name || "");
  const [surNameValue, setSurNameValue] = useState(userData.surName || "");
  const [jobValue, setJobValue] = useState(userData.job || "");
  const [passwordType, setPasswordType] = useState("password");

  const [isViewPass, setIsViewPass] = useState(false);

  const handleEditData = (e, data) => {
    e.preventDefault();

    dispatch(editData(data));
  };

  const handleViewPassword = () => {
    if (passwordType !== "text") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }

    setIsViewPass(!isViewPass);
  };

  const handleLoginChange = (e) => setLoginValue(e.target.value);
  const handlePassChange = (e) => setLPassValue(e.target.value);
  const handleEmailChange = (e) => setEmailValue(e.target.value);
  const handleNameChange = (e) => setNameValue(e.target.value);
  const handleSurNameChange = (e) => setSurNameValue(e.target.value);
  const handleJobChange = (e) => setJobValue(e.target.value);

  return (
    <div className={s.account}>
      <div className={s.avatar}>
        <img src={userData.avatar} alt="" />
      </div>
      <div className={s.info}>
        <form
          onSubmit={(e) => handleEditData(e, { login: loginValue })}
          className={s.item}
        >
          <input
            type="text"
            placeholder="login"
            value={loginValue}
            onChange={handleLoginChange}
            style={{ borderColor: !!loginValue || "red" }}
            required
          />
          <button type="submit">Изменить логин</button>
        </form>
        <form
          onSubmit={(e) => handleEditData(e, { name: nameValue })}
          className={s.item}
        >
          <input
            type="text"
            placeholder="Имя"
            value={nameValue}
            onChange={handleNameChange}
            style={{ borderColor: !!nameValue || "red" }}
            required
          />
          {userData.name ? (
            <button type="submit">Изменить имя</button>
          ) : (
            <button type="submit">Сохранить имя</button>
          )}
        </form>
        <form
          onSubmit={(e) => handleEditData(e, { surName: surNameValue })}
          className={s.item}
        >
          <input
            type="text"
            placeholder="Фамилия"
            value={surNameValue}
            onChange={handleSurNameChange}
            style={{ borderColor: !!surNameValue || "red" }}
            required
          />
          {userData.surName ? (
            <button type="submit">Изменить фамилию</button>
          ) : (
            <button type="submit">Сохранить фамилию</button>
          )}
        </form>
        <form
          onSubmit={(e) => handleEditData(e, { password: passValue })}
          className={s.item}
        >
          <label className={s.password}>
            <input
              type={passwordType}
              placeholder="password"
              value={passValue}
              onChange={handlePassChange}
              style={{ borderColor: !!passValue || "red" }}
              required
            />
            <button onClick={handleViewPassword} className={`${s.eye} ${isViewPass ? s.active : ''}`}>
              <EyeIcon />
            </button>
          </label>
          <button type="submit">Изменить пароль</button>
        </form>
        <form
          onSubmit={(e) => handleEditData(e, { email: emailValue })}
          className={s.item}
        >
          <input
            type="email"
            placeholder="e-mail"
            value={emailValue}
            onChange={handleEmailChange}
            style={{ borderColor: !!emailValue || "red" }}
            required
          />
          {userData.email ? (
            <button type="submit">Изменить емаил</button>
          ) : (
            <button type="submit">Сохранить емаил</button>
          )}
        </form>
        <form
          onSubmit={(e) => handleEditData(e, { job: jobValue })}
          className={s.item}
        >
          <input
            type="text"
            placeholder="Работа"
            value={jobValue}
            onChange={handleJobChange}
            style={{ borderColor: !!jobValue || "red" }}
            required
          />
          {userData.job ? (
            <button type="submit">Изменить работу</button>
          ) : (
            <button type="submit">Сохранить работу</button>
          )}
        </form>
      </div>
    </div>
  );
};
