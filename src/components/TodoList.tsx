import TodoItem from "./TodoItem";

export default function TodoList({ todoArr }: { todoArr: string[] }) {
  const todoItems = todoArr.map((todo, index) => (
    <TodoItem key={index} todoItem={todo} />
  ));
  return <div className="mx-4 space-y-2">{todoItems}</div>;
}
