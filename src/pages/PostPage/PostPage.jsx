import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import s from "./PostPage.module.scss";
import { ReactComponent as LoadingIcon } from "../../assets/images/icons/loading.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/icons/like.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/images/icons/edit.svg";
import { ReactComponent as CloseFormIcon } from "../../assets/images/icons/closeForm.svg";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/slices/posts";
import { useEffect, useState } from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { editSinglePost, fetchSinglePost, likeSinglePost, selectSinglePostData } from "../../store/slices/singlePost";

export const PostPage = () => {
  const { postData, isLoading, error } = useSelector(selectSinglePostData);
  const [showEditForm, setShowEditForm] = useState(false);
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [postTitle, setPostTitle] = useState(postData.title);
  const [postDesc, setPostDesc] = useState(postData.description);

  const handlePostTitleChange = (e) => setPostTitle(e.target.value);
  const handlePostDescChange = (e) => setPostDesc(e.target.value);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  const { confirm } = Modal;

  const handleLikePost = (post) => {
    dispatch(likeSinglePost(post));
  }
  const handleDeletePost = (postId) => {
    confirm({
      title: 'Вы уверены что хотите удалить пост?',
      icon: <ExclamationCircleOutlined />,
      content: 'Процесс не возвратим',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        dispatch(deletePost(postId)).finally(() => history.goBack());
      }
    });
  }
  const handleEditPost = (e) => {
    e.preventDefault();
    dispatch(editSinglePost({ postData, postTitle, postDesc })).finally(() => setShowEditForm(false));
  }

  const { title, description, img } = postData;

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
          <button>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.post}>
      <div className={s.img}>
        <img src={img} alt="" />
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.text}>{description}</div>
      <div className={s.actions}>
        <div className={s.like}>
          <button onClick={() => handleLikePost(postData)} className={s.likeBtn}>
            <LikeIcon fill={postData.liked ? "red" : "white"} />
          </button>
        </div>
        <div className={s.delete}>
          <button
            onClick={() => handleDeletePost(postData.id)}
            className={s.deleteBtn}
          >
            <DeleteIcon />
          </button>
        </div>
        <div className={s.edit}>
          <button className={s.editBtn} onClick={() => setShowEditForm(true)}>
            <EditIcon />
          </button>
        </div>
      </div>

      {showEditForm && (
        <>
          <form className={s.editForm} onSubmit={handleEditPost}>
            <button
              type="button"
              className={s.closeFormBtn}
              onClick={() => setShowEditForm(false)}
            >
              <CloseFormIcon />
            </button>
            <h2 className={s.title}>Редактирование поста</h2>
            <input
              type="text"
              required
              placeholder="Заголовок поста"
              value={postTitle}
              onChange={handlePostTitleChange}
            />
            <textarea
              required
              placeholder="Описание поста"
              value={postDesc}
              onChange={handlePostDescChange}
            />
            <button type="submit">Сохранить</button>
          </form>
          <div className={s.overlay} onClick={() => setShowEditForm(false)}></div>
        </>
      )}
    </div>
  );
};