import { configureStore } from "@reduxjs/toolkit";
import {
  counterReducer,
  activeReducer,
  drawReducer,
  followReducer,
  postReducer,
  crPostReducer,
  BoxChatReducer,
} from "./slice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    active: activeReducer,
    showDrawer: drawReducer,
    follow: followReducer,
    post: postReducer,
    crPost: crPostReducer,
    boxChat: BoxChatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
