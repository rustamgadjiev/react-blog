import s from "./EditForm.module.scss";
import { useEffect, useState } from "react";
import { ReactComponent as CloseFormIcon } from "../../../../../assets/images/icons/closeForm.svg";
import { POSTS_URL } from "../../../../../utils/constants";
import { useEditPost } from "../../../../../utils/hooks";

export const EditForm = ({
  setShowEditForm,
  selectedPost,
  setBlogPosts,
  blogPosts,
}) => {
  const [postTitle, setPostTitle] = useState(selectedPost?.title);
  const [postDesc, setPostDesc] = useState(selectedPost?.description);

  const handlePostTitleChange = (e) => setPostTitle(e.target.value);
  const handlePostDescChange = (e) => setPostDesc(e.target.value);
  const editPost = useEditPost(
    POSTS_URL,
    selectedPost,
    postTitle,
    postDesc,
    blogPosts,
    setBlogPosts,
    setShowEditForm
  );

  useEffect(() => {
    const hideEditForm = (e) => {
      if (e.key === "Escape") setShowEditForm(false);
    };
    window.addEventListener("keyup", hideEditForm);

    return () => window.removeEventListener("keyup", hideEditForm);
  });

  return (
    <>
      <form className={s.editForm} onSubmit={editPost}>
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
