import { Link } from "react-router";
import { Button } from "../ui/button";
// import { useDeleteTodo } from "@/store/todos";
import type { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";

export default function TodoItem({ id, content, isDone }: Todo) {
  // const deleteTodo = useDeleteTodo();
  const { mutate } = useUpdateTodoMutation();

  const handleCheckboxClick = () => {
    mutate({ id, isDone: !isDone });
  };

  const handleDeleteClick = () => {
    // deleteTodo(id.toString());
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button variant={"destructive"} onClick={handleDeleteClick}>
        삭제
      </Button>
    </div>
  );
}
