import { CreatePost } from "./CreatePost/CreatePost";
import s from "./PostsHeader.module.scss";
import { SearchForm } from "./SearchForm/SearchForm";

export const PostsHeader = ({ title }) => {
  return (
    <div className={s.header}>
      <span>{title}</span>
      <CreatePost />
      <SearchForm />
    </div>
  );
};
