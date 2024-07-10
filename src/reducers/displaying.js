import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { listId: null, taskId: null },
};

export const displayingSlice = createSlice({
  name: 'displaying',
  initialState,
  reducers: {
    displayingList: (state, action) => {
      state.value.listId = action.payload.listId;
    },
    displayingTask: (state, action) => {
      console.log('rentré dans reducer avec ', action.payload)
      state.value.taskId = action.payload.taskId;
    },
    undisplayTask: (state) => {
      console.log('rentré dans reducer undisplayTask')
      state.value.taskId = null;
    },
  },
});

export const { displayingList, displayingTask } = displayingSlice.actions;
export default displayingSlice.reducer;
