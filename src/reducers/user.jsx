import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { accessToken: null, userId: null, isConnected: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.value.accessToken = action.payload.accessToken;
      state.value.userId = action.payload.userId;
      state.value.isConnected = true;
    },
    signOut: (state) => {
      state.value.accessToken = null;
      state.value.userId = null;
      state.value.isConnected = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
