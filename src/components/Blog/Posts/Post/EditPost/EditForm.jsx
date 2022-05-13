import s from "./EditForm.module.scss";
import { useEffect, useState } from "react";
import { ReactComponent as CloseFormIcon } from "../../../../../assets/images/icons/closeForm.svg";
import { useDispatch } from "react-redux";
import { editPost } from "../../../../../store/slices/posts";

export const EditForm = ({
  setShowEditForm,
  selectedPost,
}) => {
  const [postTitle, setPostTitle] = useState(selectedPost?.title);
  const [postDesc, setPostDesc] = useState(selectedPost?.description);

  const handlePostTitleChange = (e) => setPostTitle(e.target.value);
  const handlePostDescChange = (e) => setPostDesc(e.target.value);

  const dispatch = useDispatch();

  const handleEditPost = (e) => {
    e.preventDefault();

    dispatch(editPost({ selectedPost, postTitle, postDesc })).finally(() => setShowEditForm(false));
  };

  useEffect(() => {
    const hideEditForm = (e) => {
      if (e.key === "Escape") setShowEditForm(false);
    };
    window.addEventListener("keyup", hideEditForm);

    return () => window.removeEventListener("keyup", hideEditForm);
  });

  return (
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
  );
};
