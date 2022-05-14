import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POSTS_URL } from "../../utils/constants";

const initialState = {
  postsData: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(POSTS_URL);

  if (response.ok) {
    return await response.json();
  }
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
      const response = await fetch(POSTS_URL + postId, { method: "DELETE" });

      if (response.ok) {
        return await response.json();
      }
  }
);

export const likePost = createAsyncThunk("posts/likePost", async (post) => {
  const updatedPost = { ...post, liked: !post.liked };

  const response = await fetch(POSTS_URL + post.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });

  if (response.ok) {
    return await response.json();
  }
});

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ selectedPost, postTitle, postDesc }) => {
    const updatedPost = {
      ...selectedPost,
      title: postTitle,
      description: postDesc,
    };

    const response = await fetch(POSTS_URL + updatedPost.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (response.ok) {
      return await response.json(updatedPost);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ postTitle, postDesc }) => {
    const newPost = {
      title: postTitle,
      description: postDesc,
      liked: false,
    };

    const response = await fetch(POSTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      return await response.json();
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postsData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = new Error("Ошибка получения данных");
      state.isLoading = false;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.postsData = state.postsData.filter(
        (post) => post.id !== action.payload.id
      );
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = new Error("Ошибка удаления поста");
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.error = new Error("Ошибка при лайке поста");
    });

    builder.addCase(editPost.fulfilled, (state, action) => {
      state.postsData = state.postsData.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.error = new Error("Ошибка при редактировании поста");
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.postsData = [...state.postsData, action.payload];
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = new Error("Ошибка при создании поста");
    });
  },
});

export const postsReducer = postsSlice.reducer;

export const { setPosts } = postsSlice.actions;

export const selectPostsData = (state) => state.posts;
