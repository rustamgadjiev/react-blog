import s from "./NoMatch.module.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const NoMatch = () => {
  const location = useLocation();

  return (
    <div className={s.noMatch}>
      <h1>404</h1>
      <p>
        Страница <span>{location.pathname}</span> Не Найдена
      </p>
      <div>
        <Link to="/" className={s.toMainBtn}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
