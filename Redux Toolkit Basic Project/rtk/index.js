const store = require("./app/store");
const { fetchPost } = require("./features/post/postSlice");

store.subscribe(() => {});

store.dispatch(fetchPost(store));
