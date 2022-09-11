import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "All",
  colors: [],
};

// create slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    statusChanged: (state, action) => {
      state.status = action.payload;
    },
    colorChanged: (state, action) => {
      const { color, changeType } = action.payload;
      console.log(state.colors);
      switch (changeType) {
        case "added":
          state.colors.push(color);
          break;
        case "removed":
          state.colors = state.colors.filter(
            (existingColor) => existingColor !== color
          );
          break;
        default:
          return state;
      }
    },
  },
});

export default filterSlice.reducer;
export const { statusChanged, colorChanged, isDoneChanged } =
  filterSlice.actions;
