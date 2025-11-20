import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Todo } from "@/types";

const initialState: {
  todos: Todo[];
} = {
  todos: [],
};

export const useTodosStore = create(
  immer(
    combine(initialState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime(),
              content,
            });
          });
        },
        deleteTodo: (id: number) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== id);
          });
        },
      },
    })),
  ),
);

export const useTodos = () => useTodosStore((store) => store.todos);

export const useCreateTodo = () =>
  useTodosStore((store) => store.actions.createTodo);

export const useDeleteTodo = () =>
  useTodosStore((store) => store.actions.deleteTodo);
