import { Button, Avatar, Input } from "@nextui-org/react";
import { LogOut } from "lucide-react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import TodoForm from "@/components/TodoForm";
import connect from "@/db/mongodb/connect";
import type { TodoItem } from "@/types/todo";
import { getAllToDos } from "@/lib/todo";
import TodoList from "@/components/TodoList";

export default async function Page() {
  // wait db
  await connect();
  let todoArr: TodoItem[] = [];
  // if (user) todoArr = await getAllToDos({ belong: user });
  todoArr = await getAllToDos({ belong: "joe" });
  return (
    <div className="container mx-auto p-3 mt-3">
      <div className="border md:w-1/2 mx-auto shadow-md rounded-md p-3">
        <div className="flex justify-end pr-6">
          {/* dark model  */}
          <ThemeSwitcher />
        </div>
        <div className="flex justify-between my-6 px-9">
          <Avatar isBordered size={"sm"} name="joe"></Avatar>
          <LogOut size={"30"} className=""></LogOut>
        </div>
        <div>
          <TodoForm user="joe"></TodoForm>
        </div>
        <div className="w-full">
          <TodoList todoArr={todoArr}></TodoList>
        </div>
      </div>
    </div>
  );
}
