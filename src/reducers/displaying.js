import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { listId: null, taskId: null },
};

export const displayingSlice = createSlice({
  name: 'displaying',
  initialState,
  reducers: {
    displayingList: (state, action) => {
      console.log('rentré dans reducer')
      state.value.listId = action.payload.listId;
    },
    displayingTask: (state, action) => {
      state.value.taskId = action.payload.taskId;
    },
    // undisplayTask: (state) => {
    //   state.value.taskId = null;
    // },
  },
});

export const { displayingList, displayingTask } = displayingSlice.actions;
export default displayingSlice.reducer;
