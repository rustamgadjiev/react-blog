import { useEffect, useState } from "react";

// export const useGetPosts = (url) => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setBlogPosts(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setError(error);
//       });
//   }, [url]);

//   return { blogPosts, setBlogPosts, isLoading, error };
// };

// export const useLikePost = (url, blogPosts, setBlogPosts) => {
//   const likePost = async (post) => {
//     const updatedPost = { ...post, liked: !post.liked };

//     try {
//       const response = await fetch(url + post.id, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPost),
//       });

//       if (response.ok) {
//         const updatedPostFromServer = await response.json();

//         setBlogPosts(
//           blogPosts.map((post) => {
//             if (post.id === updatedPost.id) return updatedPostFromServer;
//             return post;
//           })
//         );
//       } else throw new Error(response.statusText);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return likePost;
// };

// export const useDeletePost = (url, blogPosts, setBlogPosts) => {
//   const deletePost = async (postId) => {
//     const isDelete = window.confirm("Вы хотите удалить пост?");

//     if (isDelete) {
//       try {
//         const response = await fetch(url + postId, { method: "DELETE" });

//         if (response.ok) {
//           setBlogPosts(blogPosts.filter((post) => post.id !== postId));
//         } else throw new Error(response.statusText);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return deletePost;
// };

export const useSelectPost = (blogPosts) => {
  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const selectPost = (pos) => {
    setSelectedPost(blogPosts[pos]);
    setShowEditForm(true);
  };

  return { selectPost, selectedPost, showEditForm, setShowEditForm };
};

// export const useEditPost = (
//   url,
//   selectedPost,
//   postTitle,
//   postDesc,
//   blogPosts,
//   setBlogPosts,
//   setShowEditForm
// ) => {
//   const editPost = async (e) => {
//     e.preventDefault();

//     const updatedPost = {
//       ...selectedPost,
//       title: postTitle,
//       description: postDesc,
//     };

//     try {
//       const response = await fetch(url + selectedPost.id, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPost),
//       });

//       if (response.ok) {
//         const updatedPostFromServer = await response.json();

//         setBlogPosts(
//           blogPosts.map((post) => {
//             if (post.id === updatedPostFromServer.id)
//               return updatedPostFromServer;
//             return post;
//           })
//         );
//       } else throw new Error(response.statusText);
//     } catch (error) {
//       console.log(error);
//     }

//     setShowEditForm(false);
//   };

//   return editPost;
// };

// export const useGetSinglePost = (url, postId) => {
//   const [blogPost, setBlogPost] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);

//     fetch(url + postId)
//       .then((response) => response.json())
//       .then((data) => {
//         setBlogPost(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setError(error);
//       });
//   }, [url, postId]);

//   return { blogPost, setBlogPost, isLoading, error };
// };

// export const useLikeSinglePost = (url, setBlogPost) => {
//   const likePost = async (post) => {
//     const updatedPost = { ...post, liked: !post.liked };

//     try {
//       const response = await fetch(url + post.id, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPost),
//       });

//       if (response.ok) {
//         const updatedPostFromServer = await response.json();

//         setBlogPost(updatedPostFromServer);
//       } else throw new Error(response.statusText);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return likePost;
// };

// export const useDeleteSinglePost = (url, setBlogPost) => {
//   const deletePost = async (postId) => {
//     const isDelete = window.confirm("Вы хотите удалить пост?");

//     if (isDelete) {
//       try {
//         const response = await fetch(url + postId, { method: "DELETE" });

//         if (response.ok) {
//           window.location = '/blog';
//         } else throw new Error(response.statusText);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return deletePost;
// };

// export const useEditSinglePost = (
//   url,
//   selectedPost,
//   postTitle,
//   postDesc,
//   setBlogPost,
//   setShowEditForm
// ) => {
//   const editPost = async (e) => {
//     e.preventDefault();

//     const updatedPost = {
//       ...selectedPost,
//       title: postTitle,
//       description: postDesc,
//     };

//     try {
//       const response = await fetch(url + selectedPost.id, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPost),
//       });

//       if (response.ok) {
//         const updatedPostFromServer = await response.json();

//         setBlogPost(updatedPostFromServer);
//       } else throw new Error(response.statusText);
//     } catch (error) {
//       console.log(error);
//     }

//     setShowEditForm(false);
//   };

//   return editPost;
// };

export const useSelectSinglePost = (blogPost) => {
  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const selectPost = (pos) => {
    setSelectedPost(blogPost);
    setShowEditForm(true);
  };

  return { selectPost, selectedPost, showEditForm, setShowEditForm };
};