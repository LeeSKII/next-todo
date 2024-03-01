import { TodoItem } from "@/types/todo";
import { generateUUID } from "@/utils/tools";

export function saveToDo(todo: string): TodoItem {
  const newTodo: TodoItem = {
    id: generateUUID(),
    todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
  return newTodo;
}
