import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todo", id],
    retry: 0,
    // refetchInterval: 1000,
    // refetchOnMount: false, // 컴포넌트가 마운트될 때 데이터를 가져올지 여부
    // refetchOnWindowFocus: false, // 컴포넌트가 포커스될 때 데이터를 가져올지 여부
    // refetchOnReconnect: false, // 네트워크가 다시 연결될 때 데이터를 가져올지 여부
    // refetchInterval: 1000, // 데이터를 가져올 주기
    // refetchInterval: false, // 데이터를 가져올 주기

    // staleTime: 5000, // 데이터가 실행된 후 데이터를 가져올 주기
  });
}
