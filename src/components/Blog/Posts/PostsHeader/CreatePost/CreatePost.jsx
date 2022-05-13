import { useState } from "react";
import { AddForm } from "./AddForm/AddForm";
import s from "./CreatePost.module.scss";

export const CreatePost = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <button className={s.postCreateBtn} onClick={() => setShowForm(true)}>
        CreatePost
      </button>
      {showForm && (
        <AddForm
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};
