import { Link } from "react-router-dom";
import { CreatePost } from "./CreatePost/CreatePost";
import s from "./PostsHeader.module.scss";
import { ReactComponent as SearchIcon } from "../../../../assets/images/icons/search.svg";

export const PostsHeader = ({ title }) => {
  return (
    <div className={s.header}>
      <span>{title}</span>
      <CreatePost />
      <Link to='/search'>
          <SearchIcon />
      </Link>
    </div>
  );
};
