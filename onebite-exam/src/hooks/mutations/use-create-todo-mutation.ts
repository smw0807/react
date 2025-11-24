import { createTodo } from "@/api/create-todo";
import { useMutation } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      alert("할 일 추가에 성공했습니다.");
    },
    onError: () => {
      alert("할 일 추가에 실패했습니다.");
    },
  });
}
