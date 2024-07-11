import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { listId: null, taskId: null },
};

export const displayingSlice = createSlice({
  name: "displaying",
  initialState,
  reducers: {
    displayingList: (state, action) => {
      state.value.listId = action.payload.listId;
    },
    displayingTask: (state, action) => {
      state.value.taskId = action.payload.taskId;
    },
  },
});

export const { displayingList, displayingTask } = displayingSlice.actions;
export default displayingSlice.reducer;
