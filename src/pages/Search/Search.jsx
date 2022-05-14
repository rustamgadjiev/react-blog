import { useEffect, useState } from "react";
import s from "./Search.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/search.svg";
import { ReactComponent as LoadingIcon } from "../../assets/images/icons/loading.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPosts,
  likePost,
  selectPostsData,
} from "../../store/slices/posts";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Post } from "../../components/Blog/Posts/Post/Post";
import { useSelectPost } from "../../utils/hooks";
import { EditForm } from "../../components/Blog/Posts/Post/EditPost/EditForm";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const { postsData, isLoading, error } = useSelector(selectPostsData);

  const filterPosts = postsData.filter((post) => {
    return post.title.includes(searchValue) || post.description.includes(searchValue) ;
  });

  const { selectPost, selectedPost, showEditForm, setShowEditForm } =
    useSelectPost(filterPosts);

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
    <div className={s.searchPage}>
      <form className={s.searchForm}>
        <input
          className={s.search}
          type="text"
          placeholder="Найти"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <SearchIcon />
      </form>
      <div className={s.posts}>
        {filterPosts.map((post, pos) => {
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
      
      {showEditForm && (
        <EditForm
          selectedPost={selectedPost}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );
};
