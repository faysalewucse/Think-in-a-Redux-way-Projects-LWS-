import axios from "../../utils/axios";

export const likeApi = async (id, likes) => {
  console.log(likes);
  const response = await axios.patch(`/videos/${id}/`, { likes: likes + 1 });
  return response.data;
};

export const unlikeApi = async (id, unlikes) => {
  const response = await axios.patch(`/videos/${id}/`, {
    unlikes: unlikes + 1,
  });
  return response.data;
};
