import { NavLink } from "react-router-dom";
import { navList } from "../../../utils/data";
import s from "./Navigation.module.scss";

export const Navigation = ({ setShowMobileSidebar }) => {
  const handleClick = () => setShowMobileSidebar(false);
  return (
    <nav className={s.navigation}>
      <ul>
        {navList.map((nav) => {
          return (
            <li key={nav.title}>
              <NavLink
                to={nav.href}
                activeClassName={s.active}
                onClick={handleClick}
              >
                <img src={nav.img} alt="" />
                <span>{nav.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
