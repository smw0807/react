import { createTodo } from "@/api/create-todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {
      // mutation이 완료된 후 (성공/실패 모두) todos 쿼리를 무효화하여 자동으로 refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => {
      alert("할 일 추가에 성공했습니다.");
    },
    onError: () => {
      alert("할 일 추가에 실패했습니다.");
    },
  });
}
