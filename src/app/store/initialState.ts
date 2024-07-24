export interface AppState {
  active: boolean;
  draw: boolean;
  follow: boolean;
  crPost: boolean;
}

export const initialAppState: AppState = {
  active: false,
  draw: false,
  follow: false,
  crPost: false,
};

export interface CallState {
  currentFriendId: number | null;
  callTo: boolean;
  call: boolean;
  pendingCall: boolean;
  acceptCall: boolean;
  endCall: boolean;
}

export const initialCallState: CallState = {
  currentFriendId: null,
  callTo: false,
  call: false,
  pendingCall: false,
  acceptCall: false,
  endCall: false,
};
