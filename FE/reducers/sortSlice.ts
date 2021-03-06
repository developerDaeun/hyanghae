import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: { sort: "perfumeScore,DESC" },
  reducers: {
    changeSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { changeSort } = sortSlice.actions;
export default sortSlice.reducer;
