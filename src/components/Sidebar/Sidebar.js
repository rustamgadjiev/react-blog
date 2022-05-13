import { Navigation } from "./Navigation/Navigation";
import s from "./Sidebar.module.scss";
import exitButton from "../../assets/images/exit-button.png";
import { useEffect, useState } from "react";
import { User } from "./User/User";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/auth";

export const Sidebar = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const dispatch = useDispatch();
  const userName = localStorage.getItem('userName');

  const handleClickToMobileBtn = () => setShowMobileSidebar((show) => !show);

  const isActive = showMobileSidebar ? s.active : "";

  const handleExitClick = () => dispatch(logOut());

  useEffect(() => {
    const escapeClick = (e) => {
      if (e.key === "Escape") setShowMobileSidebar(false);
    };

    window.addEventListener("keydown", escapeClick);

    return () => window.removeEventListener("keydown", escapeClick);
  });
  return (
    <>
      <div className={`${s.sidebar} ${isActive}`}>
        <div className={s.mobileSidebarBtn}>
          <button className={isActive} onClick={handleClickToMobileBtn}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <User userName={userName} />
        <Navigation setShowMobileSidebar={setShowMobileSidebar} />
        <div className={s.exit}>
          <button onClick={handleExitClick}>
            <img src={exitButton} alt="" />
            <span>Выход</span>
          </button>
        </div>
      </div>
      {showMobileSidebar && (
        <div onClick={handleClickToMobileBtn} className={s.overlay}></div>
      )}
    </>
  );
};
