import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  type: "",
  page: 1,
  sortBy: "",
  filterLength: 0,
};

// create slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searched: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSortedBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterLength: (state, action) => {
      state.filterLength = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { searched, setPage, setType, setSortedBy, setFilterLength } =
  filterSlice.actions;
