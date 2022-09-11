import { useDispatch, useSelector } from "react-redux";
import likeImage from "../../assets/like.svg";
import unlikeImage from "../../assets/unlike.svg";
import { likeVideo, unlikeVideo } from "../../features/video/videoSlice";

export default function LikeUnlike({ id }) {
  const { likes, unlikes } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const likeHandler = () => {
    dispatch(likeVideo({ id, likes }));
  };
  const unlikeHandler = () => {
    dispatch(unlikeVideo({ id, unlikes }));
  };

  return (
    <div className="flex gap-10 w-48">
      <div className="flex gap-1">
        <div className="shrink-0">
          <img
            onClick={likeHandler}
            className="w-5 block cursor-pointer"
            src={likeImage}
            alt="Like"
          />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {likes}
        </div>
      </div>
      <div className="flex gap-1">
        <div className="shrink-0">
          <img
            onClick={unlikeHandler}
            className="w-5 block cursor-pointer"
            src={unlikeImage}
            alt="Unlike"
          />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {unlikes}
        </div>
      </div>
    </div>
  );
}
