import { useEffect, useState } from "react";
import s from "./AddForm.module.scss";
import { ReactComponent as CloseFormIcon } from "../../../../../../assets/images/icons/closeForm.svg";
import { useDispatch } from "react-redux";
import { createPost } from "../../../../../../store/slices/posts";

export const AddForm = ({ setShowForm }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const handlePostTitleChange = (e) => setPostTitle(e.target.value);
  const handlePostDescChange = (e) => setPostDesc(e.target.value);

  const dispatch = useDispatch();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    dispatch(createPost({ postTitle, postDesc })).finally(() => setShowForm(false));
  };

  useEffect(() => {
    const handleEscapeClick = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };

    window.addEventListener("keyup", handleEscapeClick);

    return () => window.removeEventListener("keyup", handleEscapeClick);
  }, [setShowForm]);
  return (
    <>
      <form className={s.addForm} onSubmit={handleCreatePost}>
        <button
          type="button"
          className={s.closeFormBtn}
          onClick={() => setShowForm(false)}
        >
          <CloseFormIcon />
        </button>
        <h2 className={s.title}>Создание поста</h2>
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
        <button type="submit">Создать пост</button>
      </form>
      <div className={s.overlay} onClick={() => setShowForm(false)}></div>
    </>
  );
};
