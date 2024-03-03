import { NextRequest, NextResponse } from "next/server";
import { deleteToDo, updateToDo } from "@/lib/todo";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    try {
      const resId = await deleteToDo(id);
    } catch (error) {
      return NextResponse.json({ message: "delete failed" }, { status: 400 });
    }
  }

  return NextResponse.json({ message: "delete success" }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const todo = await request.json();
  try {
    const res = await updateToDo(todo.id, todo.todo, todo.isCompleted);
  } catch (error) {
    return NextResponse.json({ message: "update failed" }, { status: 400 });
  }
  return NextResponse.json({ message: "update success" }, { status: 200 });
}

export async function GET(request: Request) {
  return new NextResponse("Hello, Next.js!");
}
