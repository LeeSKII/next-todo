import { revalidatePath } from "next/cache";
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
