import TodoItemComponent from "./TodoItem";
import { TodoItem } from "@/types/todo";

export default function TodoList({ todoArr }: { todoArr: TodoItem[] }) {
  const todoItems = todoArr.map((todo) => (
    <TodoItemComponent key={todo.id} todoItem={todo} />
  ));
  return <div className="mx-4 space-y-2">{todoArr && todoItems}</div>;
}
