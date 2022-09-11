import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searched } from "../features/filter/filterSlice";

export default function Search() {
  const { search } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const [input, setInput] = useState(search);

  useEffect(() => {
    setInput(search);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    dispatch(searched(input));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="outline-none border-none mr-2"
        type="search"
        name="search"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
