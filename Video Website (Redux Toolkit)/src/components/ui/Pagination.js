import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/filter/filterSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.videos.videos.length);
  const { page: selectedPage } = useSelector((state) => state.filter);
  const pages = Math.round(length / 7);

  let pageButtons = [...Array(pages).keys()].map((pageNumber) => {
    pageNumber = pageNumber + 1;
    return (
      <div
        onClick={() => handleSelectedPage(pageNumber)}
        key={pageNumber}
        className={
          pageNumber === selectedPage
            ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
            : "bg-blue-100 text-white px-4 py-1 rounded-full cursor-pointer"
        }
      >
        {pageNumber}
      </div>
    );
  });
  const handleSelectedPage = (pageNumber) => {
    console.log(pageNumber);
    dispatch(setPage(pageNumber));
  };
  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
        {pageButtons}
      </div>
    </section>
  );
}
