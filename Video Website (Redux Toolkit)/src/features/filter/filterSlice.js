const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  tags: [],
  search: "",
  author: "",
  page: 1,
};

const filterSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    tagSelected: (state, action) => {
      state.tags.push(action.payload);
    },
    tagRemoved: (state, action) => {
      const indexToRemove = state.tags.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.tags.splice(indexToRemove, 1);
      }
    },
    resetTagSearch: (state) => {
      state.tags = [];
      state.search = "";
      state.author = "";
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
    authorSearched: (state, action) => {
      state.author = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  tagSelected,
  tagRemoved,
  searched,
  resetTagSearch,
  authorSearched,
  setPage,
} = filterSlice.actions;
