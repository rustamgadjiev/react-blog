import { useSelector } from "react-redux";
import { Posts } from "../../components/Blog/Posts/Posts";
import { selectPostsData } from "../../store/slices/posts";
import s from "./Favourite.module.scss";

export const Favourite = () => {
  const { postsData, isLoading, error } = useSelector(selectPostsData);


  const favouritePosts = postsData.filter((post) => post.liked);

  return (
    <div className={s.favourite}>
      <Posts
        blogPost={favouritePosts}
        isLoading={isLoading}
        error={error}
        title="Favourite"
      />
    </div>
  );
};
