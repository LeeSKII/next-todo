"use server";
import mongoose from "mongoose";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

import type { TodoItem } from "@/types/todo";
import { TodoModel } from "@/db/mongodb/models/todo";
import connect from "@/db/mongodb/connect";
import { deleteToDo, updateToDo } from "@/lib/todo";

/**
 * 增加待办事项
 * @param userId 所属人id
 * @param prevState 表单提交前的状态
 * @param formData 当前提交的表单
 * @returns 返回的表单
 */
export async function addTodo(
  userId: string,
  prevState: TodoItem | null,
  formData: FormData
): Promise<TodoItem | null> {
  try {
    await connect();
    const todo = formData.get("todo")?.toString();
    const userObjId = new mongoose.Types.ObjectId(userId);
    const newTodo = new TodoModel({
      todo,
      isCompleted: false,
      userId: userObjId,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
      updatedAt: "",
    });
    const savedTodo = await newTodo.save();
    // 刷新服务端的数据缓存，form提交后会刷新页面
    revalidatePath("/nextui", "page");
    const todoItem = {
      id: savedTodo._id.toString(),
      todo: savedTodo.todo,
      isCompleted: savedTodo.isCompleted,
      createdAt: savedTodo.createdAt,
    };
    return todoItem;
  } catch (error) {
    return null;
  }
}

export async function deleteTodoById(todoId: string) {
  if (todoId) {
    try {
      const resId = await deleteToDo(todoId);
      if (resId) {
        revalidatePath("/nextui", "page");
      }
    } catch (error) {
      return "failed";
    }
  }

  return "success";
}

export async function updateTodo(
  todoData: TodoItem
): Promise<TodoItem | string> {
  try {
    const res = await updateToDo(
      todoData.id,
      todoData.todo,
      todoData.isCompleted
    );
    if (res) {
      revalidatePath("/nextui", "page");
      return res;
    } else {
      return "update return is null.";
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "update failed with unknown exception.";
    }
  }
}
