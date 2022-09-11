import { likeApi, unlikeApi } from "../likeUnlike/likeUnlikeApi";
import { getVideo } from "./videoAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  video: {},
  likes: 0,
  unlikes: 0,
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
  const video = await getVideo(id);
  return video;
});

export const likeVideo = createAsyncThunk(
  "video/likeVideo",
  async ({ id, likes }) => {
    const video = await likeApi(id, likes);
    return video;
  }
);

export const unlikeVideo = createAsyncThunk(
  "video/unlikeVideo",
  async ({ id, unlikes }) => {
    const video = await unlikeApi(id, unlikes);
    return video;
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.video = action.payload;
        state.likes = action.payload.likes;
        state.unlikes = action.payload.unlikes;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.video = {};
        state.likes = 0;
        state.unlikes = 0;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.likes = action.payload.likes;
      })
      .addCase(unlikeVideo.fulfilled, (state, action) => {
        state.unlikes = action.payload.unlikes;
      });
  },
});

export default videoSlice.reducer;
