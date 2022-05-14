import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POSTS_URL } from "../../utils/constants";

const initialState = {
    postData: {},
    isLoading: false,
    error: null
}

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId) => {
    const response = await fetch(POSTS_URL + postId);
  
    if (response.ok) {
      return await response.json();
    }
});
export const likeSinglePost = createAsyncThunk("posts/likePost", async (post) => {
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
export const editSinglePost = createAsyncThunk(
  "posts/editPost",
  async ({ postData, postTitle, postDesc }) => {
    const updatedPost = {
      ...postData,
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

const singlePostSlice = createSlice({
    name: 'singlePost',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchSinglePost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
            state.postData = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchSinglePost.rejected, (state, action) => {
            state.error = new Error("Ошибка получения данных");
            state.isLoading = false;
        });

        builder.addCase(likeSinglePost.fulfilled, (state, action) => {
            state.postData = { ...action.payload };
        });
        builder.addCase(likeSinglePost.rejected, (state, action) => {
        state.error = new Error("Ошибка при лайке поста");
        });

        builder.addCase(editSinglePost.fulfilled, (state, action) => {
            state.postData = { ...action.payload };
        });
        builder.addCase(editSinglePost.rejected, (state, action) => {
        state.error = new Error("Ошибка при редактировании поста");
        });
    }
});

export const singlePostReducer = singlePostSlice.reducer;

export const selectSinglePostData = (state) => state.singlePost;