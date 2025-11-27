import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    // 1. 캐시 무효화 -> invalidateQueries
    // 2. 수정 요청의 응닶값 활용 -> onSuccess
    onSuccess: (deletedTodo) => {
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];
      //   return prevTodos.filter((todo) => todo.id !== deletedTodo.id);
      // });
      // 개별 캐시 삭제
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.filter((id) => id !== deletedTodo.id);
        },
      );
    },
    // 3. 낙관적 업데이트 -> onMutate
  });
}
