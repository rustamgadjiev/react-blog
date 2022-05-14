import s from "./Posts.module.scss";
import { Post } from "./Post/Post";
import { PostsHeader } from "./PostsHeader/PostsHeader";
import { ReactComponent as LoadingIcon } from "../../../assets/images/icons/loading.svg";
import { EditForm } from "./Post/EditPost/EditForm";
import { useSelectPost } from "../../../utils/hooks";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import {
  deletePost,
  fetchPosts,
  likePost,
} from "../../../store/slices/posts";
import { useDispatch } from "react-redux";

export const Posts = ({ title, blogPost, error, isLoading }) => {
  const { selectPost, selectedPost, showEditForm, setShowEditForm } =
    useSelectPost(blogPost);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { confirm } = Modal;

  const handleDeletePost = (postId) => {
    confirm({
      title: 'Вы уверены что хотите удалить пост?',
      icon: <ExclamationCircleOutlined />,
      content: 'Процесс не возвратим',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        dispatch(deletePost(postId));
      }
    });
  }
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
          {blogPost.map((post, pos) => {
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
