import s from "./Blog.module.scss";
import { Posts } from "./Posts/Posts";

export const Blog = ({ postsData, error, isLoading }) => {
  return (
    <div className={s.blog}>
      <Posts
        blogPost={postsData}
        isLoading={isLoading}
        error={error}
        title="Posts"
      />
    </div>
  );
};
