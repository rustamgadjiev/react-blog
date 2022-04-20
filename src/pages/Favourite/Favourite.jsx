import { Posts } from "../../components/Blog/Posts/Posts";
import { POSTS_URL } from "../../utils/constants";
import { useGetPosts } from "../../utils/hooks";
import s from "./Favourite.module.scss";

export const Favourite = () => {
  const { blogPosts, setBlogPosts, isLoading, error } = useGetPosts(POSTS_URL);

  const favouritePosts = blogPosts.filter((post) => post.liked);

  return (
    <div className={s.favourite}>
      <Posts
        blogPosts={favouritePosts}
        setBlogPosts={setBlogPosts}
        isLoading={isLoading}
        error={error}
        title="Favourite"
      />
    </div>
  );
};
