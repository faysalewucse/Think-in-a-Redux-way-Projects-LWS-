import { edited } from "../actions";

const editTodo = (todoId, todoText) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://lws-server-data.herokuapp.com/todos/${todoId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          text: todoText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const todo = await response.json();
    dispatch(edited(todo.id, todo.text));
  };
};

export default editTodo;
