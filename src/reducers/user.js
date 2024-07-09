import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, userId: null, isConnected: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.value.token = action.payload.token;
      state.value.userId = action.payload.userId;
      state.value.isConnected = true;
    },
    signOut: (state) => {
        console.log('rentré dans le reducer')
      state.value.token = null;
      state.value.userId = null;
      state.value.isConnected = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
