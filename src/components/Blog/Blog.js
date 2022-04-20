import { POSTS_URL } from "../../utils/constants";
import { useGetPosts } from "../../utils/hooks";
import s from "./Blog.module.scss";
import { Posts } from "./Posts/Posts";

export const Blog = () => {
  const { blogPosts, setBlogPosts, isLoading, error } = useGetPosts(POSTS_URL);

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
