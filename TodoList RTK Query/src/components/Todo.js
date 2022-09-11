import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useUpdateColorMutation,
  useUpdateTodoStatusMutation,
} from "../features/api/apiSlice";
import Loading from "../ui/Loading";

export default function Todo({ todo }) {
  const [deleteTodo, { isLoading, isError }] = useDeleteTodoMutation();
  const [
    updateColor,
    { isLoading: isLoadingColorUpdate, isError: isErrorColorUpdate },
  ] = useUpdateColorMutation();
  const [
    updateTodoStatus,
    { isLoading: isLoadingStatusUpdate, isError: isErrorStatusUpdate },
  ] = useUpdateTodoStatusMutation(undefined);
  const [editTodo, { isLoading: isLoadingEdit, isError: isErrorEdit }] =
    useEditTodoMutation();
  const [hidden, setHidden] = useState(true);
  const [editText, setEditText] = useState("");

  const { text, id, completed, color } = todo;

  const handleStatusChange = (todoId, completed) => {
    updateTodoStatus({ id: todoId, data: { completed: !completed } });
  };

  const handleColorChange = (todoId, color) => {
    updateColor({ id: todoId, data: { color } });
  };

  const handleDelete = (todoId) => {
    deleteTodo(todoId);
  };

  const editHandler = (id) => {
    setHidden(true);
    editTodo({ id, data: { text: editText } });
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      {!hidden && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <label
                        htmlFor="edit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Edit Text
                      </label>
                      <input
                        onChange={(e) => setEditText(e.target.value)}
                        type="text"
                        name="edit"
                        id="edit"
                        defaultValue={text}
                        autoComplete="given-name"
                        className="p-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => editHandler(id)}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setHidden(true)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {((isLoadingEdit && !isErrorEdit) ||
        (isLoading && !isError) ||
        (isLoadingStatusUpdate && !isErrorStatusUpdate) ||
        (isLoadingColorUpdate && !isErrorColorUpdate)) && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Loading />
            </div>
          </div>
        </div>
      )}
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange(id, completed)}
          className="opacity-0 absolute rounded-full"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className="select-none flex-1">
        <p>{text}</p>
      </div>

      <svg
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        onClick={() =>
          setHidden((prev) => {
            return !prev;
          })
        }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" />
      </svg>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        onClick={() => handleColorChange(id, "green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        onClick={() => handleColorChange(id, "yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => handleColorChange(id, "red")}
      ></div>

      <img
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
}
