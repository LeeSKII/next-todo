"use server";
import { TodoItem } from "@/types/todo";
import { todoArr } from "@/data/todo";
import { revalidatePath } from "next/cache";

export async function saveEditTodo(todoId: string, formData: FormData) {
  const todoEdited = formData.get("todo");
  const todo = todoArr.find((item) => {
    return item.id === todoId;
  });
  if (todo) todo.todo = todoEdited as string;

  revalidatePath("/");
}

export async function deleteTodo(todoId: string) {}
