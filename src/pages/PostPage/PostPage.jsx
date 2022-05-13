import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { POSTS_URL } from "../../utils/constants";
import s from "./PostPage.module.scss";
import { ReactComponent as LoadingIcon } from "../../assets/images/icons/loading.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/icons/like.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/images/icons/edit.svg";
import {
  useDeleteSinglePost,
  useEditSinglePost,
  useGetSinglePost,
  useLikeSinglePost,
  useSelectSinglePost,
} from "../../utils/hooks";
import { EditForm } from "../../components/Blog/Posts/Post/EditPost/EditForm";

export const PostPage = ({ blogPosts, setBlogPosts }) => {
  const { postId } = useParams();

  const { blogPost, setBlogPost, isLoading, error } = useGetSinglePost(
    POSTS_URL,
    postId
  );

  const likePost = useLikeSinglePost(POSTS_URL, setBlogPost);
  const deletePost = useDeleteSinglePost(POSTS_URL, setBlogPost);
  const { selectPost, selectedPost, showEditForm, setShowEditForm } =
    useSelectSinglePost(blogPost);
  // const editPost = useEditSinglePost(POSTS_URL, blogPost, blogPost.title, blogPost.description, setBlogPost, selectedPost);

  const { title, description, img } = blogPost;

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
    <div className={s.post}>
      <div className={s.img}>
        <img src={img} alt="" />
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.text}>{description}</div>
      <div className={s.actions}>
        <div className={s.like}>
          <button onClick={() => likePost(blogPost)} className={s.likeBtn}>
            <LikeIcon fill={blogPost.liked ? "red" : "white"} />
          </button>
        </div>
        <div className={s.delete}>
          <button
            onClick={() => deletePost(blogPost.id)}
            className={s.deleteBtn}
          >
            <DeleteIcon />
          </button>
        </div>
        <div className={s.edit}>
          <button className={s.editBtn} onClick={selectPost}>
            <EditIcon />
          </button>
        </div>
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
