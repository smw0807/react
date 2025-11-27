import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";
import { useParams } from "react-router";

export default function TodoDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useTodoDataById(id, "DETAIL");

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>오류가 발생했습니다.</div>;

  return <div>{data.content}</div>;
}
