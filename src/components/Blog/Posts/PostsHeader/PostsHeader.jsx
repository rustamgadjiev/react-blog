import { useState } from "react";
import { CreatePost } from "./CreatePost/CreatePost";
import s from "./PostsHeader.module.scss";
import { SearchForm } from "./SearchForm/SearchForm";

export const PostsHeader = ({ blogPosts, setBlogPosts, title }) => {
  return (
    <div className={s.header}>
      <span>{title}</span>
      <CreatePost blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
      <SearchForm />
    </div>
  );
};
