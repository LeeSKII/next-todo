import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { User, SquareUserRound, LogOut } from "lucide-react";

import TodoList from "@/components/TodoList";
import { saveToDo, getAllToDos } from "@/lib/todo";
import connect from "@/db/mongodb/connect";

import { SubmitButton } from "@/components/SubmitButton";
import { redirect } from "next/navigation";
import type { TodoItem } from "@/types/todo";

export const dynamic = "force-dynamic";

export default async function Page() {
  // isLogin
  const cookieStore = cookies();
  const user = cookieStore.get("name")?.value;
  const isLogin = user !== undefined;

  // wait db
  await connect();
  let todoArr: TodoItem[] = [];
  if (user) todoArr = await getAllToDos({ belong: user });

  async function addTodo(formData: FormData) {
    "use server";
    const todo = formData.get("todo")?.toString();
    if (todo && user) {
      try {
        const todoItem = await saveToDo({ todo, belong: user });
      } catch (error) {
        if (error instanceof Error) {
          redirect(`/?error=${error.message}`);
        }
      }
      revalidatePath("/");
    }
  }
  async function logout() {
    "use server";
    cookies().delete("name");
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-2 relative">
      <div className="p-1 space-y-2 md:w-1/2 max-h-30 mx-auto flex flex-col md:space-y-5 items-start border shadow-xl rounded-xl md:p-4">
        <div className="w-full sticky top-0 shadow-md p-6 rounded-md bg-slate-50">
          <div className="w-full flex justify-end items-center">
            {isLogin ? (
              <div className="w-full px-10 flex items-center justify-between  p-1 text-orange-600 font-medium">
                <div className="flex items-center gap-2">
                  <SquareUserRound className="w-6 h-6 stroke-green-500"></SquareUserRound>
                  {user}
                </div>

                <form action={logout}>
                  <button type="submit">
                    <LogOut className="w-6 h-6 stroke-zinc-900"></LogOut>
                  </button>
                </form>
              </div>
            ) : (
              <div className="mr-4 border p-1 rounded-3xl bg-green-100">
                <Link href="/login">
                  <User className="w-6 h-6 stroke-blue-500"></User>
                </Link>
              </div>
            )}
          </div>
          <form
            action={addTodo}
            className="w-full px-4 mt-4 flex items-center justify-center space-x-2"
          >
            <input
              name="todo"
              className="flex-grow p-2 border rounded-xl shadow-lg"
              type="text"
            />
            <SubmitButton text="Add" loadingText="Add..."></SubmitButton>
          </form>
        </div>

        <div className="w-full">
          <TodoList todoArr={todoArr}></TodoList>
        </div>
      </div>
    </div>
  );
}
