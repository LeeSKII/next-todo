"use client";
import { useState } from "react";

import TodoItemComponent from "./TodoItem";
import { TodoItem } from "@/types/todo";

export default function TodoList({ todoArr }: { todoArr: TodoItem[] }) {
  const [todoList, setTodoList] = useState(todoArr);

  function handleDeleteTodo(id: string) {
    // 删除todo
    todoList.splice(
      todoList.findIndex((todo) => todo.id === id),
      1
    );
    setTodoList([...todoList]);
  }
  const todoItems = todoArr.map((todo) => (
    <TodoItemComponent key={todo.id} todoItem={todo} />
  ));
  return <div className="mx-4 space-y-2">{todoArr && todoItems}</div>;
}
