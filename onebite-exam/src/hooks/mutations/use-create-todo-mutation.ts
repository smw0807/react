import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      // 데이터 갱신, 캐시 데이터 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });
    },
    onError: () => {
      alert("할 일 추가에 실패했습니다.");
    },
  });
}
