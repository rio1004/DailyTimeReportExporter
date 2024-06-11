import { createSlice } from "@reduxjs/toolkit";

interface DataItem {
  id: number;
  data: string;
  group: string;
}
interface completedState {
  data: DataItem[];
}
const initialState: completedState = {
  data: [],
};

const completedSlice = createSlice({
  name: "completed",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    removeData: (state, action) => {
      const id = action.payload.id;
      const group = action.payload.group;
      console.log(action.payload);
      state.data = state.data.filter((item) => {
        return !(item.id == id && item.group == group);
      });
    },
  },
});

export const { addData, removeData } = completedSlice.actions;
export default completedSlice.reducer;
