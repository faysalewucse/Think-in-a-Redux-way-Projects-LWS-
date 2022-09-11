const configureStore = require("@reduxjs/toolkit").configureStore;
const postReducer = require("../features/post/postSlice");
const relatedPostReducer = require("../features/relatedPost/relatedPostsSclice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPosts: relatedPostReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
