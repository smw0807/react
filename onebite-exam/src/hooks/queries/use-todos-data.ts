import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodoData() {
  const queryClient = useQueryClient();

  return useQuery({
    // 캐시 정규화
    queryFn: async () => {
      const todos = await fetchTodos();

      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });
      return todos.map((todo) => todo.id);
    },
    queryKey: QUERY_KEYS.todo.list,
  });
}
