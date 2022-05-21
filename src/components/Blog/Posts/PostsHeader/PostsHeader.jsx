import { CreatePost } from "./CreatePost/CreatePost";
import s from "./PostsHeader.module.scss";
import { ReactComponent as SearchIcon } from "../../../../assets/images/icons/search.svg";
import { SearchForm } from "./SearchForm/SearchForm";
import { useState } from "react";

export const PostsHeader = ({ title }) => {
  const [isActiveSearchInput, setIsActiveSearchInput] = useState(false);

  const handleSearchBtnClick = () => {
    setIsActiveSearchInput((isActive) => !isActive);
  };

  return (
    <div className={s.header}>
      <span>{title}</span>
      <CreatePost />
      <label>
        {isActiveSearchInput && <SearchForm />}
        <button className={s.searchBtn} onClick={handleSearchBtnClick}>
          <SearchIcon />
        </button>
      </label>
    </div>
  );
};
