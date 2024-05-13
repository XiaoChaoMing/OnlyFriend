import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostItem } from "../../../type";

// Counter slice
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

// Active slice
export interface ActiveState {
  value: boolean;
}

const initialActiveState: ActiveState = {
  value: false,
};

export const activeSlice = createSlice({
  name: "active",
  initialState: initialActiveState,
  reducers: {
    setActive: (state) => {
      state.value = true;
    },
    setInactive: (state) => {
      state.value = false;
    },
  },
});

export const { setActive, setInactive } = activeSlice.actions;

export const activeReducer = activeSlice.reducer;

// draw reducer

export interface DrawState {
  value: boolean;
}

const initialDrawState: DrawState = {
  value: false,
};

export const drawSlice = createSlice({
  name: "active",
  initialState: initialDrawState,
  reducers: {
    setDraw: (state) => {
      state.value = true;
    },
    setIndraw: (state) => {
      state.value = false;
    },
  },
});

export const { setDraw, setIndraw } = drawSlice.actions;

export const drawReducer = drawSlice.reducer;

// follow reducer

export interface FollowState {
  value: boolean;
}

const initialFlState: FollowState = {
  value: false,
};

export const followSlice = createSlice({
  name: "follow",
  initialState: initialFlState,
  reducers: {
    setFollow: (state) => {
      state.value = true;
    },
    setUnfollow: (state) => {
      state.value = false;
    },
  },
});

export const { setFollow, setUnfollow } = followSlice.actions;

export const followReducer = followSlice.reducer;

// postdetail reducer

export interface postState {
  value: PostItem | undefined;
}

const initialPostState: postState = {
  value: undefined,
};

export const postSlice = createSlice({
  name: "postdetail",
  initialState: initialPostState,
  reducers: {
    updateAdditionalValue: (state, action: PayloadAction<PostItem>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAdditionalValue } = postSlice.actions;

export const postReducer = postSlice.reducer;

// create post reducer

export interface crPostState {
  value: boolean;
}

const initialcrPostState: crPostState = {
  value: false,
};

export const crPostSlice = createSlice({
  name: "showModalCrPost",
  initialState: initialcrPostState,
  reducers: {
    setOpent: (state) => {
      state.value = true;
    },
    setClose: (state) => {
      state.value = false;
    },
  },
});

export const { setOpent, setClose } = crPostSlice.actions;

export const crPostReducer = crPostSlice.reducer;

// create boxchat reducer

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
