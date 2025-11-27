import { Link } from "react-router";
import { Button } from "../ui/button";
// import { useDeleteTodo } from "@/store/todos";
// import type { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";

export default function TodoItem({ id }: { id: string }) {
  // const deleteTodo = useDeleteTodo();
  const { data: todoData } = useTodoDataById(id, "LIST");
  if (!todoData) throw new Error("Todo data not found");
  const { isDone, content } = todoData;

  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodoMutation();

  const handleCheckboxClick = () => {
    updateTodo({ id, isDone: !isDone });
  };

  const handleDeleteClick = () => {
    // deleteTodo(id.toString());
    deleteTodo(id);
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={todoData?.isDone}
          onChange={handleCheckboxClick}
          disabled={isDeleting}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant={"destructive"}
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? "삭제중..." : "삭제"}
      </Button>
    </div>
  );
}
