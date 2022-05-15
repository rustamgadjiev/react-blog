import s from "./User.module.scss";
import userBg from "../../../assets/images/user-background.jpg";

export const User = () => {
  const { avatar, login } = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className={s.user}>
      <img src={userBg} alt="" className={s.fon} />
      <div className={s.userAva}>
        <div>
          <img src={avatar} alt="" />
        </div>
        <span>{login}</span>
      </div>
    </div>
  );
};
