import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lws-server-data.herokuapp.com",
  }),
  tagTypes: ["Todos", "Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ status, colors }) => {
        let allColor = colors?.map((color) => `color_like=${color}`);
        let colorLike = `&${allColor.join("&")}`;
        switch (status) {
          case "Complete":
            return `/todos?completed_like=true${colorLike}`;
          case "Incomplete":
            return `/todos?completed_like=false${colorLike}`;
          default:
            return `/todos?${colorLike}`;
        }
      },
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: ({ data }) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodoStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useUpdateTodoStatusMutation,
  useUpdateColorMutation,
  useAllCompletedMutation,
} = apiSlice;
