import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { PostItem, PostList, Posts, User } from "../../../type";
import { initialAppState } from "./initialState";
import { initialCallState } from "./initialState";
export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setActive: (state) => {
      state.active = true;
    },
    setInactive: (state) => {
      state.active = false;
    },
    setDraw: (state) => {
      state.draw = true;
    },
    setIndraw: (state) => {
      state.draw = false;
    },
    setFollow: (state) => {
      state.follow = true;
    },
    setUnfollow: (state) => {
      state.follow = false;
    },
    setOpent: (state) => {
      state.crPost = true;
    },
    setClose: (state) => {
      state.crPost = false;
    },
  },
});

export const {
  setActive,
  setInactive,
  setDraw,
  setIndraw,
  setFollow,
  setUnfollow,
  setOpent,
  setClose,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
// Counter slice

export const callSlice = createSlice({
  name: "callSlice",
  initialState: initialCallState,
  reducers: {
    callTo: (state, action: PayloadAction<boolean>) => {
      state.callTo = action.payload;
    },
    setCall: (state, action: PayloadAction<boolean>) => {
      state.call = action.payload;
    },
    setPendingCall: (state, action: PayloadAction<boolean>) => {
      state.pendingCall = action.payload;
    },
    setAcceptCall: (state, action: PayloadAction<boolean>) => {
      state.acceptCall = action.payload;
    },
    setEndCall: (state, action: PayloadAction<boolean>) => {
      state.endCall = action.payload;
    },
    setCurrentFriendId: (state, action: PayloadAction<number>) => {
      state.currentFriendId = action.payload;
    },
  },
});
export const {
  callTo,
  setCall,
  setPendingCall,
  setAcceptCall,
  setEndCall,
  setCurrentFriendId,
} = callSlice.actions;
export const callReducer = callSlice.reducer;
export interface CounterState {
  value: number;
}

const initialCounterState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;

// postdetail reducer

export interface postState {
  value: Posts | undefined;
}

const initialPostState: postState = {
  value: undefined,
};

export const postSlice = createSlice({
  name: "postdetail",
  initialState: initialPostState,
  reducers: {
    updateAdditionalValue: (state, action: PayloadAction<Posts>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAdditionalValue } = postSlice.actions;

export const postReducer = postSlice.reducer;

// create post reducer

export interface BoxChatState {
  value: number;
}

const initialBoxChatState: BoxChatState = {
  value: 0,
};

export const BoxChatSlice = createSlice({
  name: "boxChat",
  initialState: initialBoxChatState,
  reducers: {
    setShow: (state) => {
      state.value = 1;
    },
    setHide: (state) => {
      state.value = 2;
    },
    setCloseBox: (state) => {
      state.value = 0;
    },
  },
});

export const { setShow, setHide, setCloseBox } = BoxChatSlice.actions;

export const BoxChatReducer = BoxChatSlice.reducer;

// post List reducer

export interface PostListState {
  value: PostList;
}

const initialPostListState: PostListState = {
  value: {
    Posts: null,
  },
};

export const PostListSlice = createSlice({
  name: "Post list",
  initialState: initialPostListState,
  reducers: {
    updatePostList: (state, action: PayloadAction<PostList>) => {
      state.value = action.payload;
    },
  },
});

export const { updatePostList } = PostListSlice.actions;

export const PostListReducer = PostListSlice.reducer;

// load morePost trigger
export interface loadMoreTrigger {
  value: boolean;
}

const initialLoadTrigger: loadMoreTrigger = {
  value: false,
};

export const loadTriggerSlice = createSlice({
  name: "laod trigger",
  initialState: initialLoadTrigger,
  reducers: {
    setLoadMore: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoadMore } = loadTriggerSlice.actions;

export const LoadPostTriggerReducer = loadTriggerSlice.reducer;

// friend list reducer
export interface FriendListState {
  value: User[] | null;
}

const initialFriendList: FriendListState = {
  value: null,
};

export const FriendListSlice = createSlice({
  name: "friendList",
  initialState: initialFriendList,
  reducers: {
    loadInitialFriend: (state, action: PayloadAction<User[] | null>) => {
      state.value = action.payload;
    },
  },
});

export const { loadInitialFriend } = FriendListSlice.actions;

export const FriendListReducer = FriendListSlice.reducer;

// src/redux/slices/socketSlice.ts

import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<any>) {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;

//Message reducer

interface MessageState {
  value: any[] | null;
}

const initialMsg: MessageState = {
  value: null,
};

const MsgSlice = createSlice({
  name: "msg reducer",
  initialState: initialMsg,
  reducers: {
    loadMsg(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
  },
});

export const { loadMsg } = MsgSlice.actions;
export const MsgReducer = MsgSlice.reducer;

// list friend reducer

interface ListFriendState {
  value: any[] | null;
  friend: any | null;
}

const initialListFriend: ListFriendState = {
  value: null,
  friend: null,
};

const listFriendSlice = createSlice({
  name: "list Friend reducer",
  initialState: initialListFriend,
  reducers: {
    loadListFriend(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
    curFriend(state, action: PayloadAction<any>) {
      state.friend = action.payload;
    },
  },
});

export const { loadListFriend, curFriend } = listFriendSlice.actions;
export const ListFriendReducer = listFriendSlice.reducer;

interface NotifyState {
  value: any[] | null;
}

const initialListNotify: NotifyState = {
  value: null,
};

const lisNotifySlice = createSlice({
  name: "List Notify reducer",
  initialState: initialListNotify,
  reducers: {
    loadListNotify(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
    loadNewNotify(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
  },
});

export const { loadListNotify } = lisNotifySlice.actions;
export const ListNotifyReducer = lisNotifySlice.reducer;
