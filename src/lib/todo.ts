import UserModel from "@/db/mongodb/models/user";
import { TodoItem } from "@/types/todo";

import TodoModel from "@/db/mongodb/models/todo";
import type { User } from "@/types/user";
import connect from "@/db/mongodb/connect";

export async function saveToDo({
  todo,
  belong,
}: {
  todo: string;
  belong: string;
}): Promise<TodoItem> {
  const newTodo = new TodoModel({
    todo,
    isCompleted: false,
    belong,
    createdAt: new Date().toISOString(),
    updatedAt: "",
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

export async function getAllToDos({
  belong,
}: {
  belong: string;
}): Promise<TodoItem[]> {
  const todoData = await TodoModel.find({ belong });
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
      updatedAt: new Date().toISOString(),
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

export async function registerUser({
  account,
  password,
}: {
  account: string;
  password: string;
}): Promise<User> {
  try {
    await connect();
    const userData = await UserModel.create({
      name: account,
      password,
      createdAt: new Date().toISOString(),
    });

    return {
      id: userData._id.toString(),
      name: userData.name,
    };
  } catch (error) {
    throw new Error("Error registering user");
  }
}

export async function verifyUser({
  account,
  password,
}: {
  account: string;
  password: string;
}): Promise<User | null> {
  await connect();
  try {
    const user = await UserModel.findOne({ name: account });
    if (user && user.password === password) {
      return {
        id: user._id.toString(),
        name: user.name,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error verifying user");
  }
}
