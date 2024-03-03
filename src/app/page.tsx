import { revalidatePath } from "next/cache";
import { User } from "lucide-react";

import TodoList from "@/components/TodoList";
import { saveToDo, getAllToDos } from "@/lib/todo";
import connect from "@/db/mongodb/connect";

// export const dynamic = "force-dynamic";

export default async function Page() {
  await connect();
  const todoArr = await getAllToDos();

  async function addTodo(formData: FormData) {
    "use server";
    const todo = formData.get("todo");
    if (todo && typeof todo === "string") {
      const todoItem = await saveToDo(todo);
    }
    revalidatePath("/");
  }

  return (
    <div className="container mx-auto mt-4 p-2">
      <div className="p-1 space-y-2 md:w-1/2 max-h-30 mx-auto flex flex-col md:space-y-5 items-start border shadow-xl rounded-xl md:p-4">
        <div className="w-full flex justify-end">
          <div className="mr-4 my-2 border p-1 rounded-3xl bg-green-100">
            <User className="w-6 h-6 stroke-blue-500"></User>
          </div>
        </div>
        <form action={addTodo} className="self-center mt-4 flex space-x-2">
          <input
            name="todo"
            className="p-2 border rounded-xl shadow-lg"
            type="text"
          />
          <button
            type="submit"
            className="border shadow-sm p-2 px-4 bg-orange-600 text-white rounded-lg"
          >
            Add
          </button>
        </form>
        <div className="w-full">
          <TodoList todoArr={todoArr}></TodoList>
        </div>
      </div>
    </div>
  );
}
