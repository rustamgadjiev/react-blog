import s from "./Post.module.scss";
import { IMAGE_PLACEHOLDER } from "../../../../utils/constants";
import { ReactComponent as LikeIcon } from "../../../../assets/images/icons/like.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../../../assets/images/icons/edit.svg";
import { Link } from "react-router-dom";

export const Post = ({
  img = IMAGE_PLACEHOLDER,
  title,
  description,
  liked = false,
  likePost,
  deletePost,
  selectPost,
  id,
}) => {
  return (
    <div className={s.post}>
      <div className={s.img}>
        <img src={img} alt="placeholder" />
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.text}>
        {description.length > 80 ? (
          <>
            {description.slice(0, 81)}...
            <Link to={`/blog/${id}`}>Подробнее</Link>
          </>
        ) : (
          description
        )}
      </div>
      <div className={s.actions}>
        <div className={s.like}>
          <button onClick={likePost} className={s.likeBtn}>
            <LikeIcon fill={liked ? "red" : "white"} />
          </button>
        </div>
        <div className={s.delete}>
          <button onClick={deletePost} className={s.deleteBtn}>
            <DeleteIcon />
          </button>
        </div>
        <div className={s.edit}>
          <button className={s.editBtn} onClick={selectPost}>
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
