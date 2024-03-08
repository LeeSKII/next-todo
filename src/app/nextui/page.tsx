import { Tooltip, Button, Avatar } from "@nextui-org/react";
import { cookies } from "next/headers";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import TodoForm from "@/components/todo/TodoForm";
import connect from "@/db/mongodb/connect";
import type { TodoItem } from "@/types/todo";
import { getAllToDos } from "@/lib/todo";
import TodoList from "@/components/todo/TodoList";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function Page() {
  // isLogin
  const cookieStore = cookies();
  const user = cookieStore.get("name")?.value;
  const isLogin = user !== undefined;
  // wait db
  await connect();
  let todoArr: TodoItem[] = [];

  if (user) todoArr = await getAllToDos({ belong: user });

  async function logout() {
    "use server";
    cookies().delete("name");
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-3 mt-3">
      <div className="border md:w-1/2 mx-auto shadow-md rounded-md p-3">
        <div className="flex justify-end pr-6">
          {/* dark model  */}
          <ThemeSwitcher />
        </div>
        <div className="flex justify-between my-6 px-9">
          <Avatar color="primary" isBordered size={"sm"} name={user}></Avatar>
          <Tooltip content="Log out">
            <form action={logout}>
              <LogoutButton></LogoutButton>
            </form>
          </Tooltip>
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
