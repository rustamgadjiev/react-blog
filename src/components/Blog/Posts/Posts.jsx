import s from "./Posts.module.scss";
import { Post } from "./Post/Post";
import { PostsHeader } from "./PostsHeader/PostsHeader";
import { ReactComponent as LoadingIcon } from "../../../assets/images/icons/loading.svg";
import { EditForm } from "./Post/EditPost/EditForm";
import { useSelectPost } from "../../../utils/hooks";
import { useEffect } from "react";
import {
  deletePost,
  fetchPosts,
  likePost,
  selectPostsData,
} from "../../../store/slices/posts";
import { useDispatch, useSelector } from "react-redux";

export const Posts = ({ blogPosts, title }) => {
  const { selectPost, selectedPost, showEditForm, setShowEditForm } =
    useSelectPost(blogPosts);

  const { postsData, error, isLoading } = useSelector(selectPostsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = (postId) => dispatch(deletePost(postId));
  const handleLikePost = (post) => dispatch(likePost(post));

  if (isLoading) {
    return (
      <div className={s.loading}>
        <LoadingIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.error}>
        <span>Мы не получили данные :(</span>
        <div>
          <button onClick={() => dispatch(fetchPosts())}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.posts}>
      <div className="container">
        <PostsHeader
          title={title}
        />
        <div className={s.content}>
          {postsData.map((post, pos) => {
            return (
              <Post
                key={post.id}
                {...post}
                likePost={() => handleLikePost(post)}
                deletePost={() => handleDeletePost(post.id)}
                selectPost={() => selectPost(pos)}
              />
            );
          })}
        </div>
      </div>

      {showEditForm && (
        <EditForm
          selectedPost={selectedPost}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );
};
