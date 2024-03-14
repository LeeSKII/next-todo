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
import { USER_TOKEN } from "@/lib/constants";
import { decryptUserToken } from "@/lib/auth";
import type { JWTPayload } from "jose";

type JWTPayloadWithUserId = JWTPayload & { userId: string; userName: string };

export default async function Page() {
  // decrypt user info from token
  const cookieStore = cookies();
  const token = cookieStore.get(USER_TOKEN)?.value!;
  const userPayload = decryptUserToken(token);
  const { userId, userName } = userPayload as JWTPayloadWithUserId;
  // wait db
  await connect();
  let todoArr: TodoItem[] = [];

  if (userId) todoArr = await getAllToDos({ userId });

  async function logout() {
    "use server";
    cookies().delete("name");
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-3">
      <div className="border md:w-1/2 mx-auto shadow-md rounded-md p-3 relative">
        <div className="flex justify-end pr-6">
          {/* dark model  */}
          <ThemeSwitcher />
        </div>
        <div className="flex justify-between my-6 px-9">
          <Avatar
            color="primary"
            isBordered
            size={"sm"}
            name={userName}
          ></Avatar>
          <Tooltip content="Log out">
            <form action={logout}>
              <LogoutButton></LogoutButton>
            </form>
          </Tooltip>
        </div>
        <div className="sticky top-16 shadow-md p-3 rounded-lg z-10">
          {userId && <TodoForm userId={userId}></TodoForm>}
        </div>
        <div className="w-full">
          <TodoList todoArr={todoArr}></TodoList>
        </div>
      </div>
    </div>
  );
}
