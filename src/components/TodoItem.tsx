"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { XSquare, Pencil, Save } from "lucide-react";

import { TodoItem } from "@/types/todo";

export default function TodoItem({ todoItem }: { todoItem: TodoItem }) {
  const [todo, setTodo] = useState(todoItem);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(todoItem);
  const [isCompleted, setIsCompleted] = useState(todoItem.isCompleted);
  const editInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);
  return (
    <div
      className={`flex items-center space-x-2 justify-between border-b-2  p-2 rounded-md shadow-sm ${
        isCompleted && "bg-slate-100"
      }`}
    >
      {!isEditing ? (
        <div className={`mr-1 flex-grow ${isCompleted ? "line-through" : ""}`}>
          {todo.todo}
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsEditing(!isEditing);
            if (
              editTodo.todo === todo.todo &&
              editTodo.isCompleted === todo.isCompleted
            ) {
              return;
            } else {
              setTodo({ ...editTodo });
            }
            const data = await axios.patch(`/todo`, editTodo);
            if (data.status !== 200) {
              setTodo({ ...todo });
            }
          }}
          className="w-full"
        >
          <div className="space-x-4 flex items-center">
            <input
              className="flex-grow"
              type="text"
              name="todo"
              ref={editInputRef}
              value={editTodo.todo}
              onChange={(e) =>
                setEditTodo({ ...editTodo, todo: e.target.value })
              }
            />
            {/* button的onClick事件会导致表单无法触发action，因此将onclick触发的动作放置到表单的onSubmit方法上 */}
            <button type="submit">
              <Save className="w-5 h-5 cursor-pointer" />
            </button>
            <XSquare
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setIsEditing(false);
                setEditTodo({ ...todo });
              }}
            ></XSquare>
          </div>
        </form>
      )}
      <div className="flex items-center space-x-3">
        {!isEditing && (
          <>
            <div className="flex items-center">
              <input
                className="w-4 h-4 cursor-pointer"
                checked={isCompleted}
                onChange={async () => {
                  setIsCompleted(!isCompleted);
                  const data = await axios.patch(`/todo`, {
                    ...editTodo,
                    isCompleted: !isCompleted,
                  });
                  if (data.status === 200) {
                    setEditTodo({
                      ...editTodo,
                      isCompleted: !editTodo.isCompleted,
                    });
                  } else {
                    setIsCompleted(isCompleted);
                  }
                }}
                type="checkbox"
              />
            </div>
            <Pencil
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            ></Pencil>
            <XSquare
              className="w-5 h-5 cursor-pointer"
              onClick={async () => {
                const data = await axios.delete(`/todo`, {
                  params: { id: todo.id },
                });
                if (data.status === 200) {
                  router.refresh();
                }
              }}
            ></XSquare>
          </>
        )}
      </div>
    </div>
  );
}
