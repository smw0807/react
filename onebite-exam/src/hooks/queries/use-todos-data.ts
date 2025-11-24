import { fetchTodos } from "@/api/fetch-todos";
import { useQuery } from "@tanstack/react-query";

export function useTodoData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"],
    retry: 0,
  });
}
