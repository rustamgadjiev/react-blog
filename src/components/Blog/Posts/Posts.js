import s from "./Posts.module.scss";
import { POSTS_URL } from "../../../utils/constants";
import { Post } from "./Post/Post";
import { PostsHeader } from "./PostsHeader/PostsHeader";
import { ReactComponent as LoadingIcon } from "../../../assets/images/icons/loading.svg";
import { EditForm } from "./Post/EditPost/EditForm";
import {
  useDeletePost,
  useLikePost,
  useSelectPost,
} from "../../../utils/hooks";

export const Posts = ({ blogPosts, setBlogPosts, isLoading, title, error }) => {
  const likePost = useLikePost(POSTS_URL, blogPosts, setBlogPosts);
  const deletePost = useDeletePost(POSTS_URL, blogPosts, setBlogPosts);

  const { selectPost, selectedPost, showEditForm, setShowEditForm } =
    useSelectPost(blogPosts);

  if (isLoading)
    return (
      <div className={s.loading}>
        <LoadingIcon />
      </div>
    );

  if (error)
    return (
      <div className={s.error}>
        <span>Мы не получили данные :(</span>
        <div>
          <button>Повторить</button>
        </div>
      </div>
    );

  return (
    <div className={s.posts}>
      <PostsHeader
        title={title}
        blogPosts={blogPosts}
        setBlogPosts={setBlogPosts}
      />
      <div className={s.content}>
        {blogPosts.map((post, pos) => {
          return (
            <Post
              key={post.id}
              {...post}
              likePost={() => likePost(post)}
              deletePost={() => deletePost(post.id)}
              selectPost={() => selectPost(pos)}
            />
          );
        })}
      </div>

      {showEditForm && (
        <EditForm
          selectedPost={selectedPost}
          setShowEditForm={setShowEditForm}
          blogPosts={blogPosts}
          setBlogPosts={setBlogPosts}
        />
      )}
    </div>
  );
};
