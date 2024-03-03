import { revalidatePath } from "next/cache";
import { TodoItem } from "@/types/todo";

import TodoModel from "@/db/mongodb/models/todo";

export async function saveToDo(todo: string): Promise<TodoItem> {
  const newTodo = new TodoModel({
    todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  });
  const savedTodo = await newTodo.save();
  const todoItem = {
    id: savedTodo._id.toString(),
    todo: savedTodo.todo,
    isCompleted: savedTodo.isCompleted,
    createdAt: savedTodo.createdAt,
  };
  return todoItem;
}

export async function getAllToDos(): Promise<TodoItem[]> {
  const todoData = await TodoModel.find({});
  const todoArr: TodoItem[] = [];
  todoData.map((todo) => {
    todoArr.push({
      todo: todo.todo,
      isCompleted: todo.isCompleted,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      id: todo._id.toString(),
    });
  });
  return todoArr;
}

export async function updateToDo(
  id: string,
  todo: string,
  isCompleted: boolean
): Promise<TodoItem | null> {
  try {
    const todoUpdated = await TodoModel.findByIdAndUpdate(id, {
      isCompleted,
      todo,
      updateAt: new Date().toISOString(),
    });
    if (todoUpdated) {
      return {
        id: todoUpdated._id.toString(),
        todo: todoUpdated.todo,
        isCompleted: todoUpdated.isCompleted,
        createdAt: todoUpdated.createdAt,
        updatedAt: todoUpdated.updatedAt,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error updating todo");
  }
}

export async function deleteToDo(id: string): Promise<string> {
  const todo = await TodoModel.findByIdAndDelete(id);
  if (todo) {
    return todo._id.toString();
  } else {
    throw new Error("Error deleting todo");
  }
}
