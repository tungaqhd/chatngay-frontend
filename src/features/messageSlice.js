import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
  friendId: null,
  messages: [],
  profile: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages = payload.messages;
      state.friendId = payload.user._id;
      state.friend = payload.user;
      state.chatId = payload.id;
    },
    addMoreMessage(state, { payload }) {
      state.messages.push(payload);
    },
    addProfile(state, { payload }) {
      state.profile = payload;
    },
    // login(state, action: PayloadAction<LoginPayload>) {
    //   state.logging = true;
    // },
    // loginSuccess(state, action: PayloadAction<User>) {
    //   state.isLoggedIn = true;
    //   state.logging = false;
    //   state.currentUser = action.payload;
    // },
    // loginFailed(state, action: PayloadAction<string>) {
    //   state.logging = false;
    // },

    // logout(state) {
    //   state.isLoggedIn = false;
    //   state.currentUser = undefined;
    // },
  },
});

// Actions
export const messageActions = messageSlice.actions;

// Selectors
// export const selectId = (state) => state.message.id;
export const selectMessage = (state) => state.message.messages;
export const friendIdMessage = (state) => state.message.friendId;
export const friend = (state) => state.message.friend;
export const chatIdMessage = (state) => state.message.chatId;
export const selectProfile = (state) => state.message.profile;

// Reducer
const messageReducer = messageSlice.reducer;
export default messageReducer;
