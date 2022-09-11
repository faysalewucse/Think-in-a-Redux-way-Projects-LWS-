const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  relatedPosts: [],
  error: "",
};

// create async thunk
const fetchRelatedPosts = createAsyncThunk(
  "post/fetchRelatedPosts",
  async (title) => {
    const splitted_title = title.split(" ");
    let title_like = "";
    for (let i = 0; i < splitted_title.length; i++) {
      if (i !== splitted_title.length - 1)
        title_like += `title_like=${splitted_title[i]}&`;
      else title_like += `title_like=${splitted_title[i]}`;
    }

    console.log(title_like);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?${title_like}`
    );
    const posts = await response.json();

    return posts;
  }
);

const relatedPostSlice = createSlice({
  name: "related_posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.relatedPosts = action.payload;
    });

    builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.relatedPosts = [];
    });
  },
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;
