import s from "./User.module.scss";
import userBg from "../../../assets/images/user-background.jpg";
import userAva from "../../../assets/images/user-avatar.jpg";

export const User = ({ userName }) => {
  return (
    <div className={s.user}>
      <img src={userBg} alt="" className={s.fon} />
      <div className={s.userAva}>
        <div>
          <img src={userAva} alt="" />
        </div>
        <span>{userName}</span>
      </div>
    </div>
  );
};
