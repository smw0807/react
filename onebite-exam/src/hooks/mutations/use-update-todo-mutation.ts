import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // 캐시 데이터 취소
      // await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todo.list });

      // const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      // // 캐시 데이터 업데이트
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];
      //   return prevTodos.map((prevTodo) =>
      //     prevTodo.id === updatedTodo.id
      //       ? { ...prevTodo, ...updatedTodo }
      //       : prevTodo,
      //   );
      // });
      // // 이전 데이터 반환
      // return {
      //   prevTodos,
      // };

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return { ...prevTodo, ...updatedTodo };
        },
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.map((id) =>
            id === updatedTodo.id ? updatedTodo.id : id,
          );
        },
      );

      return { prevTodo };
    },
    onError: (error, variable, context) => {
      // 이전 데이터 복구
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
    // onSettled: () => {
    //   // 캐시 데이터 무효화
    //   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });
    // },
  });
}
