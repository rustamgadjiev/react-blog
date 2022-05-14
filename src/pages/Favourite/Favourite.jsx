import { useSelector } from "react-redux";
import { Posts } from "../../components/Blog/Posts/Posts";
import { selectPostsData } from "../../store/slices/posts";
import { POSTS_URL } from "../../utils/constants";
import { useGetPosts } from "../../utils/hooks";
import s from "./Favourite.module.scss";

export const Favourite = () => {
  const { blogPosts, setBlogPosts, isLoading, error } = useGetPosts(POSTS_URL);
  const { postsData } = useSelector(selectPostsData);


  const favouritePosts = postsData.filter((post) => post.liked);

  return (
    <div className={s.favourite}>
      <Posts
        blogPost={favouritePosts}
        setBlogPosts={setBlogPosts}
        isLoading={isLoading}
        error={error}
        title="Favourite"
      />
    </div>
  );
};
