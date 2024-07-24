import { configureStore } from "@reduxjs/toolkit";
import {
  appReducer,
  counterReducer,
  postReducer,
  BoxChatReducer,
  PostListReducer,
  LoadPostTriggerReducer,
  FriendListReducer,
  socketReducer,
  callReducer,
  MsgReducer,
  ListFriendReducer,
  ListNotifyReducer,
} from "./slice";
export const store = configureStore({
  reducer: {
    appAction: appReducer,
    counter: counterReducer,
    post: postReducer,
    boxChat: BoxChatReducer,
    postList: PostListReducer,
    loadMore: LoadPostTriggerReducer,
    friend: FriendListReducer,
    socket: socketReducer,
    videoCall: callReducer,
    msg: MsgReducer,
    listFriend: ListFriendReducer,
    listNotify: ListNotifyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
