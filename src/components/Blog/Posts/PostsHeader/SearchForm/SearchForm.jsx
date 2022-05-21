import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectPostsData } from "../../../../../store/slices/posts";
import s from "./SearchForm.module.scss";
import { Link } from "react-router-dom";


export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const { postsData } = useSelector(selectPostsData);

  const [filterPosts, setFilterPosts] = useState([]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const filterList = postsData.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      });

      if (searchValue.length > 0) {
        setFilterPosts(filterList);
      } else {
        setFilterPosts([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [postsData, searchValue]);

  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <form className={s.searchForm}>
      <input
        ref={searchRef}
        className={s.search}
        type="text"
        placeholder="Найти"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <div className={s.content}>
        {filterPosts.map((post) => {
          return (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <img src={post.img} alt={post.title} />
                {post.title}
              </Link>
          );
        })}
      </div>
    </form>
  );
};
