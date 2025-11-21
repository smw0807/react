import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
// import { useTodos } from "@/store/todos";
import { useTodoData } from "@/hooks/queries/use-todos.data";

export default function TodoListPage() {
  // const todos = useTodos();
  const { data: todos, isLoading, error } = useTodoData();

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <TodoEditor />

      {todos?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
