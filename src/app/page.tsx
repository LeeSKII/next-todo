import { revalidatePath } from "next/cache";
import TodoList from "@/components/TodoList";

const todoArr: string[] = [];

export default function Page() {
  async function addTodo(formData: FormData) {
    "use server";
    const todo = formData.get("todo");
    console.log(todoArr.length);
    if (typeof todo === "string") todoArr.push(todo);
    revalidatePath("/");
  }

  return (
    <div className="container mx-auto mt-4 p-2">
      <div className="p-1 space-y-2 md:w-1/2 max-h-30 mx-auto flex flex-col md:space-y-5 items-start border shadow-xl rounded-xl md:p-4">
        <form action={addTodo} className="self-center flex space-x-2">
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
