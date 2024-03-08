"use client";
import { useEffect, useState } from "react";

import TodoItemComponent from "./TodoItem";
import { TodoItem } from "@/types/todo";

export default function TodoList({ todoArr }: { todoArr: TodoItem[] }) {
  // This code below will not work as except like in client
  // const [todoList, setTodoList] = useState(todoArr);
  // const [isMounted, setIsMounted] = useState(false);
  // if (!isMounted) return null;
  // useEffect(() => {
  //   setIsMounted(true);
  //   console.log("TodoList");
  //   console.log(todoList);
  // }, []);

  // function handleDeleteTodo(id: string) {
  //   console.log(id);
  //   // 删除todo
  //   todoList.splice(
  //     todoList.findIndex((todo) => todo.id === id),
  //     1
  //   );
  //   setTodoList([...todoList]);
  // }
  const todoItems = todoArr.map((todo) => (
    <TodoItemComponent key={todo.id} todoItem={todo} />
  ));
  return <div className="mx-4 mt-3 space-y-2">{todoArr && todoItems}</div>;
}
