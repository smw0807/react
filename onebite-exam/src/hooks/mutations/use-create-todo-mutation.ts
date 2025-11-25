import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    //createTodo 응답값을 매개변수로 받을 수 있음
    onSuccess: (newTodo) => {
      // 데이터 갱신, 캐시 데이터 무효화
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });

      // 응답 값으로 데이터 갱신
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [newTodo];
        return [...prevTodos, newTodo];
      });
    },
    onError: () => {
      alert("할 일 추가에 실패했습니다.");
    },
  });
}
