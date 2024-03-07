"use server";
import type { TodoItem } from "@/types/todo";
import { todoArr } from "@/data/todo";
import { revalidatePath } from "next/cache";
import TodoModel from "@/db/mongodb/models/todo";
import connect from "@/db/mongodb/connect";
import dayjs from "dayjs";

export async function saveEditTodo(todoId: string, formData: FormData) {
  const todoEdited = formData.get("todo");
  const todo = todoArr.find((item) => {
    return item.id === todoId;
  });
  if (todo) todo.todo = todoEdited as string;

  revalidatePath("/");
}

/**
 * 增加待办事项
 * @param belong 所属人
 * @param prevState 表单提交前的状态
 * @param formData 当前提交的表单
 * @returns 返回的表单
 */
export async function addTodo(
  belong: string,
  prevState: TodoItem | null,
  formData: FormData
): Promise<TodoItem> {
  const todo = formData.get("todo")?.toString();
  const newTodo = new TodoModel({
    todo,
    isCompleted: false,
    belong,
    createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    updatedAt: "",
  });
  await connect();
  const savedTodo = await newTodo.save();
  const todoItem = {
    id: savedTodo._id.toString(),
    todo: savedTodo.todo,
    isCompleted: savedTodo.isCompleted,
    createdAt: savedTodo.createdAt,
  };
  return todoItem;
}
