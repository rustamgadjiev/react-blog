import { useEffect, useState } from "react";
import s from "./AddForm.module.scss";
import { ReactComponent as CloseFormIcon } from "../../../../../../assets/images/icons/closeForm.svg";
import { POSTS_URL } from "../../../../../../utils/constants";

export const AddForm = ({ setShowForm, blogPosts, setBlogPosts }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const handlePostTitleChange = (e) => setPostTitle(e.target.value);
  const handlePostDescChange = (e) => setPostDesc(e.target.value);

  const createPost = async (e) => {
    e.preventDefault();

    const newPost = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    try {
      const response = await fetch(POSTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const newPostFromServer = await response.json();

        setBlogPosts([...blogPosts, newPostFromServer]);
      } else throw new Error(response.statusText);
    } catch (error) {
      console.log(error);
    }

    setShowForm(false);
  };

  useEffect(() => {
    const handleEscapeClick = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };

    window.addEventListener("keyup", handleEscapeClick);

    return () => window.removeEventListener("keyup", handleEscapeClick);
  }, []);
  return (
    <>
      <form className={s.addForm} onSubmit={createPost}>
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
