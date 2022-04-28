import s from "./Blog.module.scss";
import { Posts } from "./Posts/Posts";

export const Blog = ({ blogPosts, setBlogPosts, isLoading, error }) => {
  return (
    <div className={s.blog}>
      <Posts
        blogPosts={blogPosts}
        setBlogPosts={setBlogPosts}
        isLoading={isLoading}
        error={error}
        title="Posts"
      />
    </div>
  );
};
