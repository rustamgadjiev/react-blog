import s from "./Blog.module.scss";
import { Posts } from "./Posts/Posts";

export const Blog = ({ blogPosts, setBlogPosts }) => {
  return (
    <div className={s.blog}>
      <Posts
        blogPosts={blogPosts}
        setBlogPosts={setBlogPosts}
        title="Posts"
      />
    </div>
  );
};
