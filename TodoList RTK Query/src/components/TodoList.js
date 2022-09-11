import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import Error from "../ui/Error";
import Todo from "./Todo";

export default function TodoList() {
  const { status, colors } = useSelector((state) => state.filters);
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ status, colors });

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  }
  if (!isLoading && !isError) {
    content = todos.map((todo) => <Todo todo={todo} key={todo.id} />);
  }

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {content}
    </div>
  );
}
