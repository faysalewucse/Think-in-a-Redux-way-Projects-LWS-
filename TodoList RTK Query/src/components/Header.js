import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoStatusMutation,
} from "../features/api/apiSlice";
import Loading from "../ui/Loading";

export default function Header() {
  const [
    updateTodoStatus,
    { isLoading: isLoadingStatusUpdate, isError: isErrorStatusUpdate },
  ] = useUpdateTodoStatusMutation();
  const { data: todos } = useGetTodosQuery({ status: "", colors: [] });

  const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxId + 1;
  };

  const [input, setInput] = useState("");

  const [deleteTodo, { isLoading, isError }] = useDeleteTodoMutation();
  const [addTodo, { isLoading: isLoadingAdding, isError: isErrorAdding }] =
    useAddTodoMutation();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo({
      data: {
        id: nextTodoId(todos),
        text: input,
        completed: false,
      },
    });
    setInput("");
  };

  const completeHadler = () => {
    const datas = todos.filter((todo) => !todo.completed);
    for (let todo of datas) {
      updateTodoStatus({ id: todo.id, data: { completed: true } });
    }
  };

  const clearHeandler = () => {
    const datas = todos.filter((todo) => todo.completed);
    for (let todo of datas) {
      deleteTodo(todo.id);
    }
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHadler}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={clearHeandler}>
          Clear completed
        </li>
      </ul>
      {((isLoadingAdding && !isErrorAdding) ||
        (isLoadingStatusUpdate && !isErrorStatusUpdate) ||
        (isLoading && !isError)) && <Loading />}
    </div>
  );
}
