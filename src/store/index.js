import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postsReducer } from "./slices/posts";
import { singlePostReducer } from "./slices/singlePost";
import { userReducer } from "./slices/user";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        singlePost: singlePostReducer,
        user: userReducer
    }
});